import PageClasseur from "@components/core/pageClasseur";
import MaJbdbHome from "./MaJbdbHome";
import jbdbLogo from "@pictures/exercice/chronometre.webp";
import { useTranslation } from "react-i18next";

export default function MaJbdbhommeContainer () {
    const {t} = useTranslation()
     const myComponentContent = (
    <>
      <div className="w-full border-b border-calculmental flex  items-center font-bold text-[1.6em]">
        <img className="w-[50px] ml-5 mr-2" src={jbdbLogo} />
        <p className="text-calculmental-dark text-[1.4em]">
          {t("jbdb.home.title")}
        </p>
      </div>
      <MaJbdbHome category="add" />
    </>
  );
    return <PageClasseur >
        {myComponentContent}
    </PageClasseur>

}