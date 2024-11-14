"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  addKeyword,
} from "../../../features/filter/candidateFilterSlice";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Categories = (props) => {
  const { cancers } = props;
  const router = useRouter();
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const { category: getCategory, keyword } =
    useSelector((state) => state.candidateFilter) || {};

  const dispatch = useDispatch();
  // 
  const mainKeyword = query ? query : keyword;
  // category handler
  const cancerHandler = ({ name }) => {
    dispatch(addKeyword(name));
  };


  return (
    <div className="tags_list ">
      {cancers?.length ? (
        cancers
          ?.sort((a, b) =>
            a.title.replace(/(<([^>]+)>)/gi, "").localeCompare(b.title.replace(/(<([^>]+)>)/gi, ""))
          )
          ?.map((item) => {

            const buildQuery = () => {
              const baseParams = [];
              if (searchParams.get("location_ids")) {
                baseParams.push(`location_ids=${searchParams.get("location_ids")}`);
              }
              if (searchParams.get("specialization_ids")) {
                baseParams.push(`specialization_ids=${searchParams.get("specialization_ids")}`);
              }
              baseParams.push(`q=${item.title}`);
              return baseParams.join('&');
            };  

            const q = buildQuery();
            return (
              <li
                className={`${mainKeyword === item.title.replace(/(<([^>]+)>)/gi, "")
                    ? "text-theme-color border-theme-color bg-theme-color text-white"
                    : "border"
                  } rounded-50  `}
                key={item?.id}
                onClick={() => {
                  cancerHandler({ name: '' })
                  cancerHandler({ name: item.title.replace(/(<([^>]+)>)/gi, "") })
                  router.push(`/doctors?${q}`);
                }

                }
              >
                {item.title.replace(/(<([^>]+)>)/gi, "").replace('Cancer', "")}
              </li>
            )
          })
      ) : (
        <p>No cancers found!</p>
      )}

    </div>
  );
};

export default Categories;
