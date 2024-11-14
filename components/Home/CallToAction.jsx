import Link from "next/link";

const CallToAction = (props) => {
  const { newsFeedSection, subTitle } = props;
  return (
    <section
      className="call-to-action-two bg-theme-color"
    //   style={{ backgroundImage: "url(/images/background/8.png)" }}
    >
      <div className="auto-container" data-aos="fade-up">
        <div className="sec-title light text-center">
          <h2 style={{fontWeight: 700, marginBottom: '10px'}}>{subTitle}</h2>
          <h2>{newsFeedSection?.heading ? newsFeedSection?.heading : 'A news feed like no other!'}</h2>
          <div className="text">
            {newsFeedSection?.subHeading ? newsFeedSection?.subHeading : 'Check out the latest science back cancer news.'}
          </div>
        </div>
        {/* End sec-title */}

        <div className="btn-box">
          <Link href={newsFeedSection?.button?.url ? newsFeedSection?.button?.url :'/news'} className="theme-btn btn-style-three">
            {newsFeedSection?.button?.label ? newsFeedSection?.button?.label:  'Watch Now'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
