import Blog6 from "../../blog/Blog6";
import MobileMenu from "../../header/MobileMenu";
import BlogPagination from "../blog-sidebar/BlogPagination";
import BlogSidebar from "../blog-sidebar";
import Header from "@/components/Home/Header";
import Disclaimer from "@/components/Home/Disclaimer";
// import Breadcrumb from "../../common/Breadcrumb";

const index = (props) => {
  const { posts, pageInfo, categories, tags } = props;

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
                  <Blog6 pageInfo={pageInfo} posts={posts} />
                </div>
                {/* End .row */}

                {/* End blog pagination */}
              </div>
              {/* End blog-grid */}
            </div>
            {/* <!--End Content Side--> */}

            <div className="sidebar-side col-lg-4 col-md-12 col-sm-12">
              <BlogSidebar
                recentPosts={posts}
                categories={categories}
                tags={tags}
              />
            </div>
            {/* <!--End Sidebar Side--> */}
          </div>
          {/* End .row */}
        </div>
      </div>
      {/* <!-- End Sidebar Container --> */}

      <Disclaimer />
    </>
  );
};

export default index;
