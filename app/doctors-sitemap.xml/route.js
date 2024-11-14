import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from 'xml2js';
import { GetSitemap } from "@/lib/api/Get-Sitemap";
export async function GET(request, response) {

    try {
        const data = await GetSitemap();
        
        // console.log(sitemapdata, 'sitemapdata');

        // Define the old domain and the new domain
        const oldDomain = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
        const newDomain = 'https://www.cancerify.com';

        // Replace the old domain with the new one in the sitemap URLs
        const updatedSitemapXML = data.replace(new RegExp(oldDomain, 'g'), newDomain);

        const sitemap = await parseStringPromise(updatedSitemapXML);
     

        const generateSitemap = () => {
            return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap?.urlset.url
                    .map((doctor) => {
                        return `
            <url>
              <loc>${doctor?.loc}</loc>
              <lastmod>${new Date(doctor.lastmod).toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
                    })
                    .join('')}
    </urlset>`;
        };

        // Call the generateSitemap function to get the XML string
        return new Response(generateSitemap(), {
            status: 200,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
            },
        });

    } catch (error) {
        console.log(error);
        return new NextResponse('Error fetching or processing XML', { status: 500 });
    }
}
