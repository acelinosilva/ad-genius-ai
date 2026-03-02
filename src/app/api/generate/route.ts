import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateAdImage } from "@/lib/image-gen";
import { supabase } from "@/lib/supabase";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { platform, productName, details, tone, generateImage, userId } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Chave de API do Gemini não configurada.");
        }

        // Fetch User Brand Voice
        let brandIdentity = "";
        if (userId) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("brand_name, brand_voice_desc, brand_archetype")
                .eq("id", userId)
                .single();

            if (profile?.brand_name) {
                brandIdentity = `
                IDENTIDADE DA MARCA:
                - Nome da Marca: ${profile.brand_name}
                - Tom de Voz/Personalidade: ${profile.brand_voice_desc}
                - Arquétipo: ${profile.brand_archetype}
                
                Siga RIGOROSAMENTE esta identidade verbal em sua escrita.
                `;
            }
        }

        const platformSpecifics: any = {
            olx: {
                name: "OLX Brasil",
                rules: "Títulos curtos e diretos (máx 60 carac). Descrição honesta, sem emojis excessivos, focada em estado de conservação e local de retirada.",
                maxTitle: 60,
                maxDesc: 2000
            },
            mercadolivre: {
                name: "Mercado Livre",
                rules: "Títulos focados em busca SEO (máx 60 carac). Descrição técnica, organizada em bullets, focada em especificações, garantia e envio rápido. Proibido links externos.",
                maxTitle: 60,
                maxDesc: 5000
            },
            shopee: {
                name: "Shopee",
                rules: "Títulos longos com palavras-chave (máx 120 carac). Descrição vibrante, uso moderado de emojis, focada em promoções, cupons e satisfação do cliente.",
                maxTitle: 120,
                maxDesc: 3000
            },
            instagram: {
                name: "Instagram Ads",
                rules: "Legendas curtas e visuais. Uso estratégico de hashtags. Foco total em estilo de vida e estética. CTA direto para o link na bio ou direct.",
                maxTitle: 40,
                maxDesc: 2200
            },
            linkedin: {
                name: "LinkedIn Ads",
                rules: "Tom profissional e autoritário. Foco em B2B, estatísticas, resultados e autoridade. Linguagem corporativa polida.",
                maxTitle: 100,
                maxDesc: 3000
            },
            tiktok: {
                name: "TikTok Script",
                rules: "Roteiro de vídeo. Comece com um HOOK (gancho) de 3 segundos. Use linguagem casual, gírias atuais e foco em tendências. Curto e barulhento.",
                maxTitle: 60,
                maxDesc: 1000
            }
        };

        const platformData = platformSpecifics[platform] || platformSpecifics.olx;

        const adPrompt = `
            Você é um Copywriter Especialista em Marketing Digital de Alta Performance.
            Sua tarefa é criar um anúncio de ALTA PERFORMANCE para o produto: "${productName}".
            
            DETALHES DO PRODUTO:
            ${details}
            
            PLATAFORMA ALVO: ${platformData.name}
            TOM DE VOZ: ${tone}
            
            REGRAS ESPECÍFICAS DA PLATAFORMA:
            ${platformData.rules}
            
            ${brandIdentity}
            
            REQUISITOS DE SAÍDA (JSON):
            - "titles": Uma lista com exatamente 3 variações de títulos otimizados para a plataforma. Respeite o limite de ${platformData.maxTitle} caracteres.
            - "description": Uma descrição persuasiva, profissional e formatada (use quebras de linha \\n). Use técnicas de vendas como AIDA ou PAS. Respeite o limite de ${platformData.maxDesc} caracteres.
            - "keywords": Uma lista de 5 a 8 palavras-chave (tags) relevantes para busca.
            - "conversionScore": Um valor de 0 a 100 representando a força do copy para a plataforma escolhida.
            - "scoreReason": Uma frase curta explicando por que essa pontuação (pontos fortes do copy).

            A resposta deve ser um objeto JSON válido.
        `;

        const modelNames = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-2.5-flash", "gemini-pro"];
        let text = "";
        let success = false;
        let lastError: any = null;

        for (const name of modelNames) {
            try {
                // Configuração específica para cada modelo (JSON support em 1.5, 2.0 e 2.5)
                const supportsJson = name.includes("1.5") || name.includes("2.0") || name.includes("2.5");
                const model = genAI.getGenerativeModel({
                    model: name,
                    generationConfig: {
                        responseMimeType: supportsJson ? "application/json" : undefined
                    }
                });

                const result = await model.generateContent(adPrompt);
                const response = await result.response;
                text = response.text();

                if (text) {
                    success = true;
                    console.log(`Sucesso com o modelo: ${name}`);
                    break;
                }
            } catch (err: any) {
                lastError = err;
                console.warn(`Tentativa com modelo ${name} falhou:`, err.message);
            }
        }

        if (!success) {
            console.error("Todos os modelos Gemini falharam:", lastError);
            return NextResponse.json({
                error: `Erro total na IA. Nenhum modelo disponível funcionou. Último erro: ${lastError?.message || "Erro desconhecido"}`
            }, { status: 500 });
        }

        let jsonResponse;
        try {
            // Remove possíveis blocos de código markdown que o Gemini possa retornar mesmo com responseMimeType
            const cleanText = text.replace(/```json\n?|\n?```/g, "").trim();
            jsonResponse = JSON.parse(cleanText);
        } catch (parseError) {
            console.error("Erro ao parsear JSON do Gemini. Texto recebido:", text);
            return NextResponse.json({
                error: "A IA não retornou um formato de dados válido. Tente reformular os detalhes do produto."
            }, { status: 500 });
        }

        // Geração de Imagem (opcional)
        if (generateImage) {
            const imageUrl = await generateAdImage(productName);
            jsonResponse.imageUrl = imageUrl;
        }

        return NextResponse.json(jsonResponse);

    } catch (error: any) {
        console.error("Erro na geração Gemini:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
