'use client'
import parseHtml from "@/lib/Parser";
import Image from "next/image";
import Slider from "react-slick";

const Testimonials = (props) => {
  const { testimonials } = props;
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
      <Slider {...settings} arrows={false} >
        {testimonials?.map((item, idx) => (
          <div className="testimonial-block  " key={item.id}>
            <div className="inner-box bg-theme-color reviews_custom">
              <h4 className="title text_white">{item.title}</h4>
              <div className="text text_white">
                {parseHtml(item?.content.replace(/(<([^>]+)>)/gi, ""))}
                
              </div>
              <div className="info-box">
                {
                  item?.testimonialOptions?.avatar &&
                  <div className="thumb custom_thumb">
                  <Image
                    width={70}
                    height={70}
                    src={item?.testimonialOptions?.avatar ? item?.testimonialOptions?.avatar : '/images/resource/testi-thumb-1.png'}
                    alt="testimonial"
                  />
                </div>
                }
                
                <h4 className="name text_white">{item?.testimonialOptions?.authorName}</h4>
                <span className="designation text_white">{item?.testimonialOptions?.designation}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonials;
