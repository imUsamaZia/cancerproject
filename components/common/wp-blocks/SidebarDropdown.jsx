"use client";
import parseHtml from "@/lib/Parser";
import { useState } from "react";

export default function SidebarDropdown({ title, content }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb_details_block mb-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="mb_details_block_title flex items-center justify-between w-full "
      >
        <h3>{title.replace(/(<([^>]+)>)/gi, "")}</h3>
        {open ? (
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

      {open && (
        <div className="px-3 py-2 sidebar_content_wraper">
          {title === "Symptoms" ? (
            <ul className="list-disc">
              {content?.map((symptom, idx) => (
                <li className="p-1" key={idx}>
                  {symptom.title}
                </li>
              ))}

            </ul>
          ) : title === "Risk Factors" ? (
            <ul className="company-info mt-0 custom-risk">
              {content?.map((risk, idx) => (
                <li className="p-1" key={idx}>
                  {risk.title}: <p>{risk?.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            parseHtml(content || '')
          )}
        </div>
      )}
    </div>
  );
}
