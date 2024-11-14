import dynamic from "next/dynamic";
import BlogList from "@/components/BlogPage/blog-list";
import client from "@/lib/ApolloClient";
import {
  GET_ALL_POSTS,
  GET_ALL_POSTS_CATEGORY,
  GET_ALL_POSTS_TAGS,
  GET_PAGE_SEO
} from "@/lib/Queries";

export async function generateMetadata() {
  const res = await client.request(
    GET_PAGE_SEO,
    // variables are type-checked too!
    { id: 'blogs-seo' }
  );

  const seo = res?.page?.seo || {};
 
  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
    keywords: `${seo.focuskw},${seo?.metaKeywords}`,
    alternates: {
      canonical: `https://www.cancerify.com/blog`,
    },
    openGraph: {
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo?.opengraphImage?.sourceUrl }]
        : [],
    },
  };
}
const page = async ({searchParams}) => {
  const {endCursor, startCursor} = searchParams;
  // Get all posts
  const res = await client.request(GET_ALL_POSTS, { after: endCursor || "", before: startCursor || "", first: 4});
  const posts = res?.posts?.nodes || [];
  // get all categories

  const resCate = await client.request(GET_ALL_POSTS_CATEGORY);
  const categories = resCate?.categories?.nodes || [];

  // get all tags
  const resTags = await client.request(GET_ALL_POSTS_TAGS);
  const tags = resTags?.tags?.nodes || [];



  return (
    <>
      <BlogList
        pageInfo={res?.posts?.pageInfo}
        posts={posts}
        categories={categories}
        tags={tags}
      />
    </>
  );
};

export default page;
// export default dynamic(() => Promise.resolve(page), { ssr: false });
