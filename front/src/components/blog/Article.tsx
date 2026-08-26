import { useTranslation } from "react-i18next";
import type { ArticleType } from "@shared/schema/article.schema";
import ArticleContent from "./core/ArticleContent";
import { getAssetUrl } from "@utils/assetResolver";
type Props = {
  article: ArticleType;
};
function Article({ article }: Props) {
  //const de language
  const { t } = useTranslation();

  //const de style
  const fieldsetStyle = [
    "border-2",
    "mr-3.5",
    "mb-5",
    "rounded-xl",
    `border-${article.color}`,
    `bg-${article.color}/10`,
  ].join(" ");

  const titleArticleStyle = [
    "ml-2",
    "mr-3",
    "font-bold",
    `text-${article.color}`,
  ].join(" ");

  return (
    <fieldset className={fieldsetStyle}>
      <legend className="flex items-center">
        <img
          className="h-20 ml-1 rounded-full"
          src={getAssetUrl(`pictures/${article.logoSrc}`)}
          alt={article.logoAlt}
        />
        <p className={titleArticleStyle}>{t(article.titleKey)}</p>
      </legend>
      <div className="ml-2.5">
        <ArticleContent article={article} />
      </div>
    </fieldset>
  );
}

export default Article;
