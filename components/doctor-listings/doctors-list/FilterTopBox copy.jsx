"use client";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const FilterTopBox = () => {
  const { ref, inView } = useInView();

  const [mainData, setMainData] = useState([]);

  const { keyword, location, category } =
    useSelector((state) => state.candidateFilter) || {};

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  //
  const mainKeyword = query ? query : keyword;
  // if there is new data save previous doctors data in variable and append new data to it.

  const parameterLogicLocation = mainKeyword === "" ? "?" : "&";
  const parameterLogicSpecialization =
    mainKeyword === "" && location === "" ? "?" : "&";

  const cancerQuery =
    mainKeyword !== ""
      ? `?cancer_q=${mainKeyword.replace(/(<([^>]+)>)/gi, "").toLowerCase()}`
      : "";
  const locationQuery =
    location !== ""
      ? `${parameterLogicLocation}location_ids=%5B${location}%5D`
      : "";
  const specialityQuery =
    category !== ""
      ? `${parameterLogicSpecialization}specialization_ids=%5B${category}%5D`
      : "";var doctors = await res.json()
      doctors = doctors.data?.doctors?.nodes
      return doctors

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["doctors_infinity", cancerQuery, locationQuery, specialityQuery],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = `${
        mainKeyword !== "" || location !== "" || category !== "" ? "&" : "?"
      }limit=6&offset=${pageParam || 0}`;

      return await (
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/wp-json/doctors/v1/get_drs${cancerQuery}${locationQuery}${specialityQuery}${offset}`
        )
      ).json();
    },
    // staleTime: 20000,
    keepPreviousData: true,
    getNextPageParam(lastPage, allPages) {
      // Check if the last page has data
      if (
        lastPage &&
        lastPage.data &&
        lastPage.data.doctors &&
        lastPage.data.doctors.nodes.length > 0
      ) {
        // Calculate the next offset based on the number of items per page
        const nextOffset = allPages.length * 6; // Assuming 6 items per page
        return nextOffset; // Return the next offset for the next page
      }
      return undefined; // No more pages
    },
  });

  useEffect(() => {
    const allDoctors =
    data?.pages?.map((page) => page?.data?.doctors?.nodes).flat() || [];
    setMainData([...allDoctors]);
  }, [data?.pages]);

  // infinite scroll all doctors
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);





  return (
    <>
      <div className="show-1023 sticky z-200 py-3 bg-white top-70">
        <button
          type="button"
          className="theme-btn toggle-filters custom-filter "
          data-bs-toggle="offcanvas"
          data-bs-target="#filter-sidebar"
        >
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_444_564"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_444_564)">
                <path
                  d="M10.9991 20C10.7158 20 10.4783 19.9042 10.2866 19.7125C10.0949 19.5208 9.9991 19.2833 9.9991 19V13L4.1991 5.6C3.9491 5.26667 3.9116 4.91667 4.0866 4.55C4.2616 4.18333 4.56577 4 4.9991 4H18.9991C19.4324 4 19.7366 4.18333 19.9116 4.55C20.0866 4.91667 20.0491 5.26667 19.7991 5.6L13.9991 13V19C13.9991 19.2833 13.9033 19.5208 13.7116 19.7125C13.5199 19.9042 13.2824 20 12.9991 20H10.9991ZM11.9991 12.3L16.9491 6H7.0491L11.9991 12.3Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          </span>{" "}
          Add Filters 
        </button>
      </div>
      {/* End top filter bar box */}

      {!mainData?.length && isLoading ? (
        Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="doctors_lists_skeleton"/>
        ))
      ) : (
        <>
          {mainData?.length ? (
            mainData?.map((doctor, idx) => {
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
                            <span className="icon flaticon-map-locator"></span>{" "}
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
                                      className={`${
                                        mainKeyword ===
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
                        </div>
                      </div>
                      {/* End content */}

                      <div className="btn-box custom-btn-box s">
                        {doctor?.doctorsoptions?.cancer_treated && (
                          <ul className="post-tags">
                            {doctor?.doctorsoptions?.cancer_treated.map(
                              (val, i) => (
                                <li
                                  className={`${
                                    mainKeyword ===
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

          {hasNextPage && mainData?.length ? (
            <div className="infinity-filter" ref={ref}></div>
          ) : null}

          {isFetchingNextPage &&
            Array.from({ length: mainData?.length + 6 }).map((_, idx) => (
              <div key={idx} className="doctors_lists_skeleton"></div>
            ))}
        </>
      )}

      {/* <!-- Listing Show More --> */}
    </>
  );
};

export default FilterTopBox;
