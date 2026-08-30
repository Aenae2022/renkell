import { jbdbExosList } from "@components/appli/jbdb/jbdbExosList";
import { useTranslation } from "react-i18next";
import diviserLogo from "@pictures/exercice/calcul/diviser.png";
import multiplierLogo from "@pictures/exercice/calcul/multiplier.png";
import additionnerLogo from "@pictures/exercice/calcul/additionner.png";
import soustraireLogo from "@pictures/exercice/calcul/soustraire.png";
import { useState } from "react";
import CategoryContainer from "@components/appli/jbdb/CategoryContainer";

function MaJbdbHome({ category }: { category: string }) {
  //const de language
  const { t } = useTranslation();
  const jbdbHomeAddTitle = t("jbdb.home.domaines.add");
  const jbdbHomeMultiTitle = t("jbdb.home.domaines.multi");
  const jbdbHomeMaterTitle = t("jbdb.home.domaines.mater");
const [categoryToShow, setCategoryToShow] = useState(category);

  //obtenir les exercices du champ Sammañ ha dilemel
  const jbdbExosListAdd = jbdbExosList.filter(
    (exo) => exo.champs === "Sammañ ha dilemel",
  )[0].categories;
  //lister les catégories du champ Sammañ ha dilemel
  const categoriesAdd = [
    ...new Set(jbdbExosListAdd.map((exo) => exo.category)),
  ];
  //obtenir les exercices du champ Liesaat ha rannañ
  const jbdbExosListMulti = jbdbExosList.filter(
    (exo) => exo.champs === "Liesaat ha rannañ",
  )[0].categories;
  const categoriesMulti = [
    ...new Set(jbdbExosListMulti.map((exo) => exo.category)),
  ];
  //obtenir les exercices du champ Liesaat ha rannañ
  const jbdbExosListMater = jbdbExosList.filter(
    (exo) => exo.champs === "Mat er",
  )[0].categories;
  const categoriesMater = [
    ...new Set(jbdbExosListMater.map((exo) => exo.category)),
  ];

  let myCategoryContainer = null;
  if (categoryToShow === "add") {
    myCategoryContainer = (
      <CategoryContainer
        categories={categoriesAdd}
        jbdbExosList={jbdbExosListAdd}
        couleur="calculmental"
      />
    );
  }
  if (categoryToShow === "multi") {
    myCategoryContainer = (
      <CategoryContainer
        categories={categoriesMulti}
        jbdbExosList={jbdbExosListMulti}
        couleur="calcul"
      />
    );
  }
  if (categoryToShow === "mater") {
    myCategoryContainer = (
      <CategoryContainer
        categories={categoriesMater}
        jbdbExosList={jbdbExosListMater}
        couleur="geometrie"
      />
    );
  }

  //const de style
  const isSelectedAdd = categoryToShow === "add" ? true : false;
  const isSelectedMulti = categoryToShow === "multi" ? true : false;
  const isSelectedMater = categoryToShow === "mater" ? true : false;
  const champsAddStyleVariantsSelected = {
    unselected:
      "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-calculmental-light",
    selected:
      "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-calculmental font-bold ring-2 ring-gray-500",
  } as const;
  const champsAddStyle = isSelectedAdd
    ? champsAddStyleVariantsSelected[
        "selected" as keyof typeof champsAddStyleVariantsSelected
      ]
    : champsAddStyleVariantsSelected[
        "unselected" as keyof typeof champsAddStyleVariantsSelected
      ];
  const champsMultiStyleVariantsSelected = {
    unselected:
      "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-calcul-light",
    selected:
      "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-calcul font-bold ring-2 ring-gray-500",
  } as const;
  const champsMultiStyle = isSelectedMulti
    ? champsMultiStyleVariantsSelected[
        "selected" as keyof typeof champsMultiStyleVariantsSelected
      ]
    : champsMultiStyleVariantsSelected[
        "unselected" as keyof typeof champsMultiStyleVariantsSelected
      ];
  const champsMaterStyleVariantsSelected = {
    unselected:
      "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-geometrie-light",
    selected:
      "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-geometrie font-bold ring-2 ring-gray-500",
  } as const;
  const champsMaterStyle = isSelectedMater
    ? champsMaterStyleVariantsSelected[
        "selected" as keyof typeof champsMaterStyleVariantsSelected
      ]
    : champsMaterStyleVariantsSelected[
        "unselected" as keyof typeof champsMaterStyleVariantsSelected
      ];
  const logoChampStyle = "w-8 ml-2";

  return (
    <>
      <div className="flex">
        <div
          className={champsAddStyle}
          onClick={() => setCategoryToShow("add")}
        >
          {jbdbHomeAddTitle}
          <img className={logoChampStyle} src={additionnerLogo} alt="plus" />
          <img className={logoChampStyle} src={soustraireLogo} alt="moins" />
        </div>
        <div
          className={champsMultiStyle}
          onClick={() => setCategoryToShow("multi")}
        >
          {jbdbHomeMultiTitle}
          <img className={logoChampStyle} src={multiplierLogo} alt="fois" />
          <img className={logoChampStyle} src={diviserLogo} alt="divisé" />
        </div>
        <div
          className={champsMaterStyle}
          onClick={() => setCategoryToShow("mater")}
        >
          {jbdbHomeMaterTitle}
        </div>
      </div>

      {myCategoryContainer}
    </>
  );
}

export default MaJbdbHome;
