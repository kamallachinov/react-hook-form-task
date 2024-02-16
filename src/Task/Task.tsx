import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../Task/Task.css";
import { wholeApplicants } from "../../config";
import CollapseContent from "../components/CollapseContent/CollapseContent";

const Task = () => {
  const { watch, setValue } = useForm();
  const [activeApplicantId, setActiveApplicantId] = useState<number | null>(
    null
  );

  useEffect(() => {
    wholeApplicants?.forEach((item) => {
      setValue(`${item?.id}`, {
        name: item?.name,
        surname: item?.surname,
        birthYear: item?.birthYear,
        gender: item?.gender,
        requiredFiles: item?.requiredFiles,
        tableData: item?.tableData,
      });
    });
  }, [wholeApplicants]);

  return (
    <div className="accordion-container-div">
      {wholeApplicants?.map((applicant, index) => (
        <CollapseContent
          key={applicant.id}
          applicant={applicant}
          index={index}
          activeApplicantId={activeApplicantId}
          setActiveApplicantId={setActiveApplicantId}
          // tableData={watch("tableData")}
          globalWatch={watch}
          requiredDocs={applicant?.requiredFiles}
        />
      ))}
    </div>
  );
};

export default Task;
