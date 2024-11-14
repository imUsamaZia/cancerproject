"use client";

import { useQuery } from "@tanstack/react-query";
import client from "@/lib/ApolloClient";
import { GET_ALL_SYMTOMS, GET_ALL_RISKS } from "@/lib/Queries";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";


const FilterSidebar = () => {
  const [symptom, setSymptom] = useState("");
    const [risk, setRisk] = useState("");
    const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: [`all-symptons-risks`],
    queryFn: async () => {
      const resSys = await client.request(GET_ALL_SYMTOMS);
      const resRisk = await client.request(GET_ALL_RISKS);

      return {
        symptoms: resSys?.symptoms?.nodes || [],
        risks: resRisk?.riskFactors?.nodes || [],
      };
    },
  });



  useEffect(() => {
    const url = symptom && risk ? `/cancers?symptom=${symptom}&risk=${risk}` : !symptom && risk ? `/cancers?risk=${risk}` : symptom && !risk ? `/cancers?symptom=${symptom}` : `/cancers`;
    router.push(url)

  }, [symptom, risk])


  return (
    <div className="inner-column pd-right sticky">
      <div className="filters-outer">
        <button
          type="button"
          className="btn-close text-reset close-filters show-1023"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        {/* End .close filter */}

        <div className="filter-block">
          <h4> Search by Symptons</h4>
          <div className="form-group">
            <>
              <select
                className="form-select"
                onChange={(e) => setSymptom(e.target.value)}
                value={symptom}
              >
                <option value="">Choose a sympton</option>
                {data?.symptoms?.map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="icon flaticon-briefcase"></span>
            </>
          </div>
        </div>
        {/* <!-- Filter Block --> */}
        <div className="filter-block">
          <h4>Search by Risk Factors</h4>
          <div className="form-group">
            <>
              <select
                className="form-select"
                onChange={(e) => setRisk(e.target.value)}
                value={risk}
              >
                <option value="">Choose a risk ractor</option>
                {data?.risks?.map((item) => (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="icon flaticon-briefcase"></span>
            </>
          </div>
        </div>
      </div>
      {/* Filter Outer */}
    </div>
  );
};

export default FilterSidebar;
