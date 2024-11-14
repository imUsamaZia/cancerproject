'use client'

import { useParams, useRouter, useSearchParams } from "next/navigation";

const SpecializationsBox = (props) => {
  const { specialities, SpecializationsHandler, specializations } = props;
  const router = useRouter();
  const params = useSearchParams()

  return (
    <div className="tags_list">
      {specialities?.map((item, index) => {
        const buildQuery = () => {
          const baseParams = [];
          if (params.get("q")) {
            baseParams.push(`q=${params.get("q")}`);
          }
          if (params.get("location_ids")) {
            baseParams.push(`location_ids=${params.get("location_ids")}`);
          }
          
          baseParams.push(`specialization_ids=${item?.databaseId}`);
          return baseParams.join('&');
        };  

      const q = buildQuery();
        
        return (
          <li
            key={index}
            className={`rounded-50  ${specializations === item?.databaseId
              ? "text-theme-color border-theme-color bg-theme-color text-white"
              : "border"
              } `}
            onClick={() => {
              SpecializationsHandler({ name: item?.databaseId })
              router.push(`/doctors?${q}`);
            }}
          >
            {item?.name.replace('Oncologists', "")}
          </li>
        )
      })}
    </div>
  )
}

export default SpecializationsBox;