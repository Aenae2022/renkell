import { useTranslation } from "react-i18next";
import TopStatsBox from "./TopStatsBox";
import type { BookStatType } from "@shared/schema/library.schema";
interface BooksStatsBoxProps {
  statsDatas: BookStatType[];
}

function BooksStatsBox({ statsDatas }: BooksStatsBoxProps) {
  const { t } = useTranslation();
  const borrowStatsDatas = topBorrowStats(statsDatas);
  const readStatsDatas = topReadStats(statsDatas);

  return (
    <div className="mt-4 w-full">
      <TopStatsBox
        myDatas={borrowStatsDatas.myDatas}
        topScore={borrowStatsDatas.topScore}
        title={t("library.statsBox.booksTopBorrowed")}
        typeTop="borrow"
      />
      <TopStatsBox
        myDatas={readStatsDatas.myDatas}
        topScore={readStatsDatas.topScore}
        title={t("library.statsBox.booksTopReaded")}
        typeTop="read"
      />
    </div>
  );
}

export default BooksStatsBox;

const topBorrowStats = (datas: BookStatType[]) => {
  const statsDatas = [...datas];
  //obtenir le top emprunt
  const borrowScore = [
    ...new Set(
      statsDatas.map((book) => book.statsBorrow.total).filter((nb) => nb !== 0) // Exclut les zéros
    ),
  ]
    .sort((a, b) => b - a)
    .slice(0, 3);

  const sortedArray = statsDatas.sort((a, b) => {
    // Trier par nbBorrow en ordre décroissant
    if (b.statsBorrow.total !== a.statsBorrow.total) {
      return b.statsBorrow.total - a.statsBorrow.total;
    }
    // Si nbBorrow est égal, trier les titres en ordre alphabétique croissant
    return a.bookTitle.localeCompare(b.bookTitle);
  });

  return { topScore: borrowScore, myDatas: sortedArray };
};

const topReadStats = (datas: BookStatType[]) => {
  const statsDatas = [...datas];

  //obtenir le top lecture
  const readScore = [
    ...new Set(
      statsDatas.map((book) => book.statsReaded.total).filter((nb) => nb !== 0) // Exclut les zéros
    ),
  ]
    .sort((a, b) => b - a)
    .slice(0, 3);

  const sortedArray = statsDatas.sort((a, b) => {
    // Trier par statsReaded en ordre décroissant
    if (b.statsReaded.total !== a.statsReaded.total) {
      return b.statsReaded.total - a.statsReaded.total;
    }
    // Si nbRead est égal, trier les titres en ordre alphabétique croissant
    return a.bookTitle.localeCompare(b.bookTitle);
  });
  return { topScore: readScore, myDatas: sortedArray };
};
