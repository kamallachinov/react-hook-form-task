import { useForm, Controller } from "react-hook-form";
import { Select } from "antd";
import { DocumentTypes } from "../../../config";
import { useEffect } from "react";

// interface IFormData {
//   selectedFileType: number | undefined | null;
//   file: string | undefined;
// }

const ModalFormContent = ({ applicantId, globalWatch }: any) => {
  const { control, handleSubmit, watch, setValue, getValues } = useForm();

  const formatFileData = (data: any) => {
    const selectedFileTypeIndex = data?.selectedFileType;

    const selectedFileType = DocumentTypes?.find(
      (doc) => doc?.value === selectedFileTypeIndex + 1
    );

    return {
      ...data,
      selectedFileType: selectedFileType?.label || "",
      fileId: selectedFileType?.value,
    };
  };

  const onSubmit = (data: any) => {
    // console.log("lol", data);
    const formattedData = formatFileData(data); // fileId, fileRoute,selectedFileType

    // updateTableData(formattedData);
    const selectedFileTypeIndex = watch("selectedFileType");
    const selectedFileType = DocumentTypes?.find(
      (doc) => doc?.value === selectedFileTypeIndex + 1
    );

    const updatedRequiredFiles = globalWatch()[
      `${applicantId}`
    ]?.requiredFiles.filter(
      (fileId: number) => fileId !== selectedFileType?.value
    );

    const updatedTableData = [
      globalWatch(),
      {
        selectedFileType: formattedData?.selectedFileType,
        file: formattedData?.file,
        fileId: formattedData.fileId,
      },
    ];

    console.log(updatedRequiredFiles, "updated Required files");
    console.log(updatedTableData, " updated Table data");

    console.log(watch([`${applicantId}`]));
    console.log(globalWatch()[`${applicantId}`]?.tableData);

    // setValue(`${applicantId}`, updatedRequiredFiles);
    // setValue(`${applicantId}`, updatedRequiredFiles);
    setValue(globalWatch()[`${applicantId}`]?.tableData, updatedTableData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <Controller
          name="selectedFileType"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              style={{ width: "100%" }}
              value={value}
              onChange={onChange}
              options={(globalWatch()[applicantId]?.requiredFiles || []).map(
                (fileId: any, index: number) => ({
                  label:
                    DocumentTypes.find((doc) => doc.value === fileId)?.label ||
                    "",
                  value: index,
                })
              )}
            />
          )}
        />

        <Controller
          name="file"
          control={control}
          // rules={{
          //   required: {
          //     value: true,
          //     message: "Zəhmət olmasa faylı seçin!",
          //   },
          // }}
          render={({ field: { onChange, value } }) => (
            <input
              type="file"
              style={{ width: "100%" }}
              onChange={onChange}
              value={value}
            />
          )}
        />
        {/* <ErrorMessage
          errors={errors}
          name="file"
          render={({ message }) => <p className="error">{message} </p>}
        /> */}

        <button style={{ width: "100%" }}>Submit</button>
      </form>
    </div>
  );
};

export default ModalFormContent;
