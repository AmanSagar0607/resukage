import PropTypes from "prop-types";

const EducationalPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Educational
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.education.map((education, index) => (
        <div key={index} className="my-3">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {education.universityName}
          </h2>
          <h2 className="text-xs justify-between flex">
            {education?.degree} in {education?.major}
            <span>
              {education.startDate} - {education.endDate}
            </span>
          </h2>
          <p className="text-xs my-2">{education.description}</p>
        </div>
      ))}
    </div>
  );
};

EducationalPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    themeColor: PropTypes.string,
    education: PropTypes.arrayOf(
      PropTypes.shape({
        universityName: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        major: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};

export default EducationalPreview;
