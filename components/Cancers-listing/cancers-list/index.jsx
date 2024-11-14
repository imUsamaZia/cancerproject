import Header from '@/components/Home/Header';
import MobileMenu from '../../header/MobileMenu';
import Link from 'next/link';
import Disclaimer from '@/components/Home/Disclaimer';
import CallToAction from '@/components/Home/CallToAction';
import Image from 'next/image';
import Faqs from '@/components/faqs/faqs';

const index = async (props) => {
  const { cancers, faqs, paragraph } = props;

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      <Header />
      {/* End Header with upload cv btn */}

      <MobileMenu />
      {/* End MobileMenu */}
      {/* <section className="cancer_wraper flex item-center">
        <div className="auto-container px-0">
          <section className="job-categories">
            <div className="auto-container">
              <div className=" custom-row flex flex-wrap justify-center ">
                <TypesOfCancers cancers={cancers} />
              </div>
            </div>
          </section>
        </div>
      </section> */}

      <section className="common-cancer-main">
        <h4>Most common Cancers in the world </h4>
        <div dangerouslySetInnerHTML={{ __html: paragraph }} />
      </section>

      <section className="_progress">
        <div className="progress-wrapper auto-container">
          <div className="first">
            <div>
              <Image
                src="/images/dummy-image.jpg"
                alt="image"
                className="main"
                width={400}
                height={500}
              />
              <div className="images-child">
                <Image
                  src="/images/dummy-image.jpg"
                  alt="image"
                  width={200}
                  height={200}
                />
                <Image
                  src="/images/dummy-image.jpg"
                  alt="image"
                  width={200}
                  height={200}
                />
                <Image
                  src="/images/dummy-image.jpg"
                  alt="image"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
          <div className="secound">
            <div>
              {cancers?.slice(0, 5)?.map((item, idx) => (
                <div
                  className="progress-step"
                  style={{ position: 'relative' }}
                  key={idx}
                >
                  <div className="btn-outer">
                    <button>{idx + 1}</button>
                  </div>
                  {cancers?.slice(0, 5)?.length !== idx + 1 && <div className="line" />}
                  <div>
                    <h5>
                      <Link href={`/cancers/${item?.slug}`}>{item?.title}</Link>
                    </h5>
                    <div className='exp-content'>
                      <div dangerouslySetInnerHTML={{ __html: item?.cancersOptions?.excerpt }} className='para' />
                      <Link style={{ textDecoration: 'underline' }} href={`/cancers/${item?.slug}`}>Learn more...</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CallToAction newsFeedSection={''} subTitle="find a doctor" />

      <section className="auto-container ">
        <div className="listing-2">
          {cancers?.slice(5, 11)?.map((item, id) => (
            <div key={id} className="list">
              <button>{id + 6}</button>
              <div className="content">
                <h5>
                  <Link href={`/cancers/${item?.slug}`}>{item?.title}</Link>
                </h5>
                <div className='exp-content'>
                  <div dangerouslySetInnerHTML={{ __html: item?.cancersOptions?.excerpt }} className='para' />
                  <Link style={{ textDecoration: 'underline' }} href={`/cancers/${item?.slug}`}>Learn more...</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CallToAction newsFeedSection={''} />

      <section className="auto-container">
        <div className="listing-3">
          {cancers?.slice(11)?.map((item, id) => (
            <div key={id} className="list">
              <button>{id + 12}</button>
              <div className="content">
                <h5>
                  <Link href={`/cancers/${item?.slug}`}>{item?.title}</Link>
                </h5>
                <div className="border" />
                <div className='exp-content'>
                  <div dangerouslySetInnerHTML={{ __html: item?.cancersOptions?.excerpt }} className='para' />
                  <Link style={{ textDecoration: 'underline' }} href={`/cancers/${item?.slug}`}> Learn more...</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="auto-container">
        <div className="_border" />
      </section>

      <Faqs data={faqs} nobg />

      <Disclaimer />
      {/* <!--End Listing Page Section --> */}
    </>
  );
};

export default index;

