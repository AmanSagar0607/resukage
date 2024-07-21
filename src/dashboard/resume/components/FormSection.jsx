import { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

const FormSection = () => {
  const [activeFormIndex, SetActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center ">
        <Button className="flex gap-2" variant="outline" size="sm">
          {" "}
          <LayoutGrid />
          Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => SetActiveFormIndex(activeFormIndex - 1)}
            >
              {" "}
              <ArrowLeft />{" "}
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => SetActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex === 1 ? (
        <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summary enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience/>
      ) : activeFormIndex === 4 ? (
        <Education/>
      ) : null}

      {/* Summary */}

      {/* Experience */}

      {/* Educational Details */}

      {/* Skills */}
    </div>
  );
};

export default FormSection;
