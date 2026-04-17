import { useState } from "react";
import FlecheBas from "@pictures/icons/flecheBas.png";
import FlecheHaut from "@pictures/icons/flecheHaut.png";
import type { StudentStatsType } from "@shared/schema/library.schema";
function TopStatsStudents({
  myDatas,
  topScore,
  title,
  typeTop,
}: {
  myDatas: StudentStatsType[];
  topScore: number[];
  title: string;
  typeTop: string;
}) {
  const [showAll, setShowAll] = useState<boolean>(false);
  const toggleShowAll = () => setShowAll(!showAll);

  //const style
  const fieldsetStyle =
    "border-2 border-resolution-dark mb-2 px-2 py-1 bg-white max-w-full  rounded-md";
  const legendStyle =
    "border border-resolution rounded-2xl ml-3 p-2 text-base bg-resolution/25";
  const topStyleVariantsSelected = {
    first: "bg-amber-500",
    second: "bg-neutral-500",
    third: "bg-orange-800",
    default: "bg-white",
  } as const;
  const tableStyle =
    "max-w-[98%] table-auto rounded-lg bg-white ml-2 border-separate border-spacing-y-2";
  return (
    <fieldset className={fieldsetStyle}>
      <legend className={legendStyle}>{title}</legend>
      <div className="flex">
        <div
          className="w-4 bg-zinc-300 flex items-center justify-center rounded-full cursor-pointer"
          onClick={toggleShowAll}
        >
          <img
            src={showAll ? FlecheHaut : FlecheBas}
            className="w-4 h-4 block"
          />
        </div>
        <div className=" max-w-full w-full">
          <div className="max-h-[300px] overflow-y-auto ">
            <table className={tableStyle}>
              <tbody>
                {myDatas.map((student) => {
                  let nbTotal = 0;
                  let concerned = "";
                  switch (typeTop) {
                    case "reader":
                      nbTotal = student.nbReaded.total;
                      concerned = student.nbReaded.concerned;
                      break;
                    case "distinctReader":
                      nbTotal = student.nbDistinctReaded.total;
                      concerned = student.nbDistinctReaded.concerned;
                      break;
                    case "noReader":
                      nbTotal = student.nbNoReaded.total;
                      concerned = student.nbNoReaded.concerned;
                      break;
                    default:
                      break;
                  }
                  let topStyle =
                    topStyleVariantsSelected[
                      "default" as keyof typeof topStyleVariantsSelected
                    ];
                  if (nbTotal === topScore[0]) {
                    topStyle =
                      topStyleVariantsSelected[
                        "first" as keyof typeof topStyleVariantsSelected
                      ];
                  }
                  if (nbTotal === topScore[1]) {
                    topStyle =
                      topStyleVariantsSelected[
                        "second" as keyof typeof topStyleVariantsSelected
                      ];
                  }
                  if (nbTotal === topScore[2]) {
                    topStyle =
                      topStyleVariantsSelected[
                        "third" as keyof typeof topStyleVariantsSelected
                      ];
                  }

                  // Cacher les lignes "default" si showDefault est false
                  if (
                    topStyle === topStyleVariantsSelected["default"] &&
                    !showAll
                  ) {
                    return null;
                  }
                  return (
                    <tr key={student.userId}>
                      <td className={`${topStyle} w-5 text-center`}>
                        {nbTotal}
                      </td>
                      <td className="px-2 ">{`${student.userFirstName} ${student.userFamilyName}`}</td>
                      <td className="text-xs">{student.grade}</td>
                      <td className="text-xs">{concerned}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </fieldset>
  );
}

export default TopStatsStudents;
