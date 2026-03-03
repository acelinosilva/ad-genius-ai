import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_placeholder', {
    apiVersion: "2026-02-25.clover",
});

export async function POST(req: Request) {
    try {
        const { planId } = await req.json();
        console.log("Checkout Request for Plan:", planId);

        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_placeholder') {
            console.error("ERRO: STRIPE_SECRET_KEY não configurada corretamente na Vercel.");
            return NextResponse.json({ error: "Configuração do servidor incompleta (Stripe Key)" }, { status: 500 });
        }

        const cookieStore = await cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value;
                    },
                    set(name: string, value: string, options: any) {
                        cookieStore.set({ name, value, ...options });
                    },
                    remove(name: string, options: any) {
                        cookieStore.set({ name, value: "", ...options });
                    },
                },
            }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error("Erro de Autenticação no Checkout:", authError);
            return NextResponse.json({ error: "Não autorizado ou sessão expirada" }, { status: 401 });
        }

        console.log("Usuário autenticado:", user.email);

        const unitAmount = planId === "profissional" ? 4900 : 9700;
        const planName = planId === "profissional" ? "Plano Profissional" : "Plano Agência";

        console.log("Criando sessão do Stripe...");
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card", "boleto"],
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product_data: {
                            name: planName,
                            description: `Assinatura mensal do AdGenius AI - ${planName}`,
                        },
                        unit_amount: unitAmount,
                        recurring: {
                            interval: "month",
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pricing?canceled=true`,
            customer_email: user.email,
            metadata: {
                userId: user.id,
                planId: planId,
            },
        });

        console.log("Sessão Stripe criada com sucesso:", session.id);
        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error("Stripe Checkout Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
