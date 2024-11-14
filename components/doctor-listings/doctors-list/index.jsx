"use client";
import Disclaimer from "@/components/Home/Disclaimer";
import Header from "@/components/Home/Header";
import { useEffect, useState } from "react";
import MobileMenu from "../../header/MobileMenu";
import FilterSidebar from "./FilterSidebar";
import FilterTopBox from "./FilterTopBox";

const DoctorsList = (props) => {
  const { cancers, locations, specialities, filter, doctors } = props;
  const [loadedData, setLoadedData] = useState("");

  const handleDataFromChild = (childData) => {
    setLoadedData(childData);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the down arrow key is pressed (key code 40)
      if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent default scrolling
        window.scrollBy({
          top: 100, // Adjust this value to control the scroll amount
          left: 0,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <Header />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}

      {/* <!--End Breadcrumb Start--> */}

      <section className="ls-section">
        <div className="auto-container">
          <div className="row">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left ">
                <FilterSidebar
                  filter={filter}
                  locations={locations}
                  cancers={cancers}
                  specialities={specialities}
                />
              </div>
            </div>
            {/* End filter column for tablet and mobile devices */}

            <div className="filters-column hidden-1023 col-lg-4 col-md-12 col-sm-12 ">
              <FilterSidebar
                filter={filter}
                locations={locations}
                cancers={cancers}
                specialities={specialities}
              />
            </div>
            {/* <!-- End Filters Column for destop and laptop --> */}

            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <div className="ls-outer  ">
                <FilterTopBox
                  doctors={doctors}
                  handleDataFromChild={handleDataFromChild}
                />
                {/* <!-- ls Switcher --> */}
              </div>
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}
      {loadedData >= doctors.length && <Disclaimer />}
    </>
  );
};

export default DoctorsList;
