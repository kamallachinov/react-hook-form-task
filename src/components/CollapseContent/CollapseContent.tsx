import { useForm, Controller } from "react-hook-form";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Collapse, Modal, Input, Radio, Table, Space, Button } from "antd";
import { useEffect, useState } from "react";
import ModalFormContent from "../modalFormContent/ModalFormContent";

const CollapseContent = ({
  applicant,
  index,
  activeApplicantId,
  globalWatch,
  setActiveApplicantId,
}: any) => {
  const { handleSubmit, control, watch, setValue } = useForm();
  const [open, setOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<number>(0);

  const { Column } = Table;
  const { Panel } = Collapse;

  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleDeleteFile = (fileId: number, applicantID: number) => {
    const fileName = `requiredFiles-${applicantID}`;
    const currentRequiredFiles = watch(fileName);
    const updatedRequiredFiles = currentRequiredFiles.filter(
      (file: any) => file !== fileId
    );
    setValue(fileName, updatedRequiredFiles);
  };


  const onSubmit = () => {};
  return (
    <>
      <Collapse>
        <Panel header={applicant?.name} key={index}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", gap: "20px" }}
          >
            <Controller
              control={control}
              name={
                globalWatch()[`${activeApplicantId}`]?.name
                  ? globalWatch()[`${activeApplicantId}`]?.name
                  : ""
              }
              // rules={{
              //   required: {
              //     value: true,
              //     message: "Bosh olmaz!",
              //   },
              // }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="First name"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {/* <ErrorMessage
                  errors={errors}
                  name={`${applicant.id}.name-${applicant.id}`}
                  render={({ message }) => <p className="error">{message} </p>}
                /> */}
            <Controller
              control={control}
              name={`surname-${applicant.id}`}
              // rules={{
              //   required: {
              //     value: true,
              //     message: "Bosh olmaz!",
              //   },
              // }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Last name"
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    // setValue(`${applicant.id}.surname-${applicant.id}`, e.target.value);
                  }}
                />
              )}
            />
            {/* <ErrorMessage
                  errors={errors}
                  name={`${applicant.id}.surname-${applicant.id}`}
                  render={({ message }) => <p className="error">{message} </p>}
                /> */}
            <Controller
              control={control}
              name={`birthYear-${applicant.id}`}
              rules={{
                required: {
                  value: true,
                  message: "Bosh olmaz!",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Birth Year"
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    // setValue(
                    //   `${applicant.id}.birthYear-${applicant.id}`,
                    //   e.target.value
                    // );
                  }}
                />
              )}
            />
            {/* <ErrorMessage
                  errors={errors}
                  name={`${applicant.id}.birthYear-${applicant.id}`}
                  render={({ message }) => <p className="error">{message} </p>}
                /> */}
            <Controller
              control={control}
              name={`gender-${applicant.id}`}
              // rules={{
              //   required: {
              //     value: true,
              //     message: "Bosh olmaz!",
              //   },
              // }}
              render={({ field: { onChange, value } }) => (
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                </Radio.Group>
              )}
            />
            {/* <ErrorMessage
                  errors={errors}
                  name={`${item.id}.gender-${item.id}`}
                  render={({ message }) => <p className="error">{message} </p>}
                /> */}
            <button>submit</button>
          </form>
          <span
            style={{
              display: "flex",
              justifyContent: "flex-end",
              fontSize: "24px",
              margin: "20px",
            }}
          >
            <PlusCircleTwoTone
              onClick={() => {
                setActivePanel(index);
                setActiveApplicantId(applicant?.id);
                setOpen(true);
              }}
            />
          </span>
          <Table
            dataSource={
              globalWatch()[`${activeApplicantId}`]?.tableData !== null
                ? globalWatch()[`${activeApplicantId}`]?.tableData
                : []
            }
            pagination={false}
          >
            <Column title="Required doc ID" dataIndex="fileId" key="fileId" />
            <Column
              title="Required doc name"
              dataIndex="docName"
              key="docName"
            />
            <Column
              title="File"
              dataIndex="file"
              key="file"
              render={(text: string) => (text ? text : "File daxil edilmeyib")}
            />
            <Column
              title="Action"
              key="action"
              render={(record: any) => (
                // console.log(record),
                <Space size="middle">
                  <Button
                    danger
                    onClick={() => {
                      handleDeleteFile(record?.fileId, applicant?.id);
                    }}
                  >
                    Delete
                  </Button>
                </Space>
              )}
            />
          </Table>
        </Panel>
      </Collapse>
      {open && activeApplicantId !== null && (
        <Modal
          title="Sənəd daxil et"
          open={open}
          onCancel={handleCancel}
          footer={null}
        >
          <ModalFormContent
            applicantId={activeApplicantId}
            globalWatch={globalWatch}
            // updateTableData={updateTableData}
          />
        </Modal>
      )}
    </>
  );
};

export default CollapseContent;
