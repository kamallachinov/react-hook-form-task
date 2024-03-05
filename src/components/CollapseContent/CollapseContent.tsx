import { Controller } from "react-hook-form";
import {
  PlusCircleTwoTone,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  Collapse,
  Input,
  Radio,
  Table,
  Space,
  Button,
  Tooltip,
  DatePicker,
  Menu,
  Badge,
} from "antd";
import { ReactNode, useEffect, useState } from "react";
import { DocumentTypes } from "../../../config";
import {
  CollapseContentProps,
  IApplicantItem,
  IDocumentListItem,
  IrequiredFileDetailItem,
} from "../../types";

const { Column } = Table;
const { Panel } = Collapse;

const CollapseContent = ({
  applicant,
  index,
  setOpen,
  rootWatch,
  setActiveApplicantId,
  rootSetValue,
  rootControl,
  rootErrors,
  indexesOfCollapsesWithErrors,
  setCurrentApplicant,
}: CollapseContentProps) => {
  const [activePanel, setActivePanel] = useState<string[]>([
    "0",
    "1",
    "2",
    "3",
    "4",
  ]);

  const handleDeleteFile = (fileType: number): void => {
    const updatedApplicant = rootWatch("applicant")?.map(
      (item: IApplicantItem) => {
        if (item?.id == applicant?.id) {
          return {
            ...item,
            requiredFileDetail: item?.requiredFileDetail?.map(
              (j: IrequiredFileDetailItem) => {
                if (j?.value == fileType) {
                  return { ...j, isAdded: false };
                }
                return j;
              }
            ),
            documentList: item?.documentList?.filter(
              (k: IDocumentListItem) => k?.type != fileType
            ),
          };
        }
        return item;
      }
    );
    rootSetValue("applicant", updatedApplicant);
  };

  useEffect(() => {
    if (indexesOfCollapsesWithErrors?.length !== 0) {
      setActivePanel(indexesOfCollapsesWithErrors);
    } else {
      setActivePanel([]);
    }
  }, [indexesOfCollapsesWithErrors]);

  useEffect(() => {
    const mappedApplicantsWithFileDetails = rootWatch("applicant")?.map(
      (item: IApplicantItem) => ({
        ...item,
        requiredFileDetail: DocumentTypes?.filter((doc) =>
          item?.requiredFiles?.includes(doc?.value)
        ).map((docLast) => ({ ...docLast, isAdded: false })),
      })
    );
    rootSetValue("applicant", mappedApplicantsWithFileDetails);
    renderRequiredFilesMenu();
  }, []);

  const requiredFileDetail = rootWatch("applicant")?.find(
    (item: IApplicantItem) => item?.id === applicant?.id
  )?.requiredFileDetail;

  const numberOfRequiredDocs = requiredFileDetail
    ? requiredFileDetail?.filter(
        (item: IrequiredFileDetailItem) => !item?.isAdded
      )?.length
    : 0;

  const isAllDocsAdded = numberOfRequiredDocs === 0;

  const collapseHeaderGenerater = (): ReactNode => {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {applicant.name}
          <span
            style={{
              display: "flex",
              gap: "0.2rem",
              color: isAllDocsAdded ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            <Badge color={isAllDocsAdded ? "green" : "red"} />
            {isAllDocsAdded
              ? "Bütün sənədlər daxil edilib"
              : `${numberOfRequiredDocs} sənəd daxil edilməlidi`}
          </span>
        </div>
      </>
    );
  };

  const renderRequiredFilesMenu = (): null | IrequiredFileDetailItem[] => {
    const applicantItem = rootWatch("applicant")?.find(
      (item: IApplicantItem) => item?.id === applicant?.id
    );

    const requiredFileDetail = applicantItem?.requiredFileDetail;

    return !requiredFileDetail ? null : requiredFileDetail;
  };

  return (
    <>
      <Collapse
        activeKey={activePanel}
        onChange={(panels) =>
          setActivePanel(Array.isArray(panels) ? panels : [])
        }
      >
        <Panel header={collapseHeaderGenerater()} key={index}>
          <div
            style={{
              display: "flex",
              gap: "4rem",
              alignItems: "center ",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <label>Ad:</label>
              <Controller
                control={rootControl}
                name={`applicant.${index}.name`}
                rules={{
                  required: {
                    value: true,
                    message: "Ad boş olmaz!",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Tooltip
                      placement="bottom"
                      title={
                        rootErrors?.applicant?.length
                          ? rootErrors?.applicant[`${index}`]?.name?.message
                          : ""
                      }
                    >
                      <Input
                        placeholder="First name"
                        value={value}
                        onChange={onChange}
                        style={{
                          borderColor:
                            rootErrors?.applicant?.length &&
                            rootErrors?.applicant[`${index}`]?.name
                              ? "red"
                              : "",
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <label>Soyad:</label>
              <Controller
                control={rootControl}
                name={`applicant.${index}.surname`}
                rules={{
                  required: {
                    value: true,
                    message: "Zəhmət olmasa soyad qeyd edin!",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Tooltip
                      placement="bottom"
                      title={
                        rootErrors?.applicant?.length
                          ? rootErrors?.applicant[`${index}`]?.surname?.message
                          : ""
                      }
                    >
                      <Input
                        placeholder="Surname"
                        value={value}
                        onChange={onChange}
                        style={{
                          borderColor:
                            rootErrors?.applicant?.length &&
                            rootErrors?.applicant[`${index}`]?.surname
                              ? "red"
                              : "",
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <label>Doğum ili:</label>
              <Controller
                control={rootControl}
                name={`applicant.${index}.birthYear`}
                rules={{
                  required: {
                    value: true,
                    message: "Zəhmət olmasa doğum ili qeyd edin!",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Tooltip
                      placement="bottom"
                      title={
                        rootErrors?.applicant?.length
                          ? rootErrors?.applicant[`${index}`]?.birthYear
                              ?.message
                          : ""
                      }
                    >
                      <DatePicker
                        onChange={onChange}
                        value={value}
                        status={
                          rootErrors?.applicant?.length &&
                          rootErrors?.applicant[`${index}`]?.birthYear
                            ? "error"
                            : ""
                        }
                      />
                    </Tooltip>
                  </div>
                )}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <label>Gender:</label>
              <Controller
                control={rootControl}
                name={`applicant.${index}.gender`}
                rules={{
                  required: {
                    value: true,
                    message: "Zəhmət olmasa cins seçin!",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <div>
                    <Tooltip
                      placement="bottom"
                      title={
                        rootErrors?.applicant?.length
                          ? rootErrors?.applicant?.[index]?.gender?.message
                          : ""
                      }
                    ></Tooltip>
                    <Radio.Group
                      onChange={onChange}
                      value={value}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Radio
                        value="1"
                        style={{
                          borderColor: rootErrors?.applicant?.[index]?.gender
                            ? "red"
                            : "",
                          outline: rootErrors?.applicant?.[index]?.gender
                            ? "2px solid #ff0000"
                            : "",
                        }}
                      >
                        Male
                      </Radio>
                      <Radio
                        value="2"
                        style={{
                          borderColor: rootErrors?.applicant?.[index]?.gender
                            ? "red"
                            : "",
                          outline: rootErrors?.applicant?.[index]?.gender
                            ? "2px solid #ff0000"
                            : "",
                        }}
                      >
                        Female
                      </Radio>
                    </Radio.Group>
                  </div>
                )}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "24px",
              margin: "20px",
            }}
          >
            <Menu mode="inline" style={{ width: 256 }}>
              {requiredFileDetail?.map(
                (item: IrequiredFileDetailItem, itemIndex: number) => (
                  <Menu.Item key={itemIndex}>
                    {item?.label}
                    {item?.isAdded ? (
                      <CheckOutlined
                        style={{ color: "green", fontSize: "18px" }}
                      />
                    ) : (
                      <CloseOutlined
                        style={{ color: "red", fontSize: "18px" }}
                      />
                    )}
                  </Menu.Item>
                )
              )}
            </Menu>

            <PlusCircleTwoTone
              onClick={() => {
                setCurrentApplicant(applicant?.id);
                setActiveApplicantId(applicant?.id);
                setOpen(true);
              }}
            />
          </div>

          <Table
            dataSource={
              rootWatch("applicant")?.find(
                (item: IApplicantItem) => item?.id == applicant?.id
              )?.documentList || []
            }
            pagination={false}
          >
            <Column
              title="File adı"
              dataIndex="fileType"
              key="fileType"
              render={(fileType: string) =>
                fileType ? fileType : "Belə İD yoxdur"
              }
            />
            <Column
              title="File növü"
              dataIndex="type"
              key="type"
              render={(type: number) => (type ? type : "Belə file növü yoxdur")}
            />
            <Column
              title="File yolu"
              dataIndex="file"
              key="file"
              render={(file: string) => (file ? file : "Belə file yolu yoxdur")}
            />
            <Column
              title="Action"
              key="action"
              render={(record: IDocumentListItem) => (
                <Space size="middle">
                  <Button
                    danger
                    onClick={() => {
                      handleDeleteFile(record?.type);
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
    </>
  );
};

export default CollapseContent;
