import { useTranslation } from "react-i18next";
import MajbdbCategory from "@components/appli/jbdb/MaJbdbCategory";
type CategoryContainerProps = {
  categories: string[];
  jbdbExosList: {
    category: string;
    subCategories: {
      subCategory: string;
      exercises: {
        exId: string;
        description: string;
        shortTitle: string;
        exampleQuestion: string;
        logo: string;
        duration: number;
        exerciseNumber: number;
        objectif: number;
        eca: number;
        calculAGenerer(): {
          question: string;
          resultats: {
            texte: string;
            valeurRep: number;
          }[];
        };
      }[];
    }[];
  }[];
  couleur: string;
};
function CategoryContainer({
  categories,
  jbdbExosList,
  couleur,
}: CategoryContainerProps) {
  const { t } = useTranslation();
  return (
    <div className={`bg-${couleur}-light/50`}>
      {categories.map((category, index) => {
        const categoryDatas = jbdbExosList.filter(
          (exo) => exo.category === category,
        )[0].subCategories;
        const categoryName = t("jbdb.home.categories." + category);
        return (
          <MajbdbCategory
            key={`${category}-${index}`}
            champ="add"
            titleCategory={categoryName}
            datas={categoryDatas}
            couleur={couleur}
          />
        );
      })}
    </div>
  );
}

export default CategoryContainer;
