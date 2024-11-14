import Link from "next/link";
import Image from "next/image";
import moment from "moment/moment";

const RecentPost = (props) => {
  const { recentPosts } = props;
  return (
    <>
      {recentPosts?.slice(0, 3).map((item) => (
        <article className="post" key={item.id}>
          <div className="post-thumb">
            <Link href={`/blog/${item.slug}`}>
            {
                item.featuredImage?.node?.sourceUrl ? (
                  <Image width={150} height={150} src={item.featuredImage?.node?.sourceUrl} alt="blog post" />
                ) : (
                  <figure className="image">
                    <Image
                      width={150}
                      height={150}
                      src="https://placehold.co/150x150.png"
                      alt={item.title}
                    />
                  </figure>
                )
                //
              }
              
            </Link>
          </div>
          <h6>
            <Link href={`/blog/${item.slug}`}>{item.title}</Link>
          </h6>
          <div className="post-info">{moment(item?.date).format('MMMM DD, YYYY')}</div>
        </article>
      ))}
    </>
  );
};

export default RecentPost;
