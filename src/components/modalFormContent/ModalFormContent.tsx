import { useForm, Controller } from "react-hook-form";
import { Select } from "antd";
import { DocumentTypes } from "../../../config";
import {
  IApplicantItem,
  IrequiredFileDetailItem,
  ModalContentProps,
  SubmittedData,
} from "../../types";

const ModalFormContent = ({
  applicant,
  rootWatch,
  rootSetValue,
  closeModal,
}: ModalContentProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmittedData>();

  const onSubmit = (data: SubmittedData) => {
    rootSetValue(
      "applicant",
      rootWatch("applicant")?.map((item: IApplicantItem) => {
        if (item?.id == applicant?.id) {
          return {
            ...item,
            documentList: [
              ...item.documentList,
              {
                type: data?.selectedFileType,
                file: data?.file,
                fileType: DocumentTypes?.filter(
                  (item) => item?.value == data?.selectedFileType
                ).map((f) => f?.label),
              },
            ],
            requiredFileDetail: item?.requiredFileDetail?.map(
              (item: IrequiredFileDetailItem) => {
                if (item?.value == data?.selectedFileType) {
                  return { ...item, isAdded: true };
                }
                return item;
              }
            ),
          };
        } else {
          return item;
        }
      })
    );
    closeModal();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <Controller
          name="selectedFileType"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Zəhmət olmasa fayl növünü seçin!",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder={"File növü seçin"}
              style={{ width: "100%" }}
              value={value}
              onChange={onChange}
              options={applicant?.requiredFileDetail?.filter(
                (item: IrequiredFileDetailItem) => !item?.isAdded
              )}
            />
          )}
        />
        {errors?.selectedFileType && (
          <p className="error" style={{ margin: "0" }}>
            {errors?.selectedFileType?.message}{" "}
          </p>
        )}

        <Controller
          name="file"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Zəhmət olmasa faylı seçin!",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <input
              type="file"
              style={{ width: "100%" }}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {errors?.file && (
          <p className="error" style={{ margin: "0", alignItems: "start" }}>
            {errors?.file?.message}{" "}
          </p>
        )}

        <button style={{ width: "100%" }}>Submit</button>
      </form>
    </div>
  );
};

export default ModalFormContent;
