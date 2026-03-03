"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Zap, LayoutDashboard, History, Settings, LogOut, Copy, ShoppingBag, Loader2, Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function HistoryPage() {
    const [ads, setAds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const fetchAds = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }

            const { data } = await supabase
                .from("ads")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });

            setAds(data || []);
            setLoading(false);
        };

        fetchAds();
    }, [router]);

    if (loading) return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
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
                    <Link href="/dashboard/brand-voice" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all">
                        <MessageSquare size={20} /> <span className="hidden lg:inline">Voz da Marca</span>
                    </Link>
                    <Link href="/history" className="flex items-center gap-4 px-4 py-3 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-xl font-bold text-sm transition-all">
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
                    <h1 className="text-3xl font-outfit font-extrabold tracking-tight mb-2">Seu Histórico 📚</h1>
                    <p className="text-slate-400 font-medium">Acesse todos os anúncios e estratégias criadas pela AdGenius AI.</p>
                </header>

                <div className="grid gap-6">
                    {ads.length === 0 ? (
                        <div className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                            <ShoppingBag className="mx-auto text-slate-800 mb-6" size={64} />
                            <p className="text-slate-500 font-bold text-lg">Nenhum anúncio gerado ainda.</p>
                            <Link href="/dashboard" className="text-[#22c55e] hover:brightness-125 mt-4 inline-block font-bold uppercase tracking-widest text-xs">Criar meu primeiro anúncio</Link>
                        </div>
                    ) : (
                        ads.map((ad) => (
                            <div key={ad.id} className="bg-slate-900/30 border border-white/5 p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-start group hover:border-[#22c55e]/30 transition-all">
                                <div className="w-full md:w-1/3 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-full bg-[#22c55e]/10 text-[10px] font-black text-[#22c55e] uppercase tracking-widest border border-[#22c55e]/20">{ad.platform}</span>
                                        <span className="text-slate-500 text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest"><Calendar size={12} /> {new Date(ad.created_at).toLocaleDateString('pt-BR')}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-[#22c55e] transition-colors">{ad.generated_title}</h3>
                                    <p className="text-slate-400 text-sm font-medium line-clamp-2">{ad.product_name}</p>
                                </div>

                                <div className="flex-grow md:border-l md:border-white/5 md:pl-8">
                                    <div className="bg-[#020617]/50 p-6 rounded-xl border border-white/5 mb-6">
                                        <p className="text-slate-300 text-sm font-medium leading-relaxed whitespace-pre-wrap line-clamp-4">{ad.generated_description}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(`TÍTULO: ${ad.generated_title}\n\nDESCRIÇÃO:\n${ad.generated_description}`);
                                                alert("Anúncio copiado!");
                                            }}
                                            className="px-6 h-12 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all shrink-0"
                                        >
                                            <Copy size={16} /> Copiar Tudo
                                        </button>
                                        <button className="px-6 h-12 rounded-xl bg-[#22c55e] text-[#020617] text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:brightness-110 transition-all">
                                            VER DETALHES
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
