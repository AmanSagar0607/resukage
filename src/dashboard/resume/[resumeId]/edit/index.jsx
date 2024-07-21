import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "./../../components/FormSection";
import ResumePreview from "./../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext"; // Add this import
import dummy from './../../../../data/dummy'


const EditResume = () => {
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    setResumeInfo(dummy)
  }, [params.resumeId]);

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;