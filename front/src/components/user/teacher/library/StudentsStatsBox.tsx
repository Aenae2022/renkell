import { useTranslation } from "react-i18next";
import TopStatsStudents from "./TopStatsStudents";
import type { StudentStatsType } from "@shared/schema/library.schema";

interface StudentsStatsBoxProps {
  statsDatas: StudentStatsType[];
}

function StudentsStatsBox({ statsDatas }: StudentsStatsBoxProps) {
  const { t } = useTranslation();
  const distinctReadStatsDatas = topDistinctStats(statsDatas);
  const readStatsDatas = topReadStats(statsDatas);
  const noReadStatsDatas = topNoReadStats(statsDatas);

  return (
    <div className="mt-4 w-full">
      <TopStatsStudents
        myDatas={readStatsDatas.myDatas}
        topScore={readStatsDatas.topScore}
        title={t("library.statsBox.topReaders")}
        typeTop="reader"
      />
      <TopStatsStudents
        myDatas={distinctReadStatsDatas.myDatas}
        topScore={distinctReadStatsDatas.topScore}
        title={t("library.statsBox.topDistinctReaders")}
        typeTop="distinctReader"
      />
      <TopStatsStudents
        myDatas={noReadStatsDatas.myDatas}
        topScore={noReadStatsDatas.topScore}
        title={t("library.statsBox.topNoReaders")}
        typeTop="noReader"
      />
    </div>
  );
}

export default StudentsStatsBox;

const topDistinctStats = (datas: StudentStatsType[]) => {
  const statsDatas = [...datas];
  //obtenir le top emprunt
  const distinctScore = [
    ...new Set(
      statsDatas
        .map((student) => student.nbDistinctReaded.total)
        .filter((nb) => nb !== 0) // Exclut les zéros
    ),
  ]
    .sort((a, b) => b - a)
    .slice(0, 3);

  const sortedArray = statsDatas.sort((a, b) => {
    // Trier par nbDistinctReaded en ordre décroissant
    if (b.nbDistinctReaded.total !== a.nbDistinctReaded.total) {
      return b.nbDistinctReaded.total - a.nbDistinctReaded.total;
    }
    // Trier par grade
    if (b.grade !== a.grade) {
      return a.grade.localeCompare(b.grade);
    }
    // tri par familyName
    if (b.userFamilyName !== a.userFamilyName) {
      return a.userFamilyName.localeCompare(b.userFamilyName);
    }

    //tri final par prénom
    return a.userFirstName.localeCompare(b.userFirstName);
  });

  return { topScore: distinctScore, myDatas: sortedArray };
};

const topReadStats = (datas: StudentStatsType[]) => {
  const statsDatas = [...datas];
  //obtenir le top emprunt
  const readScore = [
    ...new Set(
      statsDatas
        .map((student) => student.nbReaded.total)
        .filter((nb) => nb !== 0) // Exclut les zéros
    ),
  ]
    .sort((a, b) => b - a)
    .slice(0, 3);

  const sortedArray = statsDatas.sort((a, b) => {
    // Trier par nbRead en ordre décroissant
    if (b.nbReaded.total !== a.nbReaded.total) {
      return b.nbReaded.total - a.nbReaded.total;
    }
    // Trier par grade
    if (b.grade !== a.grade) {
      return a.grade.localeCompare(b.grade);
    }
    // tri par familyName
    if (b.userFamilyName !== a.userFamilyName) {
      return a.userFamilyName.localeCompare(b.userFamilyName);
    }

    //tri final par prénom
    return a.userFirstName.localeCompare(b.userFirstName);
  });

  return { topScore: readScore, myDatas: sortedArray };
};

const topNoReadStats = (datas: StudentStatsType[]) => {
  const statsDatas = [...datas];

  //obtenir le top emprunt
  const noReadScore = [
    ...new Set(
      statsDatas
        .map((student) => student.nbNoReaded.total)
        .filter((nb) => nb !== 0) // Exclut les zéros
    ),
  ]
    .sort((a, b) => b - a)
    .slice(0, 3);

  const sortedArray = statsDatas.sort((a, b) => {
    // Trier par nbRead en ordre décroissant
    if (b.nbNoReaded.total !== a.nbNoReaded.total) {
      return b.nbNoReaded.total - a.nbNoReaded.total;
    }
    // Trier par grade
    if (b.grade !== a.grade) {
      return a.grade.localeCompare(b.grade);
    }
    // tri par familyName
    if (b.userFamilyName !== a.userFamilyName) {
      return a.userFamilyName.localeCompare(b.userFamilyName);
    }

    //tri final par prénom
    return a.userFirstName.localeCompare(b.userFirstName);
  });
  return { topScore: noReadScore, myDatas: sortedArray };
};
