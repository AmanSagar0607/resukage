import  { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import { GlobalApi } from "./../../service/GlobalApi.js";
import ResumeCardItem from '../dashboard/components/ResumeCardItem'

function DashBoard() {
  const { user } = useUser();
 const [resumeList, setResumeList] = useState([]);

  const GetResumeList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(resp => {
      setResumeList(resp.data.data);
    });
  };

  useEffect(() => {
    if (user) {
      GetResumeList();
    }
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl ">My Resume</h2>
      <p>Start Creating Ai Resume to your Next Job Role</p>
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <AddResume />
          {resumeList.length>0&&resumeList.map((resume, index)=>(
            <ResumeCardItem resume={resume} key={index} />
           )) }
      </div>
    </div>
  );
}

export default DashBoard;
