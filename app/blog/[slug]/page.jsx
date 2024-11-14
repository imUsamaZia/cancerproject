import DetailsContent from "@/components/BlogPage/blog-details/details-content";
import dynamic from "next/dynamic";
import MobileMenu from "@/components/header/MobileMenu";
import Image from "next/image";

import client from "@/lib/ApolloClient";
import { GET_SINGLE_POST, GET_POST_SEO } from "@/lib/Queries";
import Header from "@/components/Home/Header";
import Disclaimer from "@/components/Home/Disclaimer";

export async function generateMetadata({ params: { slug } }) {
  const res = await client.request(
    GET_POST_SEO,
    // variables are type-checked too!
    { id: slug }
  );

  const seo = res?.post?.seo || {};
  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
    keywords: `${seo.focuskw},${seo?.metaKeywords}`,
    alternates: {
      canonical: `https://www.cancerify.com/news/${slug}`,
    },
    openGraph: {
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo?.opengraphImage?.sourceUrl }]
        : [],
    },
  };
}

const SingleBlog = async ({ params }) => {
  const { slug } = params;

  const resPost = await client.request(GET_SINGLE_POST, { id: slug });

  const post = resPost?.post || {};



  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}



      {/* <!-- Blog Single --> */}
      <section className="blog-single">
        <div className="auto-container">
          <div className="upper-box">
            <h1 className="blog__title">{post?.title}</h1>

            <ul className="post-info">
              <li>
                <span className="thumb">
                  <Image
                    width={30}
                    height={30}
                    src={
                      post?.author?.node?.avatar?.url ||
                      "/images/resource/resource-1.jpg"
                    }
                    alt="resource"
                  />
                </span>
                {post?.author?.node?.name}
              </li>
            </ul>
            {/* End post info */}
          </div>
        </div>
        {/* End auto-container */}
        {post?.featuredImage?.node?.sourceUrl && (
          <figure className="main-image ">
            <Image
              width="1903"
              height="500"
              src={post?.featuredImage?.node?.sourceUrl}
              alt="resource"
            />
          </figure>
        )}

        <DetailsContent
          categories={post?.categories?.nodes || []}
          postBlocks={post?.blocksJSON}
          slug={slug}
          title={post?.title}
        />
      </section>
      {/* <!-- End Blog Single --> */}
      <Disclaimer />
    </>
  );
};
export default SingleBlog;
// export default dynamic(() => Promise.resolve(SingleBlog), {
//   ssr: false,
// });
