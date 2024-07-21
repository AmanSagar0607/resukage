import { useState } from "react";
import { PlusSquare, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { GlobalApi } from "../../../service/GlobalApi.js";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [loading, setLoading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate(); // Correct hook

  const onCreate = async () => {
    const uuid = uuidv4();
    setLoading(true);
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.createNewResume(data).then(
      (resp) => {
        console.log(resp.data.data.documentId);
        if (resp) {
          setLoading(false);
          navigate('/dashboard/resume/' + resp.data.data.documentId + '/edit'); 
        }
      },
      (error) => {
        setLoading(false);
        console.error(error);
      }
    );
  };

  return (
    <div>
      <div
        className="p-14 py-24 mt-5 border items-center flex bg-secondary rounded-lg justify-center  h-[220px] w-[180px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dotted"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Please provide a title for your resume.</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
