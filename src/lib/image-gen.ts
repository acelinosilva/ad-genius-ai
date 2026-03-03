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

        if (!response || !response.data || response.data.length === 0) {
            throw new Error("Failed to generate image: Empty response from OpenAI");
        }
        const imageUrl = response.data[0].url;
        return imageUrl;
    } catch (error) {
        console.error("Erro na geração de imagem DALL-E:", error);
        return null;
    }
}
