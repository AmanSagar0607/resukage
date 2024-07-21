import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';
import PropTypes from 'prop-types';

const PROMPT = `Position title: {positionTitle}

Generate 3 concise, impactful bullet points with bullet symbol for a resume experience section. Each point should:
- Start with a strong action verb
- Highlight specific achievements, skills, or responsibilities
- Be relevant to the position of {positionTitle}
- Avoid using "I" statements

Format the response as a JSON object with a single "experience" array containing one object with "title" and "bullets" properties. The "bullets" should be an array of strings.`;

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue = '' }) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  // const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].title) {
      toast('Please Add Position Title');
      setLoading(false);
      return;
    }
    
    try {
      const prompt = PROMPT.replace(/{positionTitle}/g, resumeInfo.experience[index].title);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      
      // Parse the JSON response
      const jsonResponse = JSON.parse(responseText);
      
      // Extract the bullets from the JSON and wrap them in a <ul> tag
      const bullets = jsonResponse.experience[0].bullets;
      const formattedBullets = `<ul>${bullets.map(bullet => `<li>${bullet}</li>`).join('')}</ul>`;
      
      setValue(formattedBullets);
      onRichTextEditorChange(formattedBullets);
    }
    catch (error) {
      console.error('Error generating summary:', error);
      toast('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <>
              <Brain className='h-4 w-4' /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <HtmlButton/>
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

RichTextEditor.propTypes = {
  onRichTextEditorChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  defaultValue: PropTypes.string
};

export default RichTextEditor;