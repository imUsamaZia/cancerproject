import Link from "next/link";
import DropDownDetails from "./DropDownDetails";

const DoctorMobileDetails = (props) => {
  const {
    doctor,
    educations,
    awards,
    professionalMemberships,
    clinicalExperience,
    researchpublications,
    cancerTreated,
    insurances,
    specializations,
    insuranceHeading,
    specializationsHeading,
    clinicalExperienceHeading,
    educationHeading,
    cancerTreatedHeading,
    bookAppointmentLabel,
    awardsHeading,
    professionalMembershipsHeading,
    researchAndPublicationsHeading,
  } = props;

  return (
    <div className="row mb-hidden">
      <div className="content-column col-lg-8 col-md-12 col-sm-12">
        <div className="candidate-block-five">
          <div className="inner-box">
            <div className="content doctor_content">
              <h4 className="name">{doctor?.title}</h4>
              <div className="flex items-center ">
              {doctor?.specializations?.nodes?.map((val) => (
                <h6 key={val.id} className="designation mb-2">
                  {val?.name}
                </h6>
              ))}
              </div>
              <div className="cancer_treted pb-3 flex items-center">
                <h6 className="text-gray-2 pr-4 line-height-38">
                  {cancerTreatedHeading || "Cancer Treated"}:
                </h6>
                <ul className="post-tags grid grid-cols-3 grid-cols-md-2 mb-cust-lists-23">
                  {cancerTreated?.map((val, i) => (
                    <li className="bg-primary" key={i}>
                      <Link
                        className="text-white"
                        href={`/cancers/${val?.slug}`}
                      >
                        {val?.title.replace(/(<([^>]+)>)/gi, "")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="candidate-info border-t pt-3 pb-0">
                <li className="socail-text-theme font-500">
                  <span className="icon flaticon-map-locator"></span>
                  {doctor?.doctorsoptions?.address}
                </li>
                <li className="pt-2">
                  <Link
                    className="socail-text-theme font-500"
                    href={`tel:${doctor?.doctorsoptions?.phoneNumber}`}
                  >
                    <span className="icon flaticon-telephone pt-2"></span>
                    {doctor?.doctorsoptions?.phoneNumber}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*  <!-- Candidate block Five --> */}

        <div className="job-detail">
          <div
            className="content_details"
            dangerouslySetInnerHTML={{
              __html: `${doctor?.doctorsoptions?.aboutDoctor}`,
            }}
          />

          <div className="btn-box pb-5">
            <Link
              target="__blank"
              className="theme-btn btn-style-one w-full custom-btn"
              href={doctor?.doctorsoptions?.bookAppointmentLink || "#"}
            >
              {bookAppointmentLabel || "Book An Appointment"}
            </Link>
          </div>

          <DropDownDetails
            educations={educations}
            awards={awards}
            professionalMemberships={professionalMemberships}
            clinicalExperience={clinicalExperience}
            researchpublications={researchpublications}
            specializations={specializations}
            insurances={insurances}
            insuranceHeading={insuranceHeading}
            specializationsHeading={specializationsHeading}
            clinicalExperienceHeading={clinicalExperienceHeading}
            educationHeading={educationHeading}
            cancerTreatedHeading={cancerTreatedHeading}
            bookAppointmentLabel={bookAppointmentLabel}
            awardsHeading={awardsHeading}
            professionalMembershipsHeading={professionalMembershipsHeading}
            researchAndPublicationsHeading={researchAndPublicationsHeading}
          />

          {/* <!-- Portfolio --> */}
        </div>
        {/* End job-details */}
      </div>
    </div>
  );
};

export default DoctorMobileDetails;
