"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Zap, LayoutDashboard, History, Settings, LogOut, Users, Search, Edit3, Save, X, Loader2, ShieldAlert, CreditCard, Star } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [stats, setStats] = useState<any>({ totalUsers: 0, totalAds: 0 });
    const [usersList, setUsersList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Edit State
    const [editingUser, setEditingUser] = useState<any>(null);
    const [editCredits, setEditCredits] = useState<number>(0);
    const [editPlan, setEditPlan] = useState<string>("free");

    const router = useRouter();

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setUser(user);

            // Fetch current user profile to check admin status
            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            // If not admin, redirect to dashboard
            if (!profile || !profile.is_admin) {
                router.push("/dashboard");
                return;
            }

            setProfile(profile);
            await fetchData();
            setLoading(false);
        };

        checkAdmin();
    }, [router]);

    const fetchData = async () => {
        // Fetch all users
        const { data: allUsers, error: usersError } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false });

        if (!usersError) setUsersList(allUsers || []);

        // Stats (simplified)
        setStats({
            totalUsers: allUsers?.length || 0,
            activeSubscriptions: allUsers?.filter(u => u.plan !== 'free').length || 0
        });
    };

    const handleEditUser = (u: any) => {
        setEditingUser(u);
        setEditCredits(u.credits);
        setEditPlan(u.plan);
    };

    const handleSaveUser = async () => {
        if (!editingUser) return;

        try {
            const { error } = await supabase
                .from("profiles")
                .update({
                    credits: editCredits,
                    plan: editPlan
                })
                .eq("id", editingUser.id);

            if (error) throw error;

            alert("Usuário atualizado com sucesso!");
            setEditingUser(null);
            await fetchData();
        } catch (err: any) {
            alert("Erro ao salvar: " + err.message);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#22c55e] w-12 h-12" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Validando Credenciais Administrativas</span>
            </div>
        </div>
    );

    const filteredUsers = usersList.filter(u =>
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.full_name?.toLowerCase().includes(search.toLowerCase())
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
                    <Link href="/admin" className="flex items-center gap-4 px-4 py-3 bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20 rounded-xl font-bold text-sm transition-all">
                        <ShieldAlert size={20} /> <span className="hidden lg:inline">Painel Admin</span>
                    </Link>
                    <Link href="/settings" className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all">
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
                <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-outfit font-extrabold tracking-tight mb-2 flex items-center gap-3">
                            Controle Administrativo <span className="px-2 py-1 bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] rounded animate-pulse">MODO ROOT</span>
                        </h1>
                        <p className="text-slate-400 font-medium">Gestão global de usuários, créditos e planos.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="px-6 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Usuários</div>
                            <div className="text-2xl font-black">{stats.totalUsers}</div>
                        </div>
                        <div className="px-6 py-4 bg-slate-900/50 border border-white/5 rounded-2xl text-center">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Assinantes</div>
                            <div className="text-2xl font-black text-[#22c55e]">{stats.activeSubscriptions}</div>
                        </div>
                    </div>
                </header>

                {/* Users List */}
                <div className="glass-card rounded-2xl border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-bold font-outfit flex items-center gap-2">
                            <Users size={20} className="text-[#22c55e]" /> Gestão de Perfis
                        </h2>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar por e-mail ou nome..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#22c55e] transition-all"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-950/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Usuário</th>
                                    <th className="px-6 py-4">Status / Plano</th>
                                    <th className="px-6 py-4 text-center">Créditos</th>
                                    <th className="px-6 py-4 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                    {u.full_name?.substring(0, 2).toUpperCase() || "US"}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold">{u.full_name || "Sem nome"} {u.is_admin && <span className="text-[8px] text-red-500 font-black ml-1">ADMIN</span>}</div>
                                                    <div className="text-[10px] text-slate-500">{u.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.plan === 'agencia' ? 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/20' :
                                                    u.plan === 'profissional' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' :
                                                        'bg-white/5 text-slate-500 border border-white/10'
                                                }`}>
                                                {u.plan}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`font-mono text-sm ${u.credits > 1000 ? 'text-[#22c55e] font-bold' : ''}`}>
                                                {u.credits > 9999 ? '∞' : u.credits}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleEditUser(u)}
                                                className="p-2 hover:bg-[#22c55e]/10 text-slate-500 hover:text-[#22c55e] rounded-lg transition-all"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit Modal / Tooltip (Simplified) */}
                {editingUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="glass-card w-full max-w-md p-8 rounded-3xl border border-[#22c55e]/20 bg-slate-950 shadow-2xl">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-xl font-bold font-outfit">Ajustar Privilégios</h3>
                                <button onClick={() => setEditingUser(null)} className="text-slate-500 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Usuário</label>
                                    <div className="text-sm font-medium text-slate-300">{editingUser.email}</div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Créditos</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            value={editCredits}
                                            onChange={(e) => setEditCredits(parseInt(e.target.value))}
                                            className="grow bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#22c55e]"
                                        />
                                        <button
                                            onClick={() => setEditCredits(999999)}
                                            className="px-4 py-3 bg-slate-800 border border-white/5 rounded-xl text-[10px] font-bold hover:bg-[#22c55e]/10 hover:text-[#22c55e] transition-all"
                                        >
                                            MAX
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Plano</label>
                                    <select
                                        value={editPlan}
                                        onChange={(e) => setEditPlan(e.target.value)}
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#22c55e]"
                                    >
                                        <option value="free">Free</option>
                                        <option value="profissional">Profissional</option>
                                        <option value="agencia">Agência</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        onClick={handleSaveUser}
                                        className="btn-primary grow py-4 text-sm flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} /> Salvar Alterações
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
