import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_placeholder', {
    apiVersion: "2026-02-25.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Use service role for database updates from webhook
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

export async function POST(req: Request) {
    const body = await req.text();
    const headerList = await headers();
    const signature = headerList.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;

        if (userId) {
            // 1. Update Subscriptions table
            await supabaseAdmin.from("subscriptions").upsert({
                user_id: userId,
                stripe_customer_id: session.customer as string,
                stripe_subscription_id: session.subscription as string,
                status: subscription.status,
                plan_id: planId,
                current_period_end: new Date((subscription.items.data[0].current_period_end as number) * 1000).toISOString(),
            });

            // 2. Update Profile credits
            const creditsToAdd = planId === "agencia" ? 100 : 30; // 30 for Professional, 100 for Agency

            const { data: profile } = await supabaseAdmin
                .from("profiles")
                .select("credits")
                .eq("id", userId)
                .single();

            if (profile) {
                await supabaseAdmin
                    .from("profiles")
                    .update({
                        credits: (profile.credits || 0) + creditsToAdd,
                        plan: planId
                    })
                    .eq("id", userId);
            }
        }
    }

    if (event.type === "customer.subscription.deleted") {
        const subscriptionId = (event.data.object as Stripe.Subscription).id;
        await supabaseAdmin
            .from("subscriptions")
            .update({ status: "canceled" })
            .eq("stripe_subscription_id", subscriptionId);
    }

    return NextResponse.json({ received: true });
}
