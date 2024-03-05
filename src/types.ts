import { DeepMap, FieldError } from "react-hook-form";

 interface IApplicantItem {
    id: number;
    name: string;
    surname: string;
    birthYear: string | null;
    gender: string | null;
    requiredFiles: number[];
    documentList: [],
    requiredFileDetail?:[]
  }
  
   interface IApplicant {
    id: number;
    name: string;
    surname: string;
    birthYear: number | null;
    gender: string | null;
    documentList: [];
  }

   interface FormValues {
    applicant: IApplicantItem[];
  }


   interface IUploadedDoc {
    type: number;
    file: string;
    clientId: string;
  }

   interface IrequiredFileDetailItem {
    value: number;
    label: string;
    isAdded: boolean;
  }
  
   interface IDocumentListItem {
    type: number;
    file: string;
    fileType:string[]
  }

   interface SubmittedData {
    file: string;
    selectedFileType: number;
   }
  
   interface ModalContentProps {
    applicant: IApplicantItem | undefined;
    rootWatch: any;
    rootSetValue: any;
    closeModal: () => void;
  }

  interface CollapseContentProps {
    applicant: IApplicantItem;
    index: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    rootWatch: any;
    setActiveApplicantId: React.Dispatch<React.SetStateAction<number | null>>;
    rootSetValue: any;
    rootControl: any;
    rootErrors: DeepMap<Record<string, any>, FieldError>;
    indexesOfCollapsesWithErrors: string[];
    setCurrentApplicant: React.Dispatch<number | null>;
  }


  interface IWholeApplicants {
    applicant: IApplicantItem[];
  }
  


export type {
  IApplicantItem, IApplicant,FormValues,IUploadedDoc,IrequiredFileDetailItem,IDocumentListItem,SubmittedData,ModalContentProps,CollapseContentProps,IWholeApplicants
   }