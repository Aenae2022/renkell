import MaJbdbHome from "@pages/appli/MaJbdbHome";
import type { ArticleType } from "@shared/schema/article.schema";
import { Trans } from "react-i18next";
type ArticleContentProps = {
  article: ArticleType;
};
function ArticleContent({ article }: ArticleContentProps) {
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

  // 🧠 Split des paragraphes
  const paragraphs = article.descriptionKey ? article.descriptionKey : "";

  const getComponentArticle = () => {
    const articleComponentExists = article.componentKey !== null;
    if (articleComponentExists) {
      switch (article.componentKey) {
        case "APP_JBDB":
          return <MaJbdbHome category="nope" />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className="ml-2.5">
      {paragraphs &&
        paragraphs.split("\n").map((_, index) => (
          <div key={index} className="mb-2">
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
