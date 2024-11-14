"use client";
import ParagraphBlock from "@/components/BlogPage/Blocks/ParagraphBlock";
import DetailsBlock from "@/components/common/wp-blocks/DetailsBlock";
import FindDocButton from "@/components/Cancers-listing/FindDocButton";
import SidebarDropdown from "@/components/common/wp-blocks/SidebarDropdown";
import { useEffect, useState } from "react";



const Details = (props) => {
  const {
    blocks,
    title,
    supportGroups,
    trustedInstitutions,
    financialSupportOrganizations,
  } = props;

  const [updatedBlocks, setUpdatedBlocks] = useState([]);

    // Use another useEffect to handle pushing the items to the array
    useEffect(() => {
      const handlePush = () => {
        const support = {
          name: "core/details",
          type: "core/support",
          originalContent: 'Support Groups',
          innerBlocks: [
            {
              name: "core/support",
              originalContent: 'Support Groups',
              content: supportGroups,
            },
          ]
        };
        const financial = {
          name: "core/details",
          type: "core/financial",
          originalContent: 'Financial support organisations',
          innerBlocks: [
            {
              name: "core/financial",
              originalContent: 'Financial support organisations',
              content: financialSupportOrganizations,
            },
          ]
        };
        const mobileContent = [...blocks]; // Create a copy of the array
  
        if (mobileContent[3]?.innerBlocks[0]?.name !== support?.innerBlocks[0]?.name) {
          mobileContent.splice(5, 0, support);
        }
  
        if (mobileContent[4]?.innerBlocks[0]?.name !== financial.innerBlocks[0].name) {
          mobileContent.splice(6, 0, financial);
        }
  
        setUpdatedBlocks(mobileContent);
      }
  
      if (blocks.length > 0) {
        handlePush();
      }
    }, [blocks]);


  return (
    <div className="job-detail cancer_detail text-15">
      <h1 className="pb-3 cancer__title">{title.replace(/(<([^>]+)>)/gi, "")}</h1>

      {updatedBlocks?.map((block, index) =>
        block.name === "core/paragraph" ? (
          <div className="cancer_paragraph ">
            <ParagraphBlock
              key={index}
              content={block?.originalContent}
              textAlign={block?.attributes?.textAlign}
              dropCap={block?.attributes?.dropCap}
            />
          </div>
        ) : block.name === "core/buttons" ? (
          <div className="cus-btn-cancer pb-5 pt-3 mb-hidden">
            <FindDocButton title={title.replace(/(<([^>]+)>)/gi, "")} />
          </div>
        ) : block.name === "core/details" ? (
          <DetailsBlock
            key={index}
            type={block?.type}
            title={block?.originalContent}
            blocks={block?.innerBlocks}
          />
        ) : null
      )}


      <SidebarDropdown
        title="Trusted institutions"
        content={trustedInstitutions}
      />
    </div>
  );
};

export default Details;
