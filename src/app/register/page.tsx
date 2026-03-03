"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (signUpError) throw signUpError;

            if (data?.user) {
                const { error: profileError } = await supabase
                    .from("profiles")
                    .insert([
                        {
                            id: data.user.id,
                            full_name: fullName,
                            email: email,
                            plan: "free",
                            credits: 5,
                        },
                    ]);

                if (profileError) throw profileError;
                router.push("/dashboard");
            }
        } catch (err: any) {
            alert("Erro no registro: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col justify-center items-center px-4 md:px-0 hero-mesh relative">
            <div className="max-w-md w-full reveal">
                <Link href="/" className="flex items-center gap-2 mb-10 justify-center group">
                    <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Zap className="text-[#020617]" size={20} />
                    </div>
                    <span className="font-outfit font-bold text-2xl tracking-tighter">AdGenius <span className="text-[#22c55e]">AI</span></span>
                </Link>

                <div className="glass-card p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent" />

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-outfit font-extrabold mb-3 tracking-tight">Criar Unidade</h1>
                        <p className="text-sm text-slate-400 font-medium">Junte-se à revolução do copywriting com IA.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Nome Completo</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Seu nome"
                                    className="w-full h-14 pl-12 pr-4 bg-slate-900/30 border border-white/5 focus:border-[#22c55e]/50 focus:ring-4 focus:ring-[#22c55e]/5 text-white rounded-xl outline-none font-semibold transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">E-mail Operacional</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="unit@adgenius.ai"
                                    className="w-full h-14 pl-12 pr-4 bg-slate-900/30 border border-white/5 focus:border-[#22c55e]/50 focus:ring-4 focus:ring-[#22c55e]/5 text-white rounded-xl outline-none font-semibold transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Senha de Comando</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mínimo 6 caracteres"
                                    className="w-full h-14 pl-12 pr-4 bg-slate-900/30 border border-white/5 focus:border-[#22c55e]/50 focus:ring-4 focus:ring-[#22c55e]/5 text-white rounded-xl outline-none font-semibold transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary h-14 justify-center shadow-lg shadow-[#22c55e]/10 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Iniciar Registro"}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-slate-400 text-sm font-medium">
                            Já possui autorização?{" "}
                            <Link href="/login" className="text-[#22c55e] font-bold hover:underline">
                                Acessar Terminal
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
