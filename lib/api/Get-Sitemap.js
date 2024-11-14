
export async function GetSitemap() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/doctors-sitemap.xml`, {
        next: {
            revalidate: 10
        }
    }).then(res => res.text());

    return data;
}
