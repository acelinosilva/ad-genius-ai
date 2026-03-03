"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Zap, LayoutDashboard, History, Settings, LogOut, Copy, RefreshCw, ShoppingBag, ArrowRight, Loader2, Sparkles, ChevronRight, Target, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import ProposalTemplate from "@/components/ProposalTemplate";
import CheckoutButton from "@/components/CheckoutButton";
import { Download } from "lucide-react";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [platform, setPlatform] = useState("olx");
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [tone, setTone] = useState("informal");
    const [generateImage, setGenerateImage] = useState(false);

    // Generation State
    const [generating, setGenerating] = useState(false);
    const [generatingB, setGeneratingB] = useState(false);
    const [generatedAd, setGeneratedAd] = useState<any>(null);
    const [generatedAdB, setGeneratedAdB] = useState<any>(null);
    const [printingAd, setPrintingAd] = useState<any>(null);
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const platformLimits: any = {
        olx: { title: 60, desc: 2000 },
        mercadolivre: { title: 60, desc: 5000 },
        shopee: { title: 120, desc: 3000 },
        instagram: { title: 40, desc: 2200 },
        linkedin: { title: 100, desc: 3000 },
        tiktok: { title: 60, desc: 1000 },
    };

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

            setProfile(profile);
            setLoading(false);
        };

        getUser();
    }, [router]);

    const handleGenerate = async (e: React.FormEvent, isVariantB = false) => {
        if (e) e.preventDefault();

        if (isVariantB) {
            setGeneratingB(true);
            setGeneratedAdB(null);
        } else {
            setGenerating(true);
            setGeneratedAd(null);
            setGeneratedAdB(null);
        }

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    platform,
                    productName,
                    details: description,
                    tone: isVariantB ? (tone === 'persuasivo' ? 'urgente' : 'persuasivo') : tone,
                    generateImage,
                    userId: user?.id
                })
            });

            if (!response.ok) {
                let errorMsg = `Erro do servidor: ${response.status}`;
                const responseText = await response.text();
                try {
                    const errorData = JSON.parse(responseText);
                    if (errorData.error) errorMsg += `. ${errorData.error}`;
                } catch (e) {
                    if (responseText) errorMsg += `. Detalhes: ${responseText.substring(0, 100)}`;
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            if (isVariantB) {
                setGeneratedAdB(data);
            } else {
                setGeneratedAd(data);
            }

            if (user && !isVariantB) {
                await supabase.from("ads").insert({
                    user_id: user.id,
                    platform,
                    product_name: productName,
                    generated_title: data.titles[0],
                    generated_description: data.description,
                    generated_keywords: data.keywords,
                    status: "completed"
                });

                if (profile && profile.credits > 0) {
                    await supabase.from("profiles").update({ credits: profile.credits - 1 }).eq("id", user.id);
                    setProfile({ ...profile, credits: profile.credits - 1 });
                }
            }
        } catch (err: any) {
            alert("Erro na operação: " + err.message);
        } finally {
            if (isVariantB) setGeneratingB(false);
            else setGenerating(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#22c55e] w-12 h-12" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Acessando Terminal Seguro</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] flex font-inter selection:bg-[#22c55e]/20 text-slate-100">
            {/* Sidebar - Classic Professional */}
            <aside className="w-20 lg:w-72 border-r border-white/5 flex flex-col items-center lg:items-stretch py-8 bg-[#020617]">
                <div className="px-8 mb-12 hidden lg:flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center">
                        <Zap className="text-[#020617] w-5 h-5" />
                    </div>
                    <span className="font-outfit font-bold text-2xl tracking-tight">AdGenius <span className="text-[#22c55e]">AI</span></span>
                </div>
                <div className="lg:hidden mb-12">
                    <Zap className="text-[#22c55e] w-6 h-6" />
                </div>

                <nav className="space-y-2 px-4 flex-grow">
                    <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-xl font-bold text-sm transition-all">
                        <LayoutDashboard size={20} /> <span className="hidden lg:inline">Painel de Controle</span>
                    </Link>
                    <Link href="/dashboard/brand-voice" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all border border-transparent">
                        <Sparkles size={20} /> <span className="hidden lg:inline">Voz da Marca</span>
                    </Link>
                    <Link href="/history" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all">
                        <History size={20} /> <span className="hidden lg:inline">Histórico de Anúncios</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all">
                        <Settings size={20} /> <span className="hidden lg:inline">Configurações</span>
                    </Link>

                    {profile?.is_admin && (
                        <Link href="/admin" className="flex items-center gap-4 px-4 py-3 text-red-500 hover:text-red-400 hover:bg-red-500/5 rounded-xl font-bold text-sm transition-all border border-transparent hover:border-red-500/20">
                            <ShieldAlert size={20} /> <span className="hidden lg:inline">Painel Admin</span>
                        </Link>
                    )}
                </nav>

                {/* Credits / Upgrade - Agency Visual */}
                <div className="mx-4 mt-auto mb-8 p-6 bg-gradient-to-br from-[#22c55e]/10 to-transparent border border-[#22c55e]/10 rounded-2xl hidden lg:block">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-[#22c55e] rounded-lg flex items-center justify-center text-[#020617]">
                            <Zap size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#22c55e]">Seu Plano</span>
                            <span className="text-sm font-bold capitalize">{profile?.plan || "Free"}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            <span>Créditos</span>
                            <span>{profile?.credits || 0} / {profile?.plan === 'free' ? '5' : '100'}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-[#22c55e] transition-all" style={{ width: `${Math.min(((profile?.credits || 0) / (profile?.plan === 'free' ? 5 : 100)) * 100, 100)}%` }} />
                        </div>
                    </div>
                    {profile?.plan === 'free' && (
                        <CheckoutButton planId="profissional" className="w-full py-2.5 bg-[#22c55e] text-[#020617] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#1eb054] transition-all">
                            Fazer Upgrade
                        </CheckoutButton>
                    )}
                </div>

                <div className="px-4 pt-4 border-t border-white/5">
                    <button
                        onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
                        className="flex items-center gap-4 px-4 py-3 w-full text-slate-500 hover:text-red-400 font-bold text-sm transition-all"
                    >
                        <LogOut size={20} /> <span className="hidden lg:inline">Sair do Sistema</span>
                    </button>
                </div>
            </aside>

            {/* Main Workspace */}
            <main className="flex-grow p-4 md:p-12 overflow-y-auto hero-mesh">
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-outfit font-extrabold tracking-tight mb-2">Bem-vindo, {profile?.full_name?.split(' ')[0] || 'Usuário'}</h1>
                        <p className="text-slate-400 font-medium">Crie anúncios poderosos com inteligência artificial.</p>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 bg-[#22c55e]/5 border border-[#22c55e]/10 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                        <span className="text-xs font-bold text-[#22c55e] uppercase tracking-widest">Servidor On-line</span>
                    </div>
                </header>

                <div className="grid xl:grid-cols-12 gap-8 items-start">
                    {/* Editor - 7 cols */}
                    <div className="xl:col-span-7 space-y-8">
                        <div className="glass-card p-6 md:p-10 rounded-2xl border border-white/5 relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
                                <div className="w-10 h-10 bg-[#22c55e]/10 rounded-lg flex items-center justify-center text-[#22c55e]">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold font-outfit">Configurador de Anúncio</h2>
                                    <p className="text-xs text-slate-500 font-medium">Preencha os dados básicos do seu produto.</p>
                                </div>
                            </div>

                            <form onSubmit={handleGenerate} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Plataforma Alvo</label>
                                        <div className="flex flex-col gap-2">
                                            {['olx', 'mercadolivre', 'shopee', 'instagram', 'linkedin', 'tiktok'].map((p) => (
                                                <button
                                                    key={p}
                                                    type="button"
                                                    onClick={() => setPlatform(p)}
                                                    className={`px-4 py-3.5 rounded-xl text-left text-sm font-bold border transition-all flex justify-between items-center ${platform === p
                                                        ? 'border-[#22c55e] bg-[#22c55e]/5 text-white'
                                                        : 'border-white/5 text-slate-500 hover:border-white/10 hover:bg-white/5'
                                                        }`}
                                                >
                                                    <span className="capitalize">
                                                        {p === 'mercadolivre' ? 'Mercado Livre' :
                                                            p === 'instagram' ? 'Instagram Ads' :
                                                                p === 'linkedin' ? 'LinkedIn Ads' :
                                                                    p === 'tiktok' ? 'TikTok / Reels' : p}
                                                    </span>
                                                    {platform === p && <CheckCircle2 size={18} className="text-[#22c55e]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tom de Voz</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['informal', 'profissional', 'persuasivo', 'urgente'].map((t) => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => setTone(t)}
                                                    className={`px-4 py-3.5 rounded-xl text-xs font-bold border transition-all capitalize ${tone === t
                                                        ? 'border-[#22c55e] bg-[#22c55e]/5 text-white'
                                                        : 'border-white/5 text-slate-500 hover:border-white/10 hover:bg-white/5'
                                                        }`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome do Produto</label>
                                        <span className={`text-[10px] font-mono font-bold ${productName.length > platformLimits[platform].title ? 'text-red-400' : 'text-slate-500'}`}>
                                            {productName.length} / {platformLimits[platform].title}
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        placeholder="Ex: iPhone 14 Pro Max 256GB Grafite"
                                        className="w-full h-14 px-5 bg-slate-900/30 border border-white/5 rounded-xl focus:border-[#22c55e]/50 focus:ring-4 focus:ring-[#22c55e]/5 outline-none font-semibold transition-all"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Detalhes & Especificações</label>
                                        <span className={`text-[10px] font-mono font-bold ${description.length > platformLimits[platform].desc ? 'text-red-400' : 'text-slate-500'}`}>
                                            {description.length} / {platformLimits[platform].desc}
                                        </span>
                                    </div>
                                    <textarea
                                        required
                                        rows={6}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Descreva o estado do produto, acessórios inclusos, tempo de uso..."
                                        className="w-full p-5 bg-slate-900/30 border border-white/5 rounded-xl focus:border-[#22c55e]/50 focus:ring-4 focus:ring-[#22c55e]/5 outline-none font-medium transition-all resize-none text-slate-200 placeholder:text-slate-600"
                                    />
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div
                                            onClick={() => setGenerateImage(!generateImage)}
                                            className={`w-12 h-6 rounded-full transition-all relative ${generateImage ? 'bg-[#22c55e]' : 'bg-slate-800'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${generateImage ? 'left-7' : 'left-1'}`} />
                                        </div>
                                        <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">Gerar Imagem do Produto (IA)</span>
                                    </label>
                                    <p className="text-[10px] text-slate-500 font-medium">Isso utilizará o DALL-E 3 para criar uma foto profissional do seu produto.</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={generating || productName.length > platformLimits[platform].title || profile?.credits <= 0}
                                    className="w-full btn-primary h-16 text-lg justify-center shadow-lg shadow-[#22c55e]/10 disabled:opacity-50 disabled:cursor-not-allowed group transition-all"
                                >
                                    {generating ? (
                                        <span className="flex items-center gap-3">
                                            <Loader2 className="animate-spin w-5 h-5" /> PROCESSANDO INTELIGÊNCIA...
                                        </span>
                                    ) : (
                                        <>
                                            GERAR ANÚNCIO AGORA <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {profile?.credits <= 0 && (
                                    <div className="flex items-start gap-3 p-4 bg-red-400/5 border border-red-400/10 rounded-xl">
                                        <AlertCircle className="text-red-400 shrink-0" size={18} />
                                        <p className="text-xs text-red-400 leading-normal font-medium">Você atingiu o limite de créditos do plano gratuito. Faça o upgrade para continuar gerando anúncios ilimitados.</p>
                                    </div>
                                )}
                            </form>
                        </div>

                        {generatedAd && !generatedAdB && (
                            <div className="glass-card p-6 rounded-2xl border border-[#22c55e]/10 bg-[#22c55e]/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#22c55e]/20 rounded-xl flex items-center justify-center text-[#22c55e]">
                                        <RefreshCw size={24} className={generatingB ? 'animate-spin' : ''} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Simulador de Teste A/B</h4>
                                        <p className="text-xs text-slate-400">Gerar uma segunda variação para comparar performance.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleGenerate(null as any, true)}
                                    disabled={generatingB}
                                    className="px-6 py-3 bg-[#22c55e] text-[#020617] rounded-xl font-bold text-xs hover:bg-[#1eb054] transition-all disabled:opacity-50"
                                >
                                    {generatingB ? 'GERANDO...' : 'GERAR VARIANTE B'}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Results Area - 5 cols */}
                    <div className={`${generatedAd && generatedAdB ? 'xl:col-span-12' : 'xl:col-span-5'} space-y-6`}>
                        {!generatedAd && !generating ? (
                            <div className="h-full min-h-[500px] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-12 text-center bg-white/[0.01]">
                                <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border border-white/5">
                                    <Sparkles size={32} className="text-slate-700" />
                                </div>
                                <h3 className="text-lg font-outfit font-bold text-slate-300 mb-2">Aguardando Missão</h3>
                                <p className="text-sm text-slate-500 max-w-xs font-medium">Os resultados da IA aparecerão aqui assim que você iniciar a geração.</p>
                            </div>
                        ) : generating ? (
                            <div className="glass-card p-12 rounded-2xl border border-[#22c55e]/10 flex flex-col items-center justify-center h-[600px] relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#22c55e]/5 animate-pulse" />
                                <div className="relative mb-10">
                                    <div className="w-24 h-24 border-4 border-[#22c55e]/20 border-t-[#22c55e] rounded-full animate-spin" />
                                    <Zap className="absolute inset-0 m-auto text-[#22c55e]" size={32} />
                                </div>
                                <span className="text-sm font-bold text-[#22c55e] uppercase tracking-[0.4em] animate-pulse">Codificando Anúncio...</span>
                            </div>
                        ) : (
                            <div className={`${generatedAdB ? 'grid lg:grid-cols-2 gap-8' : 'space-y-6'} reveal w-full`}>
                                {/* Variant A */}
                                <div className={`glass-card p-8 rounded-2xl border ${generatedAdB ? (generatedAd.conversionScore >= (generatedAdB.conversionScore || 0) ? 'border-[#22c55e]/40 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-white/5') : 'border-[#22c55e]/20'} overflow-hidden relative`}>
                                    {generatedAdB && generatedAd.conversionScore >= (generatedAdB.conversionScore || 0) && (
                                        <div className="absolute top-0 right-0 bg-[#22c55e] text-[#020617] px-4 py-1.5 rounded-bl-xl text-[10px] font-black uppercase tracking-widest z-20">Vencedor Sugerido</div>
                                    )}
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Target size={120} className="text-[#22c55e]" />
                                    </div>

                                    <div className="mb-8">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#22c55e]/20">
                                                {generatedAdB ? 'Variante A' : 'Resultados Gerados'}
                                            </span>
                                            <div className="flex items-center gap-4">
                                                {generatedAd.conversionScore && (
                                                    <div className="flex flex-col items-end">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Score</span>
                                                            <span className={`text-sm font-black ${generatedAd.conversionScore > 80 ? 'text-[#22c55e]' : 'text-yellow-500'}`}>
                                                                {generatedAd.conversionScore}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex gap-2 pl-4 border-l border-white/10">
                                                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"><Copy size={16} /></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {generatedAd.imageUrl && (
                                                <div className="rounded-xl overflow-hidden border border-white/5 bg-slate-900/50 aspect-square relative group">
                                                    <img src={generatedAd.imageUrl} alt="Produto A" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 block">Títulos Sugeridos</label>
                                                <div className="space-y-3">
                                                    {generatedAd.titles.map((t: string, i: number) => (
                                                        <div key={i} className="group p-4 bg-slate-900/50 border border-white/5 rounded-xl text-sm font-semibold text-white">{t}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 block">Corpo do Anúncio</label>
                                                <div className="p-5 bg-slate-900/50 border border-white/5 rounded-xl text-sm text-slate-300 leading-relaxed font-medium whitespace-pre-line max-h-[300px] overflow-y-auto custom-scrollbar">
                                                    {generatedAd.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-6">
                                        <button
                                            onClick={() => {
                                                setPrintingAd(generatedAd);
                                                setTimeout(() => window.print(), 100);
                                            }}
                                            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#22c55e] flex items-center gap-2 transition-all"
                                        >
                                            <Download size={14} /> Exportar Proposta PDF
                                        </button>
                                        <button className="text-[10px] font-black uppercase tracking-widest text-[#22c55e] hover:underline flex items-center gap-1 transition-all">
                                            Histórico <ArrowRight size={10} />
                                        </button>
                                    </div>
                                </div>

                                {/* Variant B */}
                                {generatedAdB && (
                                    <div className={`glass-card p-8 rounded-2xl border ${generatedAdB.conversionScore > generatedAd.conversionScore ? 'border-[#22c55e]/40 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-white/5'} overflow-hidden relative`}>
                                        {generatedAdB.conversionScore > generatedAd.conversionScore && (
                                            <div className="absolute top-0 right-0 bg-[#22c55e] text-[#020617] px-4 py-1.5 rounded-bl-xl text-[10px] font-black uppercase tracking-widest z-20">Vencedor Sugerido</div>
                                        )}
                                        <div className="mb-8">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#22c55e]/20">Variante B</span>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex flex-col items-end">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Score</span>
                                                            <span className={`text-sm font-black ${generatedAdB.conversionScore > 80 ? 'text-[#22c55e]' : 'text-yellow-500'}`}>
                                                                {generatedAdB.conversionScore}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 pl-4 border-l border-white/10">
                                                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all"><Copy size={16} /></button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {generatedAdB.imageUrl && (
                                                    <div className="rounded-xl overflow-hidden border border-white/5 bg-slate-900/50 aspect-square relative group">
                                                        <img src={generatedAdB.imageUrl} alt="Produto B" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                                <div>
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 block">Títulos Sugeridos</label>
                                                    <div className="space-y-3">
                                                        {generatedAdB.titles.map((t: string, i: number) => (
                                                            <div key={i} className="group p-4 bg-slate-900/50 border border-white/5 rounded-xl text-sm font-semibold text-white">{t}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 block">Corpo do Anúncio</label>
                                                    <div className="p-5 bg-slate-900/50 border border-white/5 rounded-xl text-sm text-slate-300 leading-relaxed font-medium whitespace-pre-line max-h-[300px] overflow-y-auto custom-scrollbar">
                                                        {generatedAdB.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-6 border-t border-white/5 flex justify-between items-center mt-6">
                                            <button
                                                onClick={() => {
                                                    setPrintingAd(generatedAdB);
                                                    setTimeout(() => window.print(), 100);
                                                }}
                                                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#22c55e] flex items-center gap-2 transition-all"
                                            >
                                                <Download size={14} /> Exportar Proposta PDF
                                            </button>
                                            <button className="text-[10px] font-black uppercase tracking-widest text-[#22c55e] hover:underline flex items-center gap-1 transition-all">
                                                Histórico <ArrowRight size={10} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Print Only Component */}
                {printingAd && (
                    <ProposalTemplate
                        productName={productName}
                        platform={platform}
                        adData={printingAd}
                        brandData={{ name: profile?.full_name || profile?.email }}
                    />
                )}
            </main>
        </div>
    );
}
