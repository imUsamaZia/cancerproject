import client from "@/lib/ApolloClient";
import {GET_PAGE_SEO, GET_ALL_CANCERS, GET_LOCATIONS, GET_ALL_SPECIALIZATIONS,GET_DOCTORS_PAGE } from "@/lib/Queries";
import DoctorLists from "@/components/doctor-listings/doctors-list";

export async function generateMetadata() {
  const res = await client.request(
    GET_PAGE_SEO,
    // variables are type-checked too!
    { id: 'doctors' }
  );

  const seo = res?.page?.seo || {};

  return {
    title: seo?.title || "",
    description: seo?.metaDesc || "",
    keywords: `${seo.focuskw},${seo?.metaKeywords}`,
    alternates: {
      canonical: `https://www.cancerify.com/doctors`,
    },
    openGraph: {
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo?.opengraphImage?.sourceUrl }]
        : [],
    },
  };
}

async function getDoctors(params) {
  
  const offset = 400;

  const cancerQuery =
  params?.q === undefined ? "" : `&cancer_q=${params?.q?.replace(/ /g, "-").toLowerCase().replace("-cancer", "").split('-')[0]}`;
  
  const locationQuery =
  params?.location_ids === undefined ? "" : `&location_ids=%5B${params?.location_ids}%5D`;
  
  const specialityQuery =
    params?.specialization_ids === undefined ? "" : `&specialization_ids=%5B${params?.specialization_ids}%5D`;
  
  const res =  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/doctors/v1/get_drs?limit=${offset}${cancerQuery}${locationQuery}${specialityQuery}`)
  var doctors = await res.json()
  doctors = doctors.data?.doctors?.nodes
  return doctors
}

const page = async ({searchParams}) => {

  // get cancers
  const resCan = await client.request(GET_ALL_CANCERS);
  const cancers = resCan?.cancers?.nodes || [];

  // get locations
  const resLocations = await client.request(GET_LOCATIONS);
  const locations = resLocations?.locations?.nodes || [];

  // get specialities
  const resSpecialities = await client.request(GET_ALL_SPECIALIZATIONS);
  const specialities = resSpecialities?.specializations?.nodes || [];

  const docPage = await client.request(GET_DOCTORS_PAGE);
  const {filter} = docPage?.page?.doctorsOptions || {};
  
  const doctors = await getDoctors(searchParams)

  return (
    <>
        <DoctorLists filter={filter} locations={locations} cancers={cancers} doctors={doctors} specialities={specialities} />
    </>
  );
};

export default page
// export default dynamic(() => Promise.resolve(page), { ssr: false });
