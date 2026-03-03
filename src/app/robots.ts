import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/api/', '/admin/', '/settings/'],
        },
        sitemap: 'https://ad-genius-ai-eta.vercel.app/sitemap.xml',
    };
}
