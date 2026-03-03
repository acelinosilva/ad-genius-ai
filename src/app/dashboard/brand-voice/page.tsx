"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { LayoutDashboard, History, Settings, LogOut, Save, MessageSquare, Sparkles, Loader2, Zap } from "lucide-react";
import Link from "next/link";

export default function BrandVoice() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [brandName, setBrandName] = useState("");
    const [brandTone, setBrandTone] = useState("");
    const [brandArchetype, setBrandArchetype] = useState("preposto");

    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const getData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setUser(user);

            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            setProfile(profile);

            if (profile) {
                setBrandName(profile.brand_name || "");
                setBrandTone(profile.brand_voice_desc || "");
                setBrandArchetype(profile.brand_archetype || "O Amigo");
            }

            setLoading(false);
        };

        getData();
    }, [router]);

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);

        const { error } = await supabase
            .from("profiles")
            .update({
                brand_name: brandName,
                brand_voice_desc: brandTone,
                brand_archetype: brandArchetype
            })
            .eq("id", user.id);

        setSaving(false);
        if (error) {
            alert("Erro ao salvar: " + error.message);
        } else {
            alert("Voz da Marca salva com sucesso! Seus próximos anúncios usarão esta identidade.");
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#22c55e] w-12 h-12" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Configurando Estúdio</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] flex font-inter text-slate-100">
            {/* Sidebar Reutilizada */}
            <aside className="w-20 lg:w-72 border-r border-white/5 flex flex-col items-center lg:items-stretch py-8 bg-[#020617]">
                <div className="px-8 mb-12 hidden lg:flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center">
                        <Zap className="text-[#020617] w-5 h-5" />
                    </div>
                    <span className="font-outfit font-bold text-2xl tracking-tight">AdGenius <span className="text-[#22c55e]">AI</span></span>
                </div>

                <nav className="space-y-2 px-4 flex-grow">
                    <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all">
                        <LayoutDashboard size={20} /> <span className="hidden lg:inline">Painel de Controle</span>
                    </Link>
                    <Link href="/dashboard/brand-voice" className="flex items-center gap-4 px-4 py-3 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-xl font-bold text-sm transition-all">
                        <MessageSquare size={20} /> <span className="hidden lg:inline">Voz da Marca</span>
                    </Link>
                    <Link href="/history" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all">
                        <History size={20} /> <span className="hidden lg:inline">Histórico</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all">
                        <Settings size={20} /> <span className="hidden lg:inline">Configurações</span>
                    </Link>
                </nav>

                <div className="mt-auto px-4 pt-6 border-t border-white/5">
                    <button onClick={() => supabase.auth.signOut().then(() => router.push("/"))} className="flex items-center gap-4 px-4 py-3 w-full text-slate-500 hover:text-red-400 font-bold text-sm transition-all">
                        <LogOut size={20} /> <span className="hidden lg:inline">Sair</span>
                    </button>
                </div>
            </aside>

            <main className="flex-grow p-4 md:p-12 overflow-y-auto">
                <header className="mb-12">
                    <h1 className="text-3xl font-outfit font-extrabold tracking-tight mb-2">Voz da Marca 🗣️</h1>
                    <p className="text-slate-400 font-medium">Treine nossa IA para escrever exatamente como você ou sua empresa.</p>
                </header>

                <div className="max-w-4xl space-y-8">
                    <div className="glass-card p-8 rounded-2xl border border-white/5 space-y-8">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome da Marca / Persona</label>
                            <input
                                type="text"
                                value={brandName}
                                onChange={(e) => setBrandName(e.target.value)}
                                placeholder="Ex: Apple, Nubank ou Meu Próprio Nome"
                                className="w-full h-14 px-5 bg-slate-900/30 border border-white/5 rounded-xl focus:border-[#22c55e]/50 outline-none font-semibold transition-all"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descrição da Identidade Verbal</label>
                            <textarea
                                rows={6}
                                value={brandTone}
                                onChange={(e) => setBrandTone(e.target.value)}
                                placeholder="Descreva como sua marca fala. Ex: 'Usamos termos técnicos mas de fácil entendimento, evitamos gírias, focamos sempre no benefício imediato...'"
                                className="w-full p-5 bg-slate-900/30 border border-white/5 rounded-xl focus:border-[#22c55e]/50 outline-none font-medium text-sm leading-relaxed transition-all resize-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Arquétipo da Marca</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['O Herói', 'O Mago', 'O Rebelde', 'O Amigo'].map((a) => (
                                    <button
                                        key={a}
                                        onClick={() => setBrandArchetype(a)}
                                        className={`px-4 py-3 rounded-xl text-[10px] font-bold border transition-all ${brandArchetype === a ? 'border-[#22c55e] bg-[#22c55e]/10 text-white' : 'border-white/5 text-slate-500 hover:bg-white/5'}`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="w-full btn-primary h-16 text-lg justify-center shadow-lg shadow-[#22c55e]/10 group transition-all"
                        >
                            {saving ? <Loader2 className="animate-spin" /> : <>SALVAR IDENTIDADE <Save size={20} /></>}
                        </button>
                    </div>

                    <div className="p-8 bg-[#22c55e]/5 border border-[#22c55e]/10 rounded-2xl flex items-start gap-6">
                        <div className="w-12 h-12 bg-[#22c55e]/20 rounded-xl flex items-center justify-center text-[#22c55e] shrink-0">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">Como isso funciona?</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-medium">Ao salvar essas configurações, nossa IA passará a considerar sua identidade verbal em cada anúncio gerado, garantindo consistência e conexão com seu público alvo.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
