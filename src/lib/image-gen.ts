import { OpenAI } from "openai";

export async function generateAdImage(prompt: string) {
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey || apiKey === "your_key_here") {
            console.warn("OPENAI_API_KEY não configurada. Geração de imagem desativada.");
            return null;
        }

        const openai = new OpenAI({
            apiKey: apiKey,
        });

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Create a professional, high-quality commercial product photograph for an advertisement. The product is: ${prompt}. Clean background, studio lighting, commercial aesthetic, 4k resolution.`,
            n: 1,
            size: "1024x1024",
            quality: "standard",
        });

        return response.data[0].url;
    } catch (error) {
        console.error("Erro na geração de imagem DALL-E:", error);
        return null;
    }
}
