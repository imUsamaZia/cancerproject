
'use client'

import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import client from "@/lib/ApolloClient";
// import { GET_ALL_CANCERS } from "@/lib/Queries";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const FilterTopBox = ({cancers}) => {
  const searchParams = useSearchParams();
  const [filteredCancers, setFilteredCancers] = useState([]);
  const symtom = searchParams.get('symptom');
  const risk = searchParams.get('risk');


  
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: [`all-cancers-page`],
  //   queryFn: async () => await client.request(
  //     GET_ALL_CANCERS
  //   ),
  // });
  // const cancers = data?.cancers?.nodes || [];

  useEffect(() => {
    if(symtom || risk){

      const filtered = cancers?.filter((cancer) => {
        return (
          cancer?.cancersOptions?.symptoms?.some((val) =>
            val.name.toLowerCase().includes(symtom || ''.toLowerCase())
          ) ||
          cancer?.cancersOptions.riskFactors?.some((val) =>
            val.name.toLowerCase().includes(risk || ''.toLowerCase())
          )
        );
      });


      setFilteredCancers(filtered)
    }else{
      setFilteredCancers(cancers)
    }
  }, [symtom,risk, cancers])



  return (
    <Suspense>
   
      {/* End top filter bar box */}
      {
        // isLoading ?(
        //   [...Array(20)].map((_, i) => (
        //     <div
        //     className="company-block-three"
        //     key={i}
        //   >
        //     <div className="inner-box cancers_lists_skeleton">
              
        //     </div>
        //   </div>
        //   ))
        // ) : isError ? (
        //   <p>Error</p>
        // ) :
        filteredCancers?.length === 0 ? (
          <p>No cancer found</p>
        ) :
        filteredCancers?.map((cancer) => (
          <div className="company-block-three" key={cancer.id}>
          <div className="inner-box">
            <div className="content">
              <div className="content-inner">
                <h4>
                  <Link href={`/cancers/${cancer?.slug}`}>
                    {cancer.title}
                  </Link>
                </h4>
              </div>
  
              <div className="btn-box">
                <Link
                  href={`/cancers/${cancer?.slug}`}
                  className="theme-btn btn-style-three"
                >
                  <span className="btn-title">Cancer info</span>
                </Link>
              </div>
            </div>
  
            
          </div>
        </div>
        ))
      }

    

 
      {/* <!-- Listing Show More --> */}
    </Suspense>
  );
};

export default FilterTopBox;
