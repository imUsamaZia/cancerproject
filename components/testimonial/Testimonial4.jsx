

'use client'

import Image from "next/image";
import testimonilaContent from "../../data/testimonial";
import Slider from "react-slick";

const Testimonial4 = () => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {testimonilaContent.slice(3, 6).map((item) => (
          <div className="testimonial-block " key={item.id}>
            <div className="inner-box bg-theme-color reviews_custom">
              <h4 className="title text_white">{item.feedback}</h4>
              <div className="text text_white">{item.feedbackText}</div>
              <div className="info-box">
                <div className="thumb">
                  <Image
                    width={70}
                    height={70}
                    src={item.avatar}
                    alt="testimonial"
                  />
                </div>
                <h4 className="name text_white">{item.name}</h4>
                <span className="designation text_white">{item.designation}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial4;
