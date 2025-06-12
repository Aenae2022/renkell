import type { LinkDataType } from "@shared/schema/link.schema";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  linksList: LinkDataType[];
  matter: string;
}
function MatterLinksList({ title, linksList, matter }: Props) {
  const { t, i18n } = useTranslation();
  const actualLng = i18n.resolvedLanguage;

  const linksTypeColorVariants = {
    mathematiques: "pt-1 ml-2 pl-4 border-1 border-mathematiques",
    francais: "pt-1 ml-2 pl-4 border-1 border-francais",
    multidomaine: "pt-1 ml-2 pl-4 border-1 border-conjugaison",
    autre: "pt-1 ml-2 pl-4 border-1 border-orthographe",
    neutral: "pt-1 ml-2 pl-4",
  } as const;

  if (linksList.length > 0) {
    const linksTypeStyle =
      title !== ""
        ? linksTypeColorVariants[matter as keyof typeof linksTypeColorVariants]
        : linksTypeColorVariants["neutral"];

    return (
      <div>
        <fieldset className={linksTypeStyle}>
          <legend>{t(title)}</legend>
          <div className="flex flex-wrap">
            {linksList.map((link) => {
              let titleLinkButton = "";
              let fullnameButton = "";
              switch (actualLng) {
                case "fr":
                  titleLinkButton =
                    link.titleFr !== null
                      ? link.titleFr
                      : link.titleBr !== null
                      ? link.titleBr
                      : "";
                  fullnameButton =
                    link.fullnameFr !== null
                      ? link.fullnameFr
                      : link.fullnameBr !== null
                      ? link.fullnameBr
                      : "";
                  break;
                case "br":
                  titleLinkButton =
                    link.titleBr !== null
                      ? link.titleBr
                      : link.titleFr !== null
                      ? link.titleFr
                      : "";
                  fullnameButton =
                    link.fullnameBr !== null
                      ? link.fullnameBr
                      : link.fullnameFr !== null
                      ? link.fullnameFr
                      : "";
                  break;
                default:
                  titleLinkButton =
                    link.titleFr !== null
                      ? link.titleFr
                      : link.titleBr !== null
                      ? link.titleBr
                      : "";
                  fullnameButton =
                    link.fullnameFr !== null
                      ? link.fullnameFr
                      : link.fullnameBr !== null
                      ? link.fullnameBr
                      : "";
                  break;
              }
              return (
                <div key={`${link.linkId}`} className="mr-6 text-sm my-1">
                  <input
                    type="checkbox"
                    name={`checkBox${link.linkId}`}
                    checked={link.isAssociated}
                    // onChange={(e) => handleChange(link.linkId, e.target.checked)}
                  />
                  <label className="ml-1">
                    {titleLinkButton}
                    <span className="text-xs ml-2 italic">
                      {fullnameButton !== titleLinkButton ? fullnameButton : ""}
                    </span>
                    <img
                      src={`/pictures/lienSite/${link.icon}`}
                      alt="logo"
                      className="max-w-8 max-h-7 inline cursor-pointer ml-1"
                      onClick={() =>
                        window.open(link.redirection, "_blank", "noreferrer")
                      }
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      </div>
    );
  } else {
    return null;
  }
}

export default MatterLinksList;
