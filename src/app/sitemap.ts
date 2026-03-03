import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ad-genius-ai-eta.vercel.app';

    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/register`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];
}
