type GeneralcategoryProps = {
  champ: string;
  titleCategory: string;
  datas: {
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
      calculAGenerer: () => void;
    }[];
  }[];
  couleur: string;
};

import MaJbdbExerciceBouton from "./MaJbdbExerciceBouton";
import { useTranslation } from "react-i18next";
export function MaJbdbCategory({
  titleCategory,
  datas,
  couleur,
}: GeneralcategoryProps) {
  const subCategories = [...new Set(datas.map((exo) => exo.subCategory))];
  const { t } = useTranslation();
  return (
    <fieldset
      className={`pt-1 ml-2 pl-4 border-2 border-${couleur}-dark bg-white/60`}
    >
      <legend
        className={`text-${couleur}-dark font-bold bg-${couleur}-light/50`}
      >
        {titleCategory}
      </legend>
      <ul className="list-disc pl-2">
        {subCategories.map((subCategory, index) => {
          const subCategoryDatas = datas.filter(
            (exo) => exo.subCategory === subCategory,
          )[0].exercises;
          const subCategoryName = t("jbdb.home.subCategories." + subCategory);
          return (
            <li key={`${subCategory}-${index}`}>
              <p className="mt-1 mb-1">{subCategoryName}</p>
              <MaJbdbExerciceBouton
                couleur={couleur}
                datas={subCategoryDatas}
              />
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

export default MaJbdbCategory;
