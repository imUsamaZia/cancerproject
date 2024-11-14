"use client";
import SearchForm from "@/components/Home/SearchForm";
import { useState } from "react";

const index = (props) => {
  const { mostsearcheds, hero } = props;
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <section
      className="banner-section-nine bg-theme-color"
      // style={{ backgroundImage: "url(/images/background/7.jpg)" }}
    >
      <div className="auto-container">
        <div className="cotnent-box">
          <div className="title-box custom-title-box">
            {hero?.heading && <h1>{hero?.heading}</h1>}
            {hero?.subHeading && <div className="text">{hero?.subHeading}</div>}
          </div>

          {/* <!-- Job Search Form --> */}

          <SearchForm
            mostsearcheds={mostsearcheds}
            setIsInputFocused={setIsInputFocused}
            isInputFocused={isInputFocused}
          />
        </div>
        {/* <!-- Job Search Form --> */}
      </div>
      {isInputFocused && (
        <div
          onClick={() => setIsInputFocused(false)}
          className="offset_close"
        ></div> 
      )}
    </section>
  );
};

export default index;
