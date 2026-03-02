"use client";

import { Zap, Target, Sparkles, CheckCircle2 } from "lucide-react";

interface ProposalProps {
    productName: string;
    platform: string;
    adData: any;
    brandData?: any;
}

export default function ProposalTemplate({ productName, platform, adData, brandData }: ProposalProps) {
    return (
        <div className="p-12 bg-white text-slate-900 min-h-screen proposal-print-container hidden print:block">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-12">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Proposta de Anúncio</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Gerado por {brandData?.name || "Parceiro AdGenius AI"}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="fill-slate-900 w-8 h-8" />
                    <span className="font-black text-xl">AdGenius <span className="text-slate-500">AI</span></span>
                </div>
            </div>

            {/* Product Info */}
            <section className="mb-12">
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Informações do Produto</h2>
                <div className="p-6 bg-slate-50 border-2 border-slate-900">
                    <h3 className="text-2xl font-black mb-2">{productName}</h3>
                    <p className="text-sm font-bold text-slate-600 capitalize">Plataforma: {platform}</p>
                </div>
            </section>

            {/* Strategies */}
            <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="p-6 border-2 border-slate-900">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5" />
                        <h3 className="font-black uppercase text-sm">Score de Conversão</h3>
                    </div>
                    <p className="text-4xl font-black text-[#22c55e]">{adData.conversionScore || 90}%</p>
                    <p className="text-xs font-bold text-slate-500 mt-2 italic">{adData.scoreReason || "Copy de alta performance otimizado para retenção."}</p>
                </div>
                <div className="p-6 border-2 border-slate-900">
                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5" />
                        <h3 className="font-black uppercase text-sm">Vantagem Competitiva</h3>
                    </div>
                    <p className="text-xs font-bold leading-relaxed">
                        Anúncio gerado com base em gatilhos mentais validados e regras específicas de SEO para o marketplace alvo.
                    </p>
                </div>
            </div>

            {/* The Ad Content */}
            <section className="space-y-8">
                <div>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Sugestão de Título</h2>
                    <div className="p-6 border-2 border-slate-900 bg-slate-50">
                        <p className="text-lg font-black">{adData.titles[0]}</p>
                    </div>
                </div>

                <div>
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Corpo do Anúncio (Copy)</h2>
                    <div className="p-8 border-2 border-slate-900 whitespace-pre-line text-sm leading-relaxed font-bold">
                        {adData.description}
                    </div>
                </div>

                {adData.imageUrl && (
                    <div>
                        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Sugestão Visual</h2>
                        <div className="border-2 border-slate-900 overflow-hidden aspect-video">
                            <img src={adData.imageUrl} className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="mt-20 pt-8 border-t border-slate-200 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>© {new Date().getFullYear()} ADGENIUS AI</span>
                <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} />
                    <span>Documento Verificado por Inteligência Artificial</span>
                </div>
            </footer>
        </div>
    );
}
