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

      <div className="sidebar-page-container ">
        <div className="auto-container">
          <div className="row">
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              <div className="blog-grid">
                <div className="row">
                  <>
                    <div className="row">
                      <div className="news-block col-lg-6 col-md-6 col-sm-12 skeleton">
                        <div className="blog_card ">
                          <div className="line line-image mb-5"></div>
                          <div class="line line-heading"></div>
                          <div class="line line-text"></div>
                          <div class="line line-text"></div>
                        </div>
                        {/* End blog-grid */}
                      </div>
                      <div className="news-block col-lg-6 col-md-6 col-sm-12 skeleton">
                        <div className="blog_card ">
                          <div className="line line-image mb-5"></div>
                          <div class="line line-heading"></div>
                          <div class="line line-text"></div>
                          <div class="line line-text"></div>
                        </div>
                        {/* End blog-grid */}
                      </div>
                      <div className="news-block col-lg-6 col-md-6 col-sm-12 skeleton">
                        <div className="blog_card ">
                          <div className="line line-image mb-5"></div>
                          <div class="line line-heading"></div>
                          <div class="line line-text"></div>
                          <div class="line line-text"></div>
                        </div>
                        {/* End blog-grid */}
                      </div>
                      <div className="news-block col-lg-6 col-md-6 col-sm-12 skeleton">
                        <div className="blog_card ">
                          <div className="line line-image mb-5"></div>
                          <div class="line line-heading"></div>
                          <div class="line line-text"></div>
                          <div class="line line-text"></div>
                        </div>
                        {/* End blog-grid */}
                      </div>
                      {/* <!--End Content Side--> */}
                    </div>
                  </>
                </div>
                {/* End .row */}

                {/* End blog pagination */}
              </div>
              {/* End blog-grid */}
            </div>
            {/* <!--End Content Side--> */}

            <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
              <div className="row bg-gray skeleton  h-100vh ">
                <div>
                  <div class="line line-button"></div>
                  <div class="line line-text"></div>
                  <div class="line line-text"></div>
                  <div class="line line-text"></div>
                  <div class="line line-text"></div>
                </div>
              </div>
            </div>
            {/* <!--End Sidebar Side--> */}
          </div>
          {/* End .row */}
        </div>
      </div>
    </>
  );
}
