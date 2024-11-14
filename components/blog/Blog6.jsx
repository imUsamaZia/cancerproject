"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BlogPagination from '@/components/BlogPage/blog-sidebar/BlogPagination';

const Blog6 = (props) => {
  const { posts, pageInfo } = props;
  const [filteredPosts, setFilteredPosts] = useState([...posts]);
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  useEffect(() => {
    if (search) {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [search, posts]);

  return (
    <>
      {!filteredPosts?.length ? (
        <div className="p-5 flex items-center justify-center">
            No posts found!
        </div>
      ) : (
        <div className="row">
          {filteredPosts?.map((item) => (
            <div
              className="news-block col-lg-6 col-md-6 col-sm-12"
              key={item.id}
            >
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
                  {/* End post meta */}

                  <h3>
                    <Link className="truncate-1" href={`/blog/${item?.slug}`}>
                      {item.title}
                    </Link>
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
        </div>
      )}

      {
        // if posts length less or equal then 4 don't show Pagination
        filteredPosts?.length >= 4 ? <BlogPagination pageInfo={pageInfo} /> : null
      }
    </>
  );
};

export default Blog6;
