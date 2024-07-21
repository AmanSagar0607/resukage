import PropTypes from "prop-types";

const ProjectsPreview = ({ resumeInfo }) => {
  return (
    <div>
      <h2
        className="text-center font-bold text-sm my-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Projects
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      <div className="my-3">
        {resumeInfo?.projects?.map((project, index) => (
          <div key={index} className="my-5">
            <h2
              className="font-bold text-sm"
              style={{
                color: resumeInfo?.themeColor,
              }}
            >
              {project.name} | {project.description}
            </h2>
            <h2 className="flex justify-between text-xs">
              <a href={project.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                {project.link}
              </a>
              <span>{project.duration}</span>
            </h2>
            <p className="my-2 text-xs">{project.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ProjectsPreview.propTypes = {
  resumeInfo: PropTypes.shape({
    themeColor: PropTypes.string,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        githubRepo: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        details: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};

export default ProjectsPreview;
