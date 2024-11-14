"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import Image from "next/image";

const DefaulHeader = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-style-two-other-page alternate2 ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="auto-container">
        {/* <!-- Main box --> */}
        <div className="main-box">
          {/* <!--Nav Outer --> */}
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    width={50}
                    height={50}
                    src="/Cancerify.png"
                    alt="brand"
                  />
                </Link>
              </div>
            </div>
            {/* End .logo-box */}

          
            {/* <!-- Main Menu End--> */}
          </div>
          {/* End .nav-outer */}
          <HeaderNavContent />
          <div className="outer-box">
            <div className="btn-box">
              <Link href="/contact" className="theme-btn btn-style-one">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader;
