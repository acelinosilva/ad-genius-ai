import Link from "next/link";
import { ArrowRight, Zap, ShoppingBag, BarChart3, ShieldCheck, Target, TrendingUp, CheckCircle2, Star, Play, Globe, Layout, Users, Sparkles, HelpCircle } from "lucide-react";
import CheckoutButton from "@/components/CheckoutButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020617] hero-mesh selection:bg-[#22c55e]/30 selection:text-white overflow-x-hidden">

      {/* Premium Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#22c55e] rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-[#020617]" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight">AdGenius <span className="text-[#22c55e]">AI</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="#features" className="hover:text-white transition-colors">Recursos</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Preços</Link>
            <Link href="#testimonials" className="hover:text-white transition-colors">Depoimentos</Link>
            <Link href="#help" className="hover:text-white transition-colors">FAQ / Ajuda</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-[#22c55e] transition-colors">Entrar</Link>
            <Link href="/register" className="btn-primary text-sm px-6 py-2.5">Começar Grátis</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-32">
        {/* Dynamic Hero Section */}
        <section className="relative px-6 py-20 overflow-hidden">
          <div className="max-w-4xl mx-auto text-center reveal">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold mb-8 uppercase tracking-widest">
              <Zap size={14} /> Novo: IA de Alto Desempenho
            </div>
            <h1 className="text-5xl md:text-7xl font-outfit font-extrabold leading-[1.1] mb-8 tracking-tight">
              Domine o Marketplace com Anúncios Projetados para <span className="text-[#22c55e]">Vender em Segundos.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              A inteligência artificial que entende o SEO da OLX, ML e Shopee. Gere textos persuasivos, evite bloqueios e multiplique seus lucros agora.
            </p>

            {/* Benefit Bar */}
            <div className="flex flex-wrap justify-center gap-6 mb-12 reveal [animation-delay:100ms]">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <TrendingUp size={14} className="text-[#22c55e]" /> +85% Conversão
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <ShieldCheck size={14} className="text-[#22c55e]" /> Anti-Ban SafePost
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Globe size={14} className="text-[#22c55e]" /> SEO Multi-Canal
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link href="/register" className="btn-primary text-base px-10 py-5">
                Começar Operação Agora <ArrowRight size={18} />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-10">
              <CheckCircle2 size={12} className="text-[#22c55e]" /> 5 Créditos Gratuitos • Sem cartão de crédito
            </div>
          </div>

          {/* Interactive Mockup Container */}
          <div className="max-w-6xl mx-auto mt-20 relative reveal [animation-delay:200ms]">
            <div className="absolute -inset-4 bg-[#22c55e]/10 blur-3xl rounded-full opacity-30" />
            <div className="glass-card rounded-2xl border border-white/10 p-4 md:p-8 animate-glow">
              <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                </div>
                <div className="mx-auto bg-slate-800/50 px-4 py-1 rounded-md text-[10px] text-slate-500 font-mono">adgenius-ai.com/generator_unit_01</div>
              </div>
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <div className="w-20 h-2 bg-slate-800 rounded" />
                    <div className="w-full h-10 bg-slate-800/30 border border-white/5 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-32 h-2 bg-slate-800 rounded" />
                    <div className="w-full h-32 bg-slate-800/30 border border-white/5 rounded-lg" />
                  </div>
                  <div className="w-full h-10 bg-[#22c55e] rounded-lg opacity-50" />
                </div>
                <div className="md:col-span-1 hidden md:flex flex-col items-center justify-center gap-4">
                  <div className="h-full w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                  <Zap size={24} className="text-[#22c55e]" />
                  <div className="h-full w-[1px] bg-gradient-to-t from-transparent via-white/10 to-transparent" />
                </div>
                <div className="md:col-span-6 space-y-4">
                  <div className="p-4 bg-[#22c55e]/5 border border-[#22c55e]/10 rounded-xl">
                    <div className="w-full h-4 bg-[#22c55e]/20 rounded mb-4" />
                    <div className="space-y-2">
                      <div className="w-full h-2 bg-slate-800/50 rounded" />
                      <div className="w-full h-2 bg-slate-800/50 rounded" />
                      <div className="w-2/3 h-2 bg-slate-800/50 rounded" />
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/30 border border-white/5 rounded-xl">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="w-16 h-4 bg-slate-800/50 rounded" />
                      <div className="w-20 h-4 bg-slate-800/50 rounded" />
                      <div className="w-12 h-4 bg-slate-800/50 rounded" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#22c55e] uppercase tracking-[0.2em]">
                      <Sparkles size={12} /> Otimização SEO Concluída
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients & Partners */}
        <section className="py-20 border-y border-white/5 bg-slate-950/20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] mb-12">Otimizado para os maiores Marketplaces</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="text-2xl font-black italic tracking-tighter">OLX</span>
              <span className="text-2xl font-black italic tracking-tighter">MercadoLivre</span>
              <span className="text-2xl font-black italic tracking-tighter">Shopee</span>
              <span className="text-2xl font-black italic tracking-tighter">Amazon</span>
              <span className="text-2xl font-black italic tracking-tighter">Enjoei</span>
            </div>
          </div>
        </section>

        {/* Feature Grid - Reimagined */}
        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 reveal">
              <h2 className="text-4xl md:text-5xl font-outfit font-extrabold mb-6 tracking-tight">Ferramentas projetadas para o<br /><span className="text-[#22c55e]">seu sucesso contínuo.</span></h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">Tudo o que você precisa para dominar o marketplace e vender em tempo recorde.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 reveal [animation-delay:100ms]">
              {[
                { icon: <Layout className="text-[#22c55e]" />, title: "Templates Adaptativos", desc: "A IA ajusta o tom e o limite de caracteres de acordo com as regras de cada plataforma." },
                { icon: <TrendingUp className="text-[#22c55e]" />, title: "SEO de Alta Conversão", desc: "Palavras-chave selecionadas para colocar seu anúncio no topo das buscas orgânicas." },
                { icon: <ShieldCheck className="text-[#22c55e]" />, title: "Segurança de Dados", desc: "Seus dados e histórico de anúncios protegidos com criptografia de ponta a ponta." },
                { icon: <Target className="text-[#22c55e]" />, title: "Precisão Cirúrgica", desc: "Foco absoluto em converter visitantes em compradores recorrentes." },
                { icon: <Users className="text-[#22c55e]" />, title: "Multi-Engine Support", desc: "Suporte simultâneo para os maiores marketplaces do Brasil." },
                { icon: <Zap className="text-[#22c55e]" />, title: "Geração em 8 seg.", desc: "Sua produtividade multiplicada pelo poder da IA generativa de última geração." }
              ].map((feature, i) => (
                <div key={i} className="glass-card p-10 rounded-2xl border border-white/5 hover:border-[#22c55e]/20 transition-all hover:emerald-glow group">
                  <div className="w-14 h-14 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-8 border border-[#22c55e]/20 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 font-outfit">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - NEW */}
        <section id="pricing" className="py-32 px-6 bg-slate-950/40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 reveal">
              <h2 className="text-4xl md:text-5xl font-outfit font-extrabold mb-6 tracking-tight">O plano certo para a sua <span className="text-[#22c55e]">escala de vendas.</span></h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">Escolha a potência necessária para dominar o seu nicho.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 reveal">
              {/* Free Plan */}
              <div className="glass-card p-10 rounded-3xl border border-white/5 hover:border-white/10 transition-all flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 px-4 py-1 bg-white/5 rounded-full">Test Drive</span>
                <h3 className="text-2xl font-bold mb-2">Plano Gratuito</h3>
                <div className="text-4xl font-black mb-8">R$ 0<span className="text-sm font-medium text-slate-500">/mês</span></div>
                <ul className="space-y-4 mb-10 text-sm text-slate-400 font-medium">
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> 5 Créditos iniciais</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Todas as plataformas</li>
                  <li className="flex items-center gap-2 justify-center line-through opacity-30 text-slate-600">Teste A/B de Títulos</li>
                </ul>
                <Link href="/register" className="btn-secondary w-full justify-center py-4 mt-auto">Começar Grátis</Link>
              </div>

              {/* Professional Plan */}
              <div className="glass-card p-10 rounded-3xl border border-[#22c55e]/20 bg-slate-900/40 transform scale-105 z-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center shadow-[#22c55e]/5">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles size={24} className="text-[#22c55e] opacity-20" />
                </div>
                <span className="text-[10px] font-bold text-[#22c55e] uppercase tracking-widest mb-6 px-4 py-1 bg-[#22c55e]/10 rounded-full border border-[#22c55e]/20">Best Seller</span>
                <h3 className="text-2xl font-bold mb-2">Profissional</h3>
                <div className="text-4xl font-black mb-8 text-white">R$ 49<span className="text-sm font-medium text-slate-500">/mês</span></div>
                <ul className="space-y-4 mb-10 text-sm text-slate-300 font-medium list-none">
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> 30 Créditos mensais inclusos</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Teste A/B de Títulos Ilimitado</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Algoritmo Anti-Bloqueio (SafePost)</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Acesso Total (OLX, ML, Shopee)</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Suporte Prioritário por E-mail</li>
                </ul>
                <CheckoutButton planId="profissional" className="btn-primary w-full justify-center py-4 text-sm mt-auto shadow-lg shadow-[#22c55e]/20">
                  Assinar agora <ArrowRight size={16} />
                </CheckoutButton>
              </div>

              {/* Agency Plan */}
              <div className="glass-card p-10 rounded-3xl border border-white/5 hover:border-[#22c55e]/20 transition-all flex flex-col items-center text-center group">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#22c55e] transition-colors uppercase tracking-widest mb-6 px-4 py-1 bg-white/5 rounded-full">Alta Performance</span>
                <h3 className="text-2xl font-bold mb-2">Agência</h3>
                <div className="text-4xl font-black mb-8">R$ 97<span className="text-sm font-medium text-slate-500">/mês</span></div>
                <ul className="space-y-4 mb-10 text-sm text-slate-400 font-medium list-none">
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> 100 Créditos mensais (Acumulativos)</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Multi-Tone Engine (IA com emoção)</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Consultoria SEO para Marketplace</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Geração em Lote (Super Velocidade)</li>
                  <li className="flex items-center gap-2 justify-center"><CheckCircle2 className="text-[#22c55e]" size={16} /> Suporte VIP via WhatsApp 24/7</li>
                </ul>
                <CheckoutButton planId="agencia" className="btn-secondary w-full justify-center py-4 mt-auto group-hover:bg-[#22c55e]/10 group-hover:border-[#22c55e]/30 group-hover:text-[#22c55e]">
                  Adquirir Plano <Zap size={16} />
                </CheckoutButton>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Explanation Section - Multi-platform */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
                <Globe size={24} className="text-[#22c55e]" />
              </div>
              <h2 className="text-4xl font-outfit font-extrabold mb-6 tracking-tight">Uma plataforma para todos os <span className="text-[#22c55e]">seus canais de venda.</span></h2>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium">Gere conteúdo otimizado para as maiores plataformas de e-commerce do Brasil sem precisar reescrever nada.</p>
              <ul className="space-y-4 text-slate-300 font-medium pb-10">
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#22c55e]" size={20} /> OLX: Foco em negociação local</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#22c55e]" size={20} /> Mercado Livre: SEO denso para busca</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="text-[#22c55e]" size={20} /> Shopee: Linguagem dinâmica e emojis</li>
              </ul>
              <Link href="/register" className="btn-primary">Criar Unidade Grátis</Link>
            </div>
            <div className="relative reveal [animation-delay:200ms]">
              <div className="absolute -inset-10 bg-[#22c55e]/10 blur-[100px] opacity-20" />
              <div className="grid grid-cols-1 gap-4">
                <div className="glass-card p-6 rounded-xl border border-white/5 flex items-center justify-between translate-x-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded flex items-center justify-center text-orange-500 font-bold italic">OLX</div>
                    <div>
                      <div className="w-32 h-2 bg-slate-800 rounded mb-2" />
                      <div className="w-48 h-1 bg-slate-800/50 rounded" />
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-slate-700" />
                </div>
                <div className="glass-card p-8 rounded-xl border border-[#22c55e]/20 bg-slate-900/40 scale-105 z-10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded flex items-center justify-center text-yellow-500 font-bold italic">ML</div>
                    <div className="flex-grow">
                      <div className="w-full h-3 bg-[#22c55e]/20 rounded mb-2" />
                      <div className="w-2/3 h-1.5 bg-slate-800 rounded" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-slate-800/50 rounded" />
                    <div className="w-full h-1 bg-slate-800/50 rounded" />
                    <div className="w-3/4 h-1 bg-slate-800/50 rounded" />
                  </div>
                </div>
                <div className="glass-card p-6 rounded-xl border border-white/5 flex items-center justify-between -translate-x-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500/10 rounded flex items-center justify-center text-red-500 font-bold italic">SH</div>
                    <div>
                      <div className="w-32 h-2 bg-slate-800 rounded mb-2" />
                      <div className="w-48 h-1 bg-slate-800/50 rounded" />
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-slate-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 px-6 reveal">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Anúncios Gerados", value: "234K+" },
                { label: "Taxa de Conversão", value: "85%+" },
                { label: "Satisfação do Cliente", value: "4.9/5" },
                { label: "Tempo de Resposta", value: "< 8s" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-black font-outfit text-white mb-2">{stat.value}</div>
                  <div className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-32 px-6 reveal">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-outfit font-extrabold tracking-tight">O que dizem os <br /><span className="text-[#22c55e]">especialistas em vendas.</span></h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { user: "Davi Oliveira", role: "Vendedor Pro Mercado Livre", content: "Antigamente eu levava 30 minutos para criar um único anúncio otimizado. Com o AdGenius, faço em menos de 1 minto e as vendas aumentaram drasticamente." },
                { user: "Juliana Santos", role: "Dropshipping Specialist", content: "O tom de voz para cada marketplace é o que faz a diferença. A IA realmente entende o que o público da Shopee quer ler versus o público da OLX." },
                { user: "Ricardo Lima", role: "Lojista Físico e Online", content: "Minha equipe agora foca no envio dos produtos e o AdGenius cuida de todo o copywriting. O custo-benefício do plano Pro é imbatível." }
              ].map((testimonial, i) => (
                <div key={i} className="glass-card p-10 rounded-2xl border border-white/5 relative group hover:border-[#22c55e]/20 transition-all">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#22c55e] text-[#22c55e]" />)}
                  </div>
                  <p className="text-slate-300 text-lg italic leading-relaxed mb-8">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-full border border-white/10" />
                    <div>
                      <div className="font-bold text-white uppercase text-xs tracking-wider">{testimonial.user}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="help" className="py-32 px-6 bg-slate-950/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20 reveal">
              <h2 className="text-4xl md:text-5xl font-outfit font-extrabold mb-6 tracking-tight">Perguntas <span className="text-[#22c55e]">Frequentes</span></h2>
              <p className="text-lg text-slate-400 font-medium">Tudo o que você precisa saber para começar a escalar suas vendas.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Como o AdGenius AI evita bloqueios?",
                  a: "Utilizamos o algoritmo SafePost que varia a estrutura do texto, utiliza sinônimos inteligentes e evita palavras-gatilho excessivas que costumam disparar filtros automáticos de marketplaces."
                },
                {
                  q: "Quais marketplaces são suportados?",
                  a: "Atualmente suportamos OLX, Mercado Livre, Shopee, e também plataformas de anúncios como Instagram Ads, LinkedIn Ads e TikTok Scripts."
                },
                {
                  q: "Preciso de uma chave de API própria?",
                  a: "Não. O AdGenius AI já vem pronto para uso. Toda a complexidade técnica e custos de IA estão inclusos nos nossos planos e créditos."
                },
                {
                  q: "Como funciona o sistema de créditos?",
                  a: "Cada geração de anúncio (incluindo variações A/B) consome 1 crédito. No plano Pro e Agência, seus créditos mensais são renovados automaticamente."
                },
                {
                  q: "O AdGenius AI gera imagens?",
                  a: "Sim! Integramos o DALL-E 3 da OpenAI para gerar sugestões visuais de alta qualidade que acompanham o seu copy persuasivo."
                }
              ].map((faq, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[#22c55e]/20 transition-all cursor-default group">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-[#22c55e]/10 flex items-center justify-center shrink-0 border border-[#22c55e]/20 group-hover:bg-[#22c55e] group-hover:text-[#020617] transition-all">
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3 font-outfit tracking-tight">{faq.q}</h3>
                      <p className="text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 reveal">
          <div className="max-w-6xl mx-auto glass-card rounded-3xl p-12 md:p-24 border border-[#22c55e]/20 relative overflow-hidden text-center emerald-glow">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Zap size={200} className="text-[#22c55e]" />
            </div>
            <h2 className="text-4xl md:text-6xl font-outfit font-extrabold mb-8 tracking-tight relative z-10">Multiplique Suas Vendas Hoje.</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-xl mx-auto font-medium relative z-10">Junte-se a milhares de vendedores que já usam IA para dominar os maiores marketplaces do país.</p>
            <div className="relative z-10">
              <Link href="/register" className="btn-primary text-lg px-10 py-5">Começar Operação Agora</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Full Footer */}
      <footer className="bg-[#020617] pt-32 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center">
                  <Zap size={20} className="text-black" />
                </div>
                <span className="font-outfit font-bold text-2xl tracking-tighter">AdGenius <span className="text-[#22c55e]">AI</span></span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8 leading-relaxed font-medium">Liderando a revolução do copywriting para e-commerce com inteligência artificial de elite e performance comprovada.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center hover:text-[#22c55e] hover:border-[#22c55e]/40 transition-all cursor-pointer"><Globe size={20} /></div>
                <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center hover:text-[#22c55e] hover:border-[#22c55e]/40 transition-all cursor-pointer"><ShoppingBag size={20} /></div>
                <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center hover:text-[#22c55e] hover:border-[#22c55e]/40 transition-all cursor-pointer"><BarChart3 size={20} /></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-8">Plataforma</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li className="hover:text-white transition-colors"><Link href="#">Recursos</Link></li>
                <li className="hover:text-white transition-colors"><Link href="#">Preços</Link></li>
                <li className="hover:text-white transition-colors"><Link href="#">Histórico</Link></li>
                <li className="hover:text-white transition-colors"><Link href="#">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-[0.2em] mb-8">Empresa</h4>
              <ul className="space-y-4 text-sm font-medium text-slate-500">
                <li className="hover:text-white transition-colors"><Link href="#">Sobre nós</Link></li>
                <li className="hover:text-white transition-colors"><Link href="#">Ajuda</Link></li>
                <li className="hover:text-white transition-colors"><Link href="#">Privacidade</Link></li>
                <li className="hover:text-white transition-colors"><Link href="#">Termos</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">© 2026 Connection Established // Status: Premium SaaS</p>
            <div className="flex gap-8 text-[10px] font-black uppercase text-slate-500 tracking-widest">
              <span className="hover:text-[#22c55e] cursor-pointer">Security Audited</span>
              <span className="hover:text-[#22c55e] cursor-pointer">Optimized Global CDN</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
