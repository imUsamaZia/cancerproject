import Categories from "./Categories";
import RecentPost from "./RecentPost";
import SearchBox from "./SearchBox";
import TagList from "./TagList";

const index = (props) => {
  const {categories,tags,recentPosts}= props;
  return (
    <aside className="sidebar blog-sidebar">
      {/* <!-- Recent Post --> */}
      <div className="sidebar-widget search-widget">
        <div className="sidebar-title">
          <h4>Search by Keywords</h4>
        </div>

        {/* <!--search box--> */}
        <div className="search-box">
          <SearchBox />
        </div>
      </div>

      {/* <!-- Shop Widget --> */}
      <div className="sidebar-widget catagory-widget">
        <div className="sidebar-title">
          <h4>Categories</h4>
        </div>
        <ul className="catagory-list">
          <Categories categories={categories} />
        </ul>
      </div>

      {/* <!-- Recent Post --> */}
      <div className="sidebar-widget recent-post">
        <div className="sidebar-title">
          <h4>Recent Posts</h4>
        </div>

        <div className="widget-content">
          <RecentPost recentPosts={recentPosts} />
        </div>
      </div>

      {/* <!-- Shop Widget --> */}
      <div className="sidebar-widget">
        <div className="sidebar-title">
          <h4>Tags</h4>
        </div>
        <ul className="tag-list">
          <TagList tags={tags} />
        </ul>
      </div>
    </aside>
  );
};

export default index;
