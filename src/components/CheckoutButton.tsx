"use client";

import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

interface CheckoutButtonProps {
    planId: "profissional" | "agencia";
    className?: string;
    children: React.ReactNode;
}

export default function CheckoutButton({ planId, className, children }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || "Erro ao iniciar checkout");
            }
        } catch (err: any) {
            alert("Erro: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={className || "btn-primary"}
        >
            {loading ? (
                <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" /> Processando...
                </span>
            ) : (
                children
            )}
        </button>
    );
}
