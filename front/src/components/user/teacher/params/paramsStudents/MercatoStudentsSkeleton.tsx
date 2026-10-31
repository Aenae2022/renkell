import { useTranslation } from "react-i18next";

function MercatoStudentsSkeleton() {
  const { t } = useTranslation();
  const studentsList = [];
  for (let i = 0; i < 10; i++) {
    studentsList.push(i);
  }
  return (
    <>
      <h1 className="text-3xl text-center mb-4">{t("paramsStudents.title")}</h1>
      <div className="flex">
        <div className="w-1/2 mr-4 px-2 rounded-t-lg border-dashed border-2 border-b-0 border-grammaire animate-pulse">
          <h2 className="h-[28px] w-9/10 bg-slate-700 animate-pulse"></h2>
          <p className="bg-gray-500 h-[20px] animate-pulse"></p>
        </div>
        <div className="w-1/2 ml-4 px-2 rounded-t-lg border-dashed border-2 border-b-0 border-calcul animate-pulse">
          <h2 className="h-[28px] w-9/10 bg-slate-700 animate-pulse"></h2>
        </div>
      </div>
      <div className="flex ">
        <div className="w-1/2 mr-4 pt-2 pl-4 rounded-b-lg border-dashed border-2 border-t-0 border-grammaire animate-pulse">
          <div className="w-10/12 mx-auto bg-slate-600 animate-pulse h-[500px]"></div>
        </div>
        <div className="w-1/2 ml-4 pl-4 pt-2 rounded-b-lg border-dashed border-2 border-t-0 border-calcul animate-pulse">
          <div className="w-10/12 mx-auto bg-slate-600 animate-pulse h-[500px]"></div>
        </div>
      </div>
    </>
  );
}

export default MercatoStudentsSkeleton;
