import { useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { GlobalApi } from '../../../../../service/GlobalApi.js';
import { Brain, LoaderCircle, Copy } from 'lucide-react'; // Assuming Copy icon is imported from lucide-react
import { useParams } from "react-router-dom";
import { toast } from 'sonner';
import PropTypes from "prop-types";
import { AIChatSession } from '../../../../../service/AIModal.js';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Freasher level, Mid Level and expereince level  in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

const Summary = ({ enabledNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1); // State to track the index of the copied summary

  useEffect(() => {
    summary && setResumeInfo({
      ...resumeInfo,
      summary: summary
    });
  }, [summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle); 
    console.log(PROMPT);
    const result = await  AIChatSession .sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiGenerateSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index); // Set the index of the copied summary
      toast("Copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        summary: summary
      }
    };

    GlobalApi.updateResumeDetails(params?.resumeId, data)
      .then((resp) => {
        console.log(resp);
        enabledNext(true);
        toast("Summary Updated!"); // Display toast notification
      })
      .catch((error) => {
        console.error("Error updating Personal Details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for Job Title</p>

        <form className="mt-5" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button variant="outline" onClick={GenerateSummaryFromAI} type="button" size="sm" className="border-primary text-primary flex gap-2">
              <Brain className='h-4 w-4' />
              Generate from AI
            </Button>
          </div>
          <Textarea
            className="mt-5"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      

      {aiGeneratedSummeryList.length > 0 && (
        <div className='my-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div key={index} className={`p-5 shadow-lg my-4 rounded-lg cursor-pointer ${copiedIndex === index ? 'bg-green-100' : ''}`}>
              <div className='flex justify-between items-center'>
                <h2 className='font-bold my-1 text-primary'>Level: {item.experience_level}</h2>
                <Button onClick={() => copyToClipboard(item.summary, index)} variant="icon" size="sm" className="text-primary">
                  <Copy className='h-4 w-4' />
                </Button>
              </div>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

Summary.propTypes = {
  enabledNext: PropTypes.func.isRequired,
};

export default Summary;
