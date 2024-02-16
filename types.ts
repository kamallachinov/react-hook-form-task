export interface IApplicantItem {
    id: number;
    name: string;
    surname: string;
    birthYear: string | null;
    gender: string | null;
    requiredFiles: number[];
    tableData:[]
  }
  
  export interface IApplicant {
    id: number;
    name: string;
    surname: string;
    birthYear: number | null;
    gender: string | null;
    requiredFiles: number[];
  }