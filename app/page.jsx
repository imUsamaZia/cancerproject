
// app/page.jsx

import Home from "@/components/Home";
import Wrapper from "@/layout/Wrapper";
import {
  fetchCancers,
  fetchMostSearched,
  fetchOurMission,
  fetchPage,
  fetchPosts,
  fetchSEOData,
  fetchTestimonials,
} from "../lib/api/fetchData";

export async function generateMetadata() {
  const seo = await fetchSEOData();

  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
    keywords: `${seo.focuskw},${seo?.metaKeywords}`,
    alternates: {
      canonical: `https://www.cancerify.com`,
    },
    openGraph: {
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo?.opengraphImage?.sourceUrl }]
        : [],
    },
  };
}

export default async function Page() {
  // Fetch all data concurrently
  const [cancers, testimonials, posts, page, ourMission, mostsearcheds] =
    await Promise.all([
      fetchCancers(),
      fetchTestimonials(),
      fetchPosts(),
      fetchPage(),
      fetchOurMission(),
      fetchMostSearched(),
    ]);

  return (
    <Wrapper>
      <Home
        cancers={cancers}
        testimonials={testimonials}
        posts={posts}
        page={page}
        mostsearcheds={mostsearcheds}
        ourMission={ourMission}
      />
    </Wrapper>
  );
}
