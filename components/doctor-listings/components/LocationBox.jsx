"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../../../features/filter/candidateFilterSlice";
import { useRouter, useSearchParams } from "next/navigation";

const LocationBox = (props) => {
  const { locations } = props;
  const { location } = useSelector((state) => state.candidateFilter) || {};
  const [getLocation, setLocation] = useState(location);
  const dispath = useDispatch();

  const router = useRouter();
  const params = useSearchParams()

  // location handler
  const locationHandler = ({ name }) => {
    setLocation(name);
  };

  // location dispatch
  useEffect(() => {
    dispath(addLocation(getLocation));
  }, [dispath, addLocation, getLocation]);

  return (
    <div className="tags_list">
      {
        locations.map((item, index) => {

          const buildQuery = () => {
            const baseParams = [];
            if (params.get("q")) {
              baseParams.push(`q=${params.get("q")}`);
            }
            if (params.get("specialization_ids")) {
              baseParams.push(`specialization_ids=${params.get("specialization_ids")}`);
            }
            baseParams.push(`location_ids=${item?.databaseId}`);
            return baseParams.join('&');
          };  
          const q = buildQuery();

          return (
            <li
              key={index}
              className={`rounded-50  ${location === item?.databaseId ? 'text-theme-color border-theme-color bg-theme-color text-white' : 'border'} `}
              onClick={() => {
                locationHandler({ name: item?.databaseId })
                router.push(`?${q}`)
              }}
            >
              {item?.title}
            </li>
          )
        })
      }

    </div>
  );
};

export default LocationBox;
