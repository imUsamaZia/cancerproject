'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import client from "@/lib/ApolloClient";
import { GET_FOOTER } from "@/lib/Queries";

const SidebarFooter = () => {
  const [footerData, setFooterData] = useState({});
  
  // fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      const res = await client?.request(GET_FOOTER, {
        id: "home",
      });
      setFooterData(res?.page?.homeOptions || {});
    };
    fetchData();
  }, []);
  const { socials } = footerData;

  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: socials?.facebook ? socials?.facebook : "https://www.facebook.com/" },
    { id: 2, icon: "fa-twitter", link: socials?.twitter ? socials?.twitter :"https://www.twitter.com/" },
    { id: 3, icon: "fa-instagram", link: socials?.instagram ? socials?.instagram :"https://www.instagram.com/" },
    { id: 4, icon: "fa-linkedin-in", link: socials?.linkedin ? socials?.linkedin :"https://www.linkedin.com/" },
  ];

  return (
    <div className="mm-add-listing mm-listitem pro-footer">

      {/* job post btn */}

      <div className="mm-listitem__text">

        <div className="social-links pl-2">
          {socialContent.map((item) => (
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <i className={`fab ${item.icon}`}></i>
            </Link>
          ))}
        </div>
        {/* End social-links */}
      </div>
      {/* End .mm-listitem__text */}
    </div>
  );
};

export default SidebarFooter;
