import { GET_NEWS_FEEDS, GET_OTHER_PAGE, GET_PAGE_SEO } from "@/lib/Queries";
import client from "@/lib/ApolloClient";
import MobileMenu from "@/components/header/MobileMenu";
import NewsFeedItem from "@/components/NewsFeeds/NewsFeedItem";
import dynamic from "next/dynamic";
import Header from "@/components/Home/Header";
import Disclaimer from "@/components/Home/Disclaimer";
import { Suspense } from "react";

export async function generateMetadata() {
  const res = await client.request(
    GET_PAGE_SEO,
    // variables are type-checked too!
    { id: "news" }
  );

  const seo = res?.page?.seo || {};

  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
    keywords: `${seo.focuskw},${seo?.metaKeywords}`,
    alternates: {
      canonical: `https://www.cancerify.com/news`,
    },
    openGraph: {
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo?.opengraphImage?.sourceUrl }]
        : [],
    },
  };
}

const Page = async ({ params }) => {
  const res = await client.request(GET_NEWS_FEEDS);
  const newsFeeds = res?.newsFeeds?.nodes || [];

  const newsFeedRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/pages/1652`
  );
  const newsFeedPage = await newsFeedRes.json();

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <main className="blog_page_head">
        <div className="b_wrapper">
          <h2>Find the latest cancer news</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: newsFeedPage?.content?.rendered,
            }}
          />
        </div>
      </main>
      <Suspense fallback={"loading..."}>
        {/* <!--End Page Title--> */}
        <div className="news_feed_wraper auto-container  my-5">
          {newsFeeds?.length ? (
            <div className="news_feed_lists">
              {newsFeeds?.map((newsFeed) => (
                <NewsFeedItem key={newsFeed.id} item={newsFeed} />
              ))}
            </div>
          ) : (
            <p>No news feed found</p>
          )}
        </div>
      </Suspense>
      {/* End .row */}
      <Disclaimer />
    </>
  );
};
export default dynamic(() => Promise.resolve(Page), { ssr: false });
