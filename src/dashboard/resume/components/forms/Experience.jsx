import { useState, useEffect, useContext} from 'react';
import { Button } from '@/components/ui/button';
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from './../../../../context/ResumeInfoContext' 

const formField = {
    title: '',
    companyName:'',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
  };


const Experience = () => {
  const [experienceList, setExperienceList] = useState([
    { ...formField },
  ]);

  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };

  const handleRichTextEditor = (value, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const RemoveExperience = () => {
    setExperienceList(experienceList => experienceList.slice(0, -1));
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
    console.log(experienceList);
  }, [experienceList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Work Experience</h2>
        <p>Add Your Previous Work Experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 py-5 rounded-lg my-5">
                <div>
                  <label className="text-xs mx-2">Position Title</label>
                  <input
                    className="border border-gray-300 rounded p-2 w-full"
                    name="title"
                    value={item.title}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs mx-2">Company Name</label>
                  <input
                    className="border border-gray-300 rounded p-2 w-full"
                    name="companyName"
                    value={item.companyName}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs mx-2">City</label>
                  <input
                    className="border border-gray-300 rounded p-2 w-full"
                    name="city"
                    value={item.city}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs mx-2">State</label>
                  <input
                    className="border border-gray-300 rounded p-2 w-full"
                    name="state"
                    value={item.state}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs mx-2">Start Date</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded p-2 w-full"
                    name="startDate"
                    value={item.startDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs mx-2">End Date</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded p-2 w-full"
                    name="endDate"
                    value={item.endDate}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item.workSummary}
                    onRichTextEditorChange={(value) => handleRichTextEditor(value, 'workSummary', index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={AddNewExperience} className="text-primary">+ Add More Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary">Remove</Button>
          </div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default Experience;