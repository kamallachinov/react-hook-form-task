import { IApplicantItem } from './types';

export const DocumentTypes = [
    { value: 1, label: "İşəgötürmə Təsdiqi" },
    { value: 2, label: "Vergi İdentifikasiya Nömrəsi" },
    { value: 3, label: "Tələbə Statusunun Təsdiqi" },
    { value: 4, label: "Pensiyaçı Statusunun Təsdiqi" },
    { value: 5, label: "Bank Hesabı Və Çıxarış Məlumatları" },
    { value: 6, label: "Nikah Şəhadətnaməsi" },
    { value: 7, label: "Boşanma Şəhadətnaməsi" },
    { value: 8, label: "Uşaqlar Üçün Doğum Şəhadətnaməsi" },
    { value: 9, label: "Himayəçilik Müraciəti" },
    { value: 10, label: "Əmlak və ya Nəqliyyat Vasitəsinin Sənədləri" },
    { value: 11, label: "Şengen Viza Stikeri" },
    { value: 12, label: "Valideynlərdən Səyahət İcazəsi" },
    { value: 13, label: "Pasport" },
    { value: 14, label: "Doğum vərəqəsi" },
    { value: 15, label: "Hərbi bilet" },
  ];


  export const wholeApplicants : IApplicantItem[] =[
    {
      id: 14,
      name: "Kamal",
      surname: "Lachinov",
      birthYear: null,
      gender: null,
      requiredFiles: [1, 2, 4],
      tableData: [],
    },
    {
      id: 412,
      name: "Ali",
      surname: "Quliyev",
      birthYear: null,
      gender: null,
      requiredFiles: [5, 2, 6, 2, 1],
      tableData: [],
    },
    {
      id: 5123,
      name: "Sadiq",
      surname: "Aliyev",
      birthYear: null,
      gender: null,
      requiredFiles: [14, 12, 11, 5],
      tableData: [],
    },
    {
      id: 98,
      name: "Xeqani",
      surname: "Akifov",
      birthYear: null,
      gender: null,
      requiredFiles: [2],
      tableData: [],
    },
    {
      id: 357,
      name: "Namiq",
      surname: "Akifov",
      birthYear: null,
      gender: null,
      requiredFiles: [5, 14],
      tableData: [],
    },
  ]