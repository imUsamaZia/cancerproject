import Image from "next/image";

const OurMission = (props) => {
  const { page, cleanMission } = props;
  const ourMission = page?.homeOptions?.ourMission || {};

    // console.log(ourMission, 'ourMission')
    // console.log(cleanMission, 'cleanMission')

  return (
    <section className="steps-section pt-0">
      <div className="auto-container">
        <div className="row">
          <div className="image-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner-column">
              {ourMission?.image?.sourceUrl && (
                <figure className="image">
                  <Image
                    width={608}
                    height={600}
                    src={
                      `${ourMission?.image?.sourceUrl}` ||
                      "/images/resource/resource-1.jpg"
                    }
                    alt="resource"
                  />
                </figure>
              )}

              {/* <!-- Count Employers --> */}
            </div>
          </div>
          {/* End image-column */}

          <div className="content-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner-column" data-aos="fade-up">
              <div className="sec-title">
                <h2>{ourMission?.heading}</h2>
                <div className="text">{ourMission?.description}</div>
                <ul className="steps-list">
                  {cleanMission.map((item, i) => (
                    <li key={i}>
                      <span className="count">{i + 1}</span>
                      <div>
                        {item?.title}
                        <p className="text">{item?.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* End .content-column */}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
