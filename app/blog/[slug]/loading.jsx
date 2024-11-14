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

      <section className="blog-single">
        <div className="auto-container">
          <div className="upper-box skeleton">
            <div className="skeleton-para ">
              <div class="line line-text"></div>
              <div class="line line-text mb-5"></div>
            </div>
            <div className="line line-image mb-5"></div>

            <div className="skeleton-para ">
              <div class="line line-text"></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
              <div class="line line-text "></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
