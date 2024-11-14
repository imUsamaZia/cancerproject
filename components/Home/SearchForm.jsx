"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  addKeyword,
} from "@/features/filter/candidateFilterSlice";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { isDesktop } from "react-device-detect";
import ListMostSearched from '@/components/Home/ListsMostSearched';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState} from "react";
import { GetCancerSearch } from "@/lib/api/Get-search";

const SearchForm4 = (props) => {
  const { mostsearcheds, setIsInputFocused, isInputFocused } = props;
  const [cancerSearch, setCancerSearch] = useState("");
// 

  const router = useRouter();
  const dispatch = useDispatch();

  // const { keyword } =
  //   useSelector((state) => state.candidateFilter) || {};

  // keyword handler
  const keywordHandler = ({ value }) => {
    dispatch(addKeyword(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value

    keywordHandler({ value: name });

    router.push("/doctors");
  };

  // get input focused or not!
  const handleFocus = () => {
    setIsInputFocused(true);
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  };


  
  const { data, isLoading } = useQuery({
    queryKey: ["cancer-search", cancerSearch],
    queryFn: async () => await GetCancerSearch({ cancerSearch }),
  });

  const filteredData = data || [];

  const filteredItems = filteredData?.length ? filteredData?.sort((a, b) => {
    if (`${a.title}`.replace('Cancer', '').toLowerCase() === 'bladder cancer') return -1;
    if (`${b.title}`.replace('Cancer', '').toLowerCase() === 'bladder cancer') return 1;
    return `${a.title}`.replace('Cancer', '').toLowerCase().localeCompare(`${b.title}`.replace('Cancer', '').toLowerCase());
  }) : [];



  useEffect(() => {
    if(isInputFocused){
      document.body.style.overflow = 'hidden';
    }else{
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }

  }, [isInputFocused]);

  // console.log('Filteredcancers', Filteredcancers);


  return (
    <div className="custom-form-wraper relative">
      <div className={`job-search-form max-w-70 rounded-50 z-100  ${isInputFocused && 'box-sahdow'}`}>
        <form onSubmit={handleSubmit} className="relative desk-search">
          {/* Desktop search */}
          <div className="row desktop-hidden">
            <div className="form-group col-lg-9 col-md-8 col-sm-8 flex items-center">
              <span className="line-height-55">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.6667 30L17.1667 19.5C16.3333 20.1667 15.375 20.6944 14.2917 21.0833C13.2083 21.4722 12.0556 21.6667 10.8333 21.6667C7.80556 21.6667 5.24306 20.6181 3.14583 18.5208C1.04861 16.4236 0 13.8611 0 10.8333C0 7.80556 1.04861 5.24306 3.14583 3.14583C5.24306 1.04861 7.80556 0 10.8333 0C13.8611 0 16.4236 1.04861 18.5208 3.14583C20.6181 5.24306 21.6667 7.80556 21.6667 10.8333C21.6667 12.0556 21.4722 13.2083 21.0833 14.2917C20.6944 15.375 20.1667 16.3333 19.5 17.1667L30 27.6667L27.6667 30ZM10.8333 18.3333C12.9167 18.3333 14.6875 17.6042 16.1458 16.1458C17.6042 14.6875 18.3333 12.9167 18.3333 10.8333C18.3333 8.75 17.6042 6.97917 16.1458 5.52083C14.6875 4.0625 12.9167 3.33333 10.8333 3.33333C8.75 3.33333 6.97917 4.0625 5.52083 5.52083C4.0625 6.97917 3.33333 8.75 3.33333 10.8333C3.33333 12.9167 4.0625 14.6875 5.52083 16.1458C6.97917 17.6042 8.75 18.3333 10.8333 18.3333Z"
                    fill="#22218C"
                  />
                </svg>
              </span>
              <input
                type="text"
                name="name"
                placeholder="Search by cancer type"
                onFocus={handleFocus}
                className="placeholer-text custom-input"
                onChange={(e) => setCancerSearch(e.target.value)}
              />
            </div>

            {/* <!-- Form Group --> */}
            <div className="form-group col-lg-3 col-md-2 col-sm-2 text-right ">
              <button
                type="submit"
                className="bg-search_btn lg-search-form-btn theme-btn btn-style-two rounded-50"
              >
                Find Doctor
              </button>
            </div>
          </div>
          {/* Mobile search */}
          <div className="mobile_search mb-hidden">
            {
              !isInputFocused &&
              <div className="mb-search-form rounded-50 ">
              <input
                className="input-mb-search"
                type="text"
                name="name"
                placeholder="Search by cancer type"
                onFocus={handleFocus}
                onChange={(e) => setCancerSearch(e.target.value)}
                // onBlur={handleBlur}
              />
              <button
                onClick={() => router.push("/doctors")}
                type="button"
                className="mb-search-btn bg-search_btn theme-btn text-white"
              >
                Find Doctor
                {/* <span className="icon flaticon-search-1 text-white"></span> */}
              </button>
            </div>
            }

          </div>
        </form>
      </div>
      {isDesktop ? (
        isInputFocused && (
          <div className="most-searched ">
            {
              cancerSearch !== '' ?  <ListMostSearched cancerSearch={cancerSearch} mostsearcheds={filteredItems} /> :
              (
                <>
                
                <h6>Most Searched</h6>
                <ListMostSearched cancerSearch={cancerSearch} mostsearcheds={mostsearcheds} />
                </>
              )

            }
            
          </div>
        )
      ) : (
        isInputFocused &&
        <div className=" mobile_search_offcanvas px-3 py-3">
          <form onSubmit={handleSubmit} className="mb-sidebar-search-bar pb-2 flex items-center justify-between">
            <div className="mb-input-wraper flex items-center">
              <span onClick={() => setIsInputFocused(false)} className="line-height-33">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 8 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z"
                    fill="#22218C"
                  />
                </svg>
              </span>
              <input
                className="input-mb-search-2  "
                type="text"
                name="name"
                placeholder="Search by cancer type"
                onFocus={handleFocus}
                onChange={(e) => setCancerSearch(e.target.value)}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="mb-search-btn-2 theme-btn text-white"
            >
              Find Doctor
              {/* <span className="icon flaticon-search-1 text-white"></span> */}
            </button>
          </form>
          <div className="mb-most-searched text-left">
          {
              cancerSearch !== '' ?  <ListMostSearched cancerSearch={cancerSearch} mostsearcheds={filteredItems} /> :
              (
                <>
                
                <h6>Most Searched</h6>
                <ListMostSearched cancerSearch={cancerSearch} mostsearcheds={mostsearcheds} />
                </>
              )

            }
          </div>
    
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(SearchForm4), { ssr: false });
