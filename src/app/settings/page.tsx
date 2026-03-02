"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Zap, LayoutDashboard, History, Settings, LogOut, User, Mail, CreditCard, Shield, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [fullName, setFullName] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
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

            if (profile) {
                setProfile(profile);
                setFullName(profile.full_name || "");
            }
            setLoading(false);
        };

        getUser();
    }, [router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { error } = await supabase
                .from("profiles")
                .update({ full_name: fullName })
                .eq("id", user.id);

            if (error) throw error;

            setProfile({ ...profile, full_name: fullName });
            alert("Perfil atualizado com sucesso!");
        } catch (err: any) {
            alert("Erro ao atualizar: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#22c55e] w-12 h-12" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] flex font-inter text-slate-100">
            {/* Sidebar */}
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
                    <Link href="/history" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all">
                        <History size={20} /> <span className="hidden lg:inline">Histórico de Anúncios</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-4 px-4 py-3 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-xl font-bold text-sm transition-all">
                        <Settings size={20} /> <span className="hidden lg:inline">Configurações</span>
                    </Link>
                </nav>

                <div className="mt-auto px-4">
                    <button
                        onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
                        className="flex items-center gap-4 px-4 py-3 w-full text-slate-500 hover:text-red-400 font-bold text-sm transition-all"
                    >
                        <LogOut size={20} /> <span className="hidden lg:inline">Sair do Sistema</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 md:p-12 overflow-y-auto hero-mesh">
                <header className="mb-12">
                    <h1 className="text-3xl font-outfit font-extrabold tracking-tight mb-2">Configurações</h1>
                    <p className="text-slate-400 font-medium">Gerencie sua conta e preferências do AdGenius AI.</p>
                </header>

                <div className="max-w-4xl space-y-8">
                    {/* Profile Section */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                            <User className="text-[#22c55e]" size={20} />
                            <h2 className="text-lg font-bold font-outfit">Perfil do Usuário</h2>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#22c55e] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">E-mail</label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="w-full bg-slate-800/30 border border-white/5 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-primary px-8 py-3 text-sm"
                            >
                                {saving ? "Salvando..." : "Salvar Alterações"}
                            </button>
                        </form>
                    </section>

                    {/* Subscription Section */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                            <CreditCard className="text-[#22c55e]" size={20} />
                            <h2 className="text-lg font-bold font-outfit">Assinatura e Créditos</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 bg-slate-900/50 rounded-xl border border-white/5">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Plano Atual</div>
                                <div className="text-xl font-bold text-white capitalize">{profile?.plan}</div>
                            </div>
                            <div className="p-6 bg-slate-900/50 rounded-xl border border-white/5">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Créditos Disponíveis</div>
                                <div className="text-xl font-bold text-[#22c55e]">{profile?.credits}</div>
                            </div>
                            <div className="flex items-center justify-center">
                                <Link href="/#pricing" className="text-[#22c55e] border border-[#22c55e]/20 bg-[#22c55e]/5 px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#22c55e]/10 transition-all">
                                    Upgrade de Plano
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Security Section */}
                    <section className="glass-card p-8 rounded-2xl border border-white/5 opacity-60">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                            <Shield className="text-slate-400" size={20} />
                            <h2 className="text-lg font-bold font-outfit">Segurança</h2>
                        </div>
                        <p className="text-sm text-slate-500">Alteração de senha e autenticação de dois fatores em breve.</p>
                    </section>
                </div>
            </main>
        </div>
    );
}
