import Link from "next/link";
import Image from "next/image";

const BlogSection = (props) => {
    const { posts } = props;
  return (
    <>
      {posts?.map((item) => (
        <div className="news-block col-lg-4 col-md-6 col-sm-12" key={item.id}>
          <div className="inner-box">
            <div className="image-box">
              {
                item.featuredImage?.node?.sourceUrl ? (
                  <figure className="image">
                    <Image
                      width={389}
                      height={258}
                      src={item.featuredImage?.node?.sourceUrl}
                      alt={item.title}
                    />
                  </figure>
                ) : (
                  <figure className="image">
                    <Image
                      width={389}
                      height={258}
                      src="https://placehold.co/389x258.png"
                      alt={item.title}
                    />
                  </figure>
                )
                //
              }
            </div>
            {/* End image-box */}

            <div className="lower-content">


              <h3>
                <Link className="truncate-1" href={`/blog/${item?.slug}`}>{item.title}</Link>
              </h3>

              <div
                className="text truncate-4"
                dangerouslySetInnerHTML={{ __html: item.excerpt }}
              />
              <Link href={`/blog/${item.slug}`} className="read-more ">
                Read More <i className="fa fa-angle-right"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogSection;
