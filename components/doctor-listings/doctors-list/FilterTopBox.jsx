// FilterTopBox.js
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SkeletonLoader from "./Skeleton"; // Import SkeletonLoader
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};
const FilterTopBox = ({ doctors, handleDataFromChild }) => {
  const { keyword } = useSelector((state) => state.candidateFilter) || {};
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const mainKeyword = query ? query : keyword;

  const [visibleItems, setVisibleItems] = useState(6);
  const [loading, setLoading] = useState(true);

  // Load more items
  const loadMoreItems = () => {
    if (!loading && visibleItems < doctors?.length) {
      setTimeout(() => {
        setLoading(true);
        setVisibleItems((prev) => prev + 6);
      }, 200); // Adjust delay if needed
    }
  };
  const isFirefox = typeof InstallTrigger !== "undefined";
  const handleSmoothScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
      requestAnimationFrame(loadMoreItems); // Smooth scroll trigger
    }
  }, 50); // Adjusted delay for smoother performance
  const handleScroll = debounce(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 150 &&
      !loading
    ) {
      loadMoreItems();
    }
  }, 200);

  useEffect(() => {
    if (isFirefox) {
      window.addEventListener("wheel", handleSmoothScroll); // Using 'wheel' for Firefox
    } else {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isFirefox) {
        setLoading(false);
        window.removeEventListener("wheel", handleSmoothScroll);
      } else {
        setLoading(false);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [visibleItems, doctors?.length, loading]);


  useEffect(() => {
    handleDataFromChild(visibleItems);
  }, [visibleItems]);

  return (
    <>
      <Suspense>
        {loading ? (
          Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonLoader key={idx} /> // Display skeletons
          ))
        ) : (
          <>
            {doctors?.length ? (
              doctors.slice(0, visibleItems)?.map((doctor, idx) => {
                return (
                  <div className="candidate-block-three" key={idx}>
                    <Link href={`/doctors/${doctor?.slug}`}>
                      <div className="inner-box box-height">
                        <div className="content custom-content">
                          <div className="name">
                            <div className="flex items-center ">
                              {doctor?.specializations?.nodes?.map((val) => (
                                <h6
                                  key={val.id}
                                  className="designation pb-2 mb-hidden"
                                >
                                  {val?.name}
                                </h6>
                              ))}
                            </div>
                            <h4 className="name">
                              <span>{doctor?.title}</span>
                            </h4>
                            <div className="flex items-center desktop-hidden">
                              {doctor?.specializations?.nodes?.map((val) => (
                                <h6 key={val?.id} className="designation pl-2">
                                  {val?.name}
                                </h6>
                              ))}
                            </div>
                          </div>
                          {/* For mobile   */}
                          <div className="mb-hidden  pb-1 ">
                            <div className="flex items-center">
                              {doctor?.doctorsoptions?.location?.map((val) => (
                                <h6
                                  key={val?.id}
                                  className="location_name pr-8 pb-2"
                                >
                                  {val?.title}
                                </h6>
                              ))}
                            </div>
                          </div>
                          {/* End candidate-info for desktop */}
                          <ul className="candidate-info desktop-hidden pt-3">
                            <li className=" ">
                              <span className="icon flaticon-map-locator"></span>
                              <p className="line-clamp-1">
                                {doctor?.doctorsoptions?.address}
                              </p>
                            </li>
                          </ul>
                          <div className=" mb-hidden mb-lists">
                            <div className=" flex items-center">
                              {doctor?.doctorsoptions?.cancer_treated && (
                                <ul className="post-tags">
                                  {doctor?.doctorsoptions?.cancer_treated.map(
                                    (val, i) => (
                                      <li
                                        className={`${mainKeyword ===
                                          val?.title
                                            ?.replaceAll("&lt;", "<")
                                            .replace(/(<([^>]+)>)/gi, "")
                                          ? "bg-theme-color text-white"
                                          : ""
                                          }`}
                                        key={i}
                                      >
                                        <span
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {val?.title
                                            ?.replaceAll("&lt;", "<")
                                            .replace(/(<([^>]+)>)/gi, "")
                                            .toLowerCase()
                                            .replace("cancer", "")}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* End content */}

                        <div className="btn-box custom-btn-box s">
                          {doctor?.doctorsoptions?.cancer_treated && (
                            <ul className="post-tags">
                              {doctor?.doctorsoptions?.cancer_treated.map(
                                (val, i) => (
                                  <li
                                    className={`${mainKeyword ===
                                      val?.title
                                        ?.replaceAll("&lt;", "<")
                                        .replace(/(<([^>]+)>)/gi, "")
                                      ? "bg-theme-color text-white"
                                      : ""
                                      }`}
                                    key={i}
                                  >
                                    <span>
                                      {val?.title
                                        ?.replaceAll("&lt;", "<")
                                        .replace(/(<([^>]+)>)/gi, "")}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                        {/* End btn-box */}
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="h-screen">
                <div className="alert alert-warning ">Coming soon</div>
              </div>
            )}


          </>
        )}
      </Suspense>
    </>
  );
};

export default FilterTopBox;
