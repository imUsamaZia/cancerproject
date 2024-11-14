'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import client from "@/lib/ApolloClient";
import { GET_FOOTER } from "@/lib/Queries";



const Disclaimer = () => {
  const [footerData, setFooterData] = useState({});
  
  // fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      const res = await client.request(GET_FOOTER, {
        id: "home",
      });
      setFooterData(res?.page?.homeOptions || {});
    };
    fetchData();
  }, []);

  const { footer, socials } = footerData;

  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: socials?.facebook ? socials?.facebook : "https://www.facebook.com/" },
    { id: 2, icon: "fa-twitter", link: socials?.twitter ? socials?.twitter :"https://www.twitter.com/" },
    { id: 3, icon: "fa-instagram", link: socials?.instagram ? socials?.instagram :"https://www.instagram.com/" },
    { id: 4, icon: "fa-linkedin-in", link: socials?.linkedin ? socials?.linkedin :"https://www.linkedin.com/" },
  ];

  // console.log("footerData", Object.values(socials));
  return (
    <footer className="call-to-action-three style-two">
      <div className="auto-container custom-footer">
        <div className="outer-box footer-box">
          <div className="sec-title light flex">
            <div className="text">
              <span className="font-bold">{footer?.heading ? footer?.heading  : 'Disclaimer'}: </span>
              {
                footer?.text ? footer?.text : 'All information on this website is sourced from publicly available records and reputable sources. This listing does not imply endorsement by the listed professionals. We welcome corrections or updates to ensure the accuracy of the information.'
              }
            </div>
          </div>
          {/* End sec-title */}

         
        </div>
        {/* End outer-box */}
        <div className="social-links pl-2 flex justify-center ">
          {socialContent.map((item) => (
            <Link
              className="text-white px-3"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <i className={`fab ${item.icon}`}></i>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Disclaimer;
