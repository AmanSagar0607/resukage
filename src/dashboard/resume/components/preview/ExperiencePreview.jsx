import PropTypes from "prop-types";

const ExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.experience.map((experience, index) => (
        <div key={index} className="my-3">
          <h2 className="font-bold text-sm"
          style={{
            color: resumeInfo?.themeColor,
          }}
          >{experience?.title}</h2>
          <h2 className="flex justify-between text-xs">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span> 
              {experience?.startDate} TO {experience?.currentlyWorking ? "Present" : experience?.endDate}
            </span>
          </h2>
          {/* <p className="my-2 text-xs">{experience?.worksummary}</p> */}
          <div dangerouslySetInnerHTML={{ __html: experience.workSummary }} />
        </div>
      ))}
    </div>
  );
};

ExperiencePreview.propTypes = {
  resumeInfo: PropTypes.shape({
    themeColor: PropTypes.string,
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        companyName: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        currentlyWorking: PropTypes.bool,
        worksummary: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default ExperiencePreview;
