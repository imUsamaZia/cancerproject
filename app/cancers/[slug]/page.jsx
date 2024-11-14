import dynamic from "next/dynamic";
import MobileMenu from "@/components/header/MobileMenu";
import Details from "@/components/Cancers-listing/Cancer-single/Details";
import client from "@/lib/ApolloClient";
import { GET_CANCER, GET_CANCER_SEO } from "@/lib/Queries";
import { notFound } from "next/navigation";
import FindDocButton from "@/components/Cancers-listing/FindDocButton";
import Header from "@/components/Home/Header";
import Disclaimer from "@/components/Home/Disclaimer";
import parseHtml from "@/lib/Parser";

export async function generateMetadata({ params: { slug } }) {
  const res = await client.request(
    GET_CANCER_SEO,
    // variables are type-checked too!
    { id: slug }
  );

  const seo = res?.cancer?.seo || {};
  return {
    title: seo?.title?.replace(/(<([^>]+)>)/gi, "") || "",
    description: seo?.metaDesc || "",
    keywords: `${seo.focuskw},${seo?.metaKeywords}`,
    openGraph: {
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo?.opengraphImage?.sourceUrl }]
        : [],
    },
  };
}

const Page = async ({ params }) => {
  const { slug } = params;

  const resCancer = await client.request(GET_CANCER, { id: slug });
  const cancer = resCancer.cancer;

  if (!cancer?.title) return notFound();

  const supportGroups = cancer?.cancersOptions?.supportGroups || "";
  const financialSupportOrganizations =
    cancer?.cancersOptions?.financialSupportOrganizations || "";
  const trustedInstitutions = cancer?.cancersOptions?.trustedInstitutions || "";

  const blocks = JSON.parse(cancer?.blocksJSON || "");

  const metaDetails = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/wp/v2/cancers/${cancer?.databaseId}`
  );
  const metaDetailsJson = await metaDetails.json();


  const mobileContent = metaDetailsJson?.meta?.mobilecontent
    ? Object.values(metaDetailsJson?.meta?.mobilecontent || {})
    : [];

  const mobileInrtoduction = metaDetailsJson?.meta?._description || "";

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <section className="job-detail-section">
        {/* <!-- job-detail-outer--> */}
        <div className="job-detail-outer reverse">
          <div className="auto-container">
            <div className="row cancer_row">
              <div className="desktop-hidden sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar pd-right">
                  {/* <!-- Sidebar Widget --> */}
                  <div className="sidebar-widget company-widget">
                    <div className="btn-box pb-4 desktop-hidden">
                      <FindDocButton
                        title={cancer?.title.replace(/(<([^>]+)>)/gi, "")}
                      />
                    </div>

                    {supportGroups !== "" && (
                      <div className="widget-content cancer-widget-content pt-4">
                        {/* <h4 className="widget-title"> Support Groups</h4> */}
                        <div className="sidebar_content_wraper text-15">
                          {parseHtml(supportGroups)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* End company-widget */}

                  {financialSupportOrganizations !== "" && (
                    <div className="sidebar-widget cancer-widget-content company-widget">
                      {/* <h4 className="widget-title"> Financial support organisations</h4> */}
                      <div className="widget-content ">
                        {/*  compnay-info */}
                        <div className="sidebar_content_wraper text-15">
                          {parseHtml(financialSupportOrganizations)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* End sidebar-widget */}
                  {trustedInstitutions !== "" && (
                    <div className="sidebar-widget company-widget">
                      <div className="widget-content cancer-widget-content ">
                        {/* <h4 className="widget-title">Trusted institutions</h4> */}
                        <div className="sidebar_content_wraper text-15">
                          {parseHtml(trustedInstitutions)}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* End contact-widget */}
                </aside>

                {/* End .sidebar */}
              </div>

              {/* End .sidebar-column */}

              <div className="content-column col-lg-8 col-md-12 col-sm-12 pb-5 ">
                {/*  job-detail */}

                <Details
                  supportGroups={supportGroups}
                  financialSupportOrganizations={financialSupportOrganizations}
                  trustedInstitutions={trustedInstitutions}
                  mobileContent={mobileContent}
                  mobileInrtoduction={mobileInrtoduction}
                  title={cancer?.title}
                  blocks={blocks}
                />

                {/* End job-detail */}
              </div>
              {/* End .content-column */}
            </div>
            {/* End row */}
          </div>
        </div>
      </section>

      <Disclaimer />
    </>
  );
};
export default Page;
// export default dynamic(() => Promise.resolve(Page), {
//   ssr: false,
// });
