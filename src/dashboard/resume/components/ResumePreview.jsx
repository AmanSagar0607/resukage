// import { useContext } from 'react'
// import { ResumeInfoContext } from './../../../context/ResumeInfoContext' 
// import PersonalDetailPreview from './../../resume/components/preview/PersonalDetailPreview'
// import SummaryPreview  from './../../resume/components/preview/SummaryPreview'
// import ExperiencePreview  from './../../resume/components/preview/ExperiencePreview'
// import EducationalPreview  from './../../resume/components/preview/EducationalPreview'
// import SkillsPreview   from './../../resume/components/preview/SkillsPreview'
// import ProjectsPreview   from './../../resume/components/preview/ProjectsPreview'


// const ResumePreview = () => {
//   const { resumeInfo } = useContext(ResumeInfoContext)

//   return (
//     <div className="shadow-lg h-full p-14 border-t-[5px]"
//     style={{
//       borderColor:resumeInfo?.themeColor
//     }}>
//       {/* Personal Details */}
//       <PersonalDetailPreview resumeInfo={resumeInfo} />

//       {/* Summary or objective*/}
//       <SummaryPreview resumeInfo={resumeInfo} />
     

//       {/* Professional Experience */}
//       <ExperiencePreview resumeInfo={resumeInfo} />


//       {/* Education  */}
//       <EducationalPreview  resumeInfo={resumeInfo} />

//       {/* Skills */}
//       <SkillsPreview  resumeInfo={resumeInfo} />

//       {/* ProjectsPreview */}
//       <ProjectsPreview  resumeInfo={resumeInfo} />
//     </div>
//   )
// }

// export default ResumePreview
import { useContext } from 'react'
import { ResumeInfoContext } from './../../../context/ResumeInfoContext' 
import PersonalDetailPreview from './../../resume/components/preview/PersonalDetailPreview'
import SummaryPreview from './../../resume/components/preview/SummaryPreview'
import ExperiencePreview from './../../resume/components/preview/ExperiencePreview'
import EducationalPreview from './../../resume/components/preview/EducationalPreview'
import SkillsPreview from './../../resume/components/preview/SkillsPreview'
import ProjectsPreview from './../../resume/components/preview/ProjectsPreview'

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext)

  if (!resumeInfo) {
    return <div>Loading resume information...</div>
  }

  return (
    <div 
      className="shadow-lg h-full p-14 border-t-[5px]"
      style={{
        borderColor: resumeInfo.themeColor || '#000000'
      }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />
      <ExperiencePreview resumeInfo={resumeInfo} />
      <EducationalPreview resumeInfo={resumeInfo} />
      <SkillsPreview resumeInfo={resumeInfo} />
      <ProjectsPreview resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview;