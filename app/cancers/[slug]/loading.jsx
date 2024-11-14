import Header from "@/components/Home/Header";
import MobileMenu from "@/components/header/MobileMenu";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}
      <section className="job-detail-section">
        <div className="job-detail-outer reverse">
          <div className="auto-container">
            <div className="row cancer_row">
              <div className="desktop-hidden sidebar-column col-lg-4 col-md-12 col-sm-12">
                <div className="h-100vh bg-gray skeleton sidebar-widget company-widget">
                  <div class="line line-button"></div>
                  <div class="line line-text"></div>
                  <div class="line line-text"></div>
                  <div class="line line-text"></div>
                  <div class="line line-text"></div>
                </div>
              </div>
              <div className="content-column col-lg-8 col-md-12 col-sm-12 pb-5 ">
                <div className=" skeleton ">
                  <div className="skeleton-para ">
                    <div class="line line-heading"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text mb-5"></div>
                  </div>
                  <div className="skeleton-para">
                    <div class="line line-heading"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text mb-5"></div>
                  </div>
                  <div className="skeleton-para">
                    <div class="line line-heading"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text mb-5"></div>
                  </div>
                  <div className="skeleton-para">
                    <div class="line line-heading"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text"></div>
                    <div class="line line-text mb-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
