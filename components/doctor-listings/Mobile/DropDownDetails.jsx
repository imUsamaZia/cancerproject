"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { isMobile } from "react-device-detect";
import parseHtml from "@/lib/Parser";

const DropDownDetails = (props) => {
  const {
    educations,
    awards,
    professionalMemberships,
    clinicalExperience,
    researchpublications,
    specializations,
    insurances,
    insuranceHeading,
    specializationsHeading,
    clinicalExperienceHeading,
    educationHeading,
    awardsHeading,
    professionalMembershipsHeading,
    researchAndPublicationsHeading,
  } = props;

  const [insurancesOpen, setInsurancesOpen] = useState(false);
  const [specialOpen, setSpecialOpen] = useState(false);
  const [educationOpen, setEducationOpen] = useState(false);
  const [awardOpen, setAwardOpen] = useState(false);
  const [affiliationOpen, setAffiliationOpen] = useState(false);
  const [clinicalOpen, setClinicalOpen] = useState(false);
  const [publicationOpen, setPublicationOpen] = useState(false);

  const alldropdown = [
    {
      name: insuranceHeading || "Insurance",
      type: "Insurances",
      data: insurances,
    },
    // {
    //   name: specializationsHeading || "Specializations",
    //   type: "Specializations",
    //   data: specializations,
    // },

    {
      name: clinicalExperienceHeading || "Clinical Experience",
      type: "Clinical Experience",
      data: clinicalExperience,
    },
    {
      name: professionalMembershipsHeading || "Affiliation",
      type: "Affiliations",
      data: professionalMemberships,
    },
    {
      name: researchAndPublicationsHeading || "Publications",
      type: "Publications",
      data: researchpublications,
    },
    {
      name: awardsHeading || "Awards",
      type: "Awards",
      data: awards,
    },
    {
      name: educationHeading || "Education",
      type: "Educations",
      data: educations,
    },
  ];

  return (
    <>
      {isMobile &&
        alldropdown.map((item, index) => {
          return item?.type === "Insurances" ? (
            item?.data?.length ? (
              <div key={index} className="mb_details_block mb-hidden">
                <button
                  onClick={() => setInsurancesOpen(!insurancesOpen)}
                  className="mb_details_block_title mb-3 text-theme-color flex items-center justify-between w-full "
                >
                  <h3>{item?.name}</h3>
                  {insurancesOpen ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <rect x="6" y="11" width="12" height="2" rx="1" />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
                      </svg>
                    </span>
                  )}
                </button>
                {insurancesOpen && (
                  <div className="px-3 py-2">
                    <p className="text-gray">
                          Insurance changes all the time, so please call and confirm if your insurance is accepted.
                        </p>
                    <div className="doc-custom-lists insurance_list pb-2">
                      {parseHtml(insurances || "")}
                    </div>
                  </div>
                )}
              </div>
            ) : null
          ) : item?.type === "Specializations" ? (
            item?.data?.length ? (
              <div key={index} className="mb_details_block mb-hidden">
                <button
                  onClick={() => setSpecialOpen(!specialOpen)}
                  className="mb_details_block_title mb-3 text-theme-color flex items-center justify-between w-full "
                >
                  <h3>{item?.name}</h3>
                  {specialOpen ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <rect x="6" y="11" width="12" height="2" rx="1" />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
                      </svg>
                    </span>
                  )}
                </button>
                {specialOpen && (
                  <div className="px-3 py-2">
                    <div className="doc-custom-lists pb-2">
                      {parseHtml(specializations || "")}
                    </div>
                  </div>
                )}
              </div>
            ) : null
          ) : item?.type === "Educations" ? (
            item?.data ? (
              <div key={index} className="mb_details_block mb-hidden">
                <button
                  onClick={() => setEducationOpen(!educationOpen)}
                  className="mb_details_block_title mb-3 flex items-center justify-between w-full "
                >
                  <h3>{item?.name}</h3>
                  {educationOpen ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <rect x="6" y="11" width="12" height="2" rx="1" />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
                      </svg>
                    </span>
                  )}
                </button>
                {educationOpen && (
                  <div className="doc-custom-lists pb-2">
                    {parseHtml(educations || "")}
                  </div>
                )}
              </div>
            ) : null
          ) : item?.type === "Awards" ? (
            item?.data?.length ? (
              <div key={index} className="mb_details_block mb-hidden">
                <button
                  onClick={() => setAwardOpen(!awardOpen)}
                  className="mb_details_block_title mb-3 flex items-center justify-between w-full "
                >
                  <h3>{item?.name}</h3>
                  {awardOpen ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <rect x="6" y="11" width="12" height="2" rx="1" />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
                      </svg>
                    </span>
                  )}
                </button>
                {awardOpen && (
                  <div className="doc-custom-lists pb-2">
                    {parseHtml(awards || "")}
                  </div>
                )}
              </div>
            ) : null
          ) : item?.type === "Affiliations" ? (
            item?.data?.length ? (
              <div key={index} className="mb_details_block mb-hidden ">
                <button
                  onClick={() => setAffiliationOpen(!affiliationOpen)}
                  className="mb_details_block_title mb-3 flex items-center justify-between w-full "
                >
                  <h3>{item?.name}</h3>
                  {affiliationOpen ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <rect x="6" y="11" width="12" height="2" rx="1" />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
                      </svg>
                    </span>
                  )}
                </button>
                {affiliationOpen && (
                  <div className="doc-custom-lists pb-2">
                    {parseHtml(professionalMemberships || "")}
                  </div>
                )}
              </div>
            ) : null
          ) : item?.type === "Clinical Experience" ? (
            item?.data?.length ? (
              <div key={index} className="mb_details_block mb-hidden">
                <button
                  onClick={() => setClinicalOpen(!clinicalOpen)}
                  className="mb_details_block_title mb-3 flex items-center justify-between w-full "
                >
                  <h3>{item?.name}</h3>
                  {clinicalOpen ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <rect x="6" y="11" width="12" height="2" rx="1" />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
                      </svg>
                    </span>
                  )}
                </button>
                {clinicalOpen && (
                  <div className="doc-custom-lists pb-2">
                    {parseHtml(clinicalExperience || "")}
                  </div>
                )}
              </div>
            ) : null
          ) : item?.type === "Publications" ? (
            item?.data?.length ? (
              <div key={index} className="mb_details_block mb-hidden">
                <button
                  onClick={() => setPublicationOpen(!publicationOpen)}
                  className="mb_details_block_title mb-4 flex items-center justify-between w-full "
                >
                  <h3>{item?.name}</h3>
                  {publicationOpen ? (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <rect x="6" y="11" width="12" height="2" rx="1" />
                      </svg>
                    </span>
                  ) : (
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Outline"
                        viewBox="0 0 24 24"
                        width="25"
                        height="25"
                        fill="#21208c"
                      >
                        <path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
                      </svg>
                    </span>
                  )}
                </button>
                {publicationOpen && (
                  <div className="doc-custom-lists pb-2">
                    {parseHtml(researchpublications || "")}
                  </div>
                )}
              </div>
            ) : null
          ) : null;
        })}
    </>
  );
};

export default dynamic(() => Promise.resolve(DropDownDetails), {
  ssr: false,
});
