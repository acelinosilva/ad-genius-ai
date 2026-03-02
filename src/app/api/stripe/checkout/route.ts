import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16", // Reverting to a more stable version unless user strictly needs 2026
});

export async function POST(req: Request) {
    try {
        const { planId } = await req.json();
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

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
        }

        const unitAmount = planId === "profissional" ? 4900 : 9700;
        const planName = planId === "profissional" ? "Plano Profissional" : "Plano Agência";

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

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error("Stripe Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
