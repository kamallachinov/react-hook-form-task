import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./Task.css";
import { wholeApplicants } from "../../config";
import CollapseContent from "../components/CollapseContent/CollapseContent";
import { FormValues, IApplicantItem, IWholeApplicants, IrequiredFileDetailItem } from "../types";
import { Button, Modal } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalFormContent from "../components/modalFormContent/ModalFormContent";


const Task = () => {
  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IWholeApplicants>({
    defaultValues: {
      applicant: wholeApplicants,
    },
  });
  const [activeApplicantId, setActiveApplicantId] = useState<number | null>(
    null
  );
  const [currentApplicant, setCurrentApplicant] = useState<number | null>(null);
  const [showApplicantDocModal, setShowApplicantDocModal] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [indexesOfCollapsesWithErrors, setIndexesOfCollapsesWithErrors] =
    useState<string[]>([]);

  const activeApplicant = watch("applicant")?.find(
    (item: IApplicantItem) => item?.id == currentApplicant
  );

  const onSubmitForm: SubmitHandler<FormValues> = (data) => {
    let isValid = true;

    watch("applicant")?.forEach((item) => {
      item?.requiredFileDetail?.forEach((element: IrequiredFileDetailItem) => {
        if (!element?.isAdded) {
          isValid = false;
          return;
        }
      });
    });

    isValid
      ? toast.success("Uğurla göndərildi!") && console.log(data)
      : toast.error("Zəhmət olmasa lazımlı faylları daxil edin!");
  };

  const findCollapsesWithError = () => {
    if (errors.hasOwnProperty("applicant") && Array.isArray(errors.applicant)) {
      const indexesArray: string[] = [];

      errors?.applicant?.forEach((_, index: number) => {
        indexesArray.push(`${index}`);
      });

      setIndexesOfCollapsesWithErrors(indexesArray);
    }
  };

  useEffect(() => {
    findCollapsesWithError();
  }, [errors, refreshComponent]);

  return (
    <div className="accordion-container-div">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {wholeApplicants?.map((applicant: IApplicantItem, index: number) => (
          <CollapseContent
            applicant={applicant}
            index={index}
            rootControl={control}
            setActiveApplicantId={setActiveApplicantId}
            rootSetValue={setValue}
            rootWatch={watch}
            rootErrors={errors}
            setCurrentApplicant={setCurrentApplicant}
            indexesOfCollapsesWithErrors={indexesOfCollapsesWithErrors}
            setOpen={setShowApplicantDocModal}
          />
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setRefreshComponent((prev) => !prev);
            }}
            type="primary"
            htmlType="submit"
          >
            Təsdiqlə
          </Button>
        </div>
      </form>
      {showApplicantDocModal && activeApplicantId !== null && (
        <Modal
          title="Sənəd daxil et"
          open={showApplicantDocModal}
          onCancel={() => setShowApplicantDocModal(false)}
          footer={null}
        >
          <ModalFormContent
            applicant={activeApplicant}
            rootWatch={watch}
            rootSetValue={setValue}
            closeModal={() => setShowApplicantDocModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Task;
