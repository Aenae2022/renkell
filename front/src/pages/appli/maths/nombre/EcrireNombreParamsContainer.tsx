import EcrireNombreParams from "./EcrireNombreParams";
import Logo from "@pictures/icons/nombre-2.png";
import PageClasseur from "@components/core/pageClasseur";
import { useTranslation } from "react-i18next";

function EcrireNombreParamsContainer() {
  const {t} = useTranslation()
     const myComponentContent = (
    <>
      <div className="w-full border-b border-nombre flex  items-center font-bold text-[1.6em] mb-4">
        <img className="w-[50px] ml-5 mr-2" src={Logo} alt="logo" />
        <p className="text-nombre-dark text-[1.4em] mb-2">
          {t("applies.ecrireNombre.globalTitle")}
          </p>
      </div>
      <EcrireNombreParams />
    </>
  );
    return <PageClasseur >
        {myComponentContent}
    </PageClasseur>


}

export default EcrireNombreParamsContainer;
