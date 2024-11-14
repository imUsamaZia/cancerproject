// lib/api/fetchData.js

import client from "../ApolloClient";
import {
  GET_ALL_CANCERS,
  GET_ALL_POSTS,
  GET_HOME_PAGE,
  GET_MOST_SEARCHED,
  GET_PAGE_SEO,
  GET_TESTIMONIALS,
} from "../Queries";

export async function fetchCancers() {
  const res = await client.request(GET_ALL_CANCERS);
  console.log("TESTING", res);
  return res?.cancers?.nodes || [];
}

export async function fetchTestimonials() {
  const res = await client.request(GET_TESTIMONIALS);
  return res?.testimonials?.nodes || [];
}

export async function fetchPosts() {
  const res = await client.request(GET_ALL_POSTS, { after: "", first: 3 });
  return res?.posts?.nodes || [];
}

export async function fetchPage() {
  const res = await client.request(GET_HOME_PAGE, { id: "home" });
  return res?.page || [];
}

export async function fetchOurMission() {
  const resMission = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/pages/39`
  );
  const missionData = await resMission.json();
  return missionData?.meta?.ourmissionlists || {};
}

export async function fetchMostSearched() {
  const res = await client.request(GET_MOST_SEARCHED);
  return res?.mostsearcheds?.nodes || [];
}

export async function fetchSEOData() {
  const res = await client.request(GET_PAGE_SEO, { id: "home" });
  return res?.page?.seo || {};
}
