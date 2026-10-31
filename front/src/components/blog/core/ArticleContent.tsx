import Button from "@components/UI/Button";
import type { ArticleType } from "@shared/schema/article.schema";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
type ArticleContentProps = {
  article: ArticleType;
};
function ArticleContent({ article }: ArticleContentProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 🔗 Génération des liens dynamiques
  const linkComponents = Object.fromEntries(
    article.links.map((link) => [
      link.index,
      <a
        key={link.index}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-bold"
      />,
    ]),
  );

  //TO DO Split des paragraphes
  const paragraphs = article.descriptionKey ? article.descriptionKey : "";

  const getComponentArticle = () => {
    const articleComponentExists = article.componentKey !== null;
    if (articleComponentExists) {
      let linkDirection = ""
      switch (article.componentKey) {
        case "APP_JBDB":
          linkDirection = "jbdb"
          break;
        case "APP_ECRIRE_NOMBRE":
          linkDirection = "nbre/ecrireParams"
          break;
        default:
          return null;
      }
      return <Button className="my-4" onClick={() => navigate(linkDirection, {
        state: {
          returnTo: location.pathname,
        },
      })
    }>
      { t("applies.generique.goApplication") }
        </Button >;
}
return null;
  };

return (
  <div className="ml-2.5">
    {paragraphs &&
      paragraphs.split("\n").map((_, index) => (
        <div key={index} className="mb-2 text-black text-sm">
          <Trans
            i18nKey={article.descriptionKey}
            components={{
              ...linkComponents,
              p: <p className="mb-2" />,
            }}
          />
        </div>
      ))}
    {getComponentArticle()}
  </div>
);
}

export default ArticleContent;
