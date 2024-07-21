import PropTypes from "prop-types";

const SkillsPreview = ({ resumeInfo }) => {
  return (
    <div>
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="grid grid-cols-6 gap-2 my-3 mb-5">
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <h2 className="text-xs">{skill.name}</h2>
            {/* Example of displaying rating if needed */}
            {/* <div className="h-2 bg-gray-200 w-[120px]">
              <div className="h-2" style={{
                backgroundColor: resumeInfo?.themeColor,
                width: skill?.rating + '%'
              }}>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

SkillsPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    themeColor: PropTypes.string,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        // Optionally include rating if needed
        // rating: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default SkillsPreview;
