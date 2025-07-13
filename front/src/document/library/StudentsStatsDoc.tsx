import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import type {
  PeriodType,
  StudentStatsType,
} from "@shared/schema/library.schema";
import logo from "@pictures/icons/lecture.png";

type ColumnPage = {
  left: StudentStatsType[];
  right: StudentStatsType[];
};
// Create styles
const styles = StyleSheet.create({
  page: {},
  columnsContainer: { display: "flex", flexDirection: "row" },
  column: { width: "50%", paddingHorizontal: 5 },
  section1: {
    marginTop: 10,
    padding: 10,
    border: "1px dashed black",
  },
  section2: {
    display: "flex",
    flexDirection: "row",
  },
  section3: {
    textAlign: "center",
    marginLeft: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  titre: {
    fontSize: 18,
  },
  name: {
    fontSize: 14,
  },
  description: { fontSize: 12 },
  book: { fontSize: 12, marginTop: 10 },
});

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // mois = 0-indexé
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const estimateHeight = (livresArray: string[]) => 95 + livresArray.length * 5;

const distributeByHeight = (
  data: StudentStatsType[],
  maxHeight = 500
): ColumnPage[] => {
  const pages: ColumnPage[] = [];
  let currentPage: ColumnPage = { left: [], right: [] };
  let leftHeight = 0;
  let rightHeight = 0;

  for (const student of data) {
    const h = estimateHeight(
      student.nbDistinctReaded.concerned.split(",").map((livre) => livre.trim())
    );

    if (leftHeight + h <= maxHeight) {
      currentPage.left.push(student);
      leftHeight += h;
    } else if (rightHeight + h <= maxHeight) {
      currentPage.right.push(student);
      rightHeight += h;
    } else {
      // Page pleine, on commence une nouvelle
      pages.push(currentPage);
      currentPage = { left: [student], right: [] };
      leftHeight = h;
      rightHeight = 0;
    }
  }

  pages.push(currentPage); // dernière page
  return pages;
};
// Create Document Component
export const StudentsStatsDoc = ({
  studentsDatas,
  period,
}: {
  studentsDatas: StudentStatsType[];
  period: PeriodType;
}) => {
  const pages = distributeByHeight(studentsDatas);

  return (
    <Document>
      {pages.map((page, index) => (
        <Page key={index} size="A4" orientation="landscape" style={styles.page}>
          <View style={styles.columnsContainer}>
            <View style={styles.column}>
              {page.left.map((student) => renderStudentBlock(student, period))}
            </View>
            <View style={styles.column}>
              {page.right.map((student) => renderStudentBlock(student, period))}
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
};

const renderStudentBlock = (student: StudentStatsType, period: PeriodType) => {
  const livresArray = student.nbDistinctReaded.concerned
    .split(",")
    .map((livre) => livre.trim());
  const dateStart = formatDate(period.periodStart.toString());
  const dateEnd = formatDate(period.periodEnd.toString());
  return (
    <View key={student.userId} style={styles.section1} wrap={false}>
      <View style={styles.section2}>
        <Image style={styles.logo} src={logo} />
        <View style={styles.section3}>
          <Text style={styles.titre}>Lecture autonome</Text>
          <Text
            style={styles.name}
          >{`${student.userFirstName} ${student.userFamilyName}`}</Text>
          <Text
            style={styles.description}
          >{`${period.periodName} : du ${dateStart} au ${dateEnd}`}</Text>
        </View>
      </View>
      {livresArray.map((livre, idx) => (
        <Text key={idx} style={styles.book}>
          • {livre}
        </Text>
      ))}
    </View>
  );
  // return (
  // <Document>
  //   <Page size="A4" orientation="portrait" style={styles.page}>
  //     {studentsDatas.map((student) => {
  //       const livresArray = student.nbDistinctReaded.concerned
  //         .split(",")
  //         .map((livre) => livre.trim());

  //       const dateStart = formatDate(period.periodStart.toString());
  //       const dateEnd = formatDate(period.periodEnd.toString());

  //       return (
  //         <View key={student.userId} style={styles.section1}>
  //           <View style={styles.section2}>
  //             <Image style={styles.logo} src={logo} />
  //             <View style={styles.section3}>
  //               <Text style={styles.titre}>Lecture autonome</Text>
  //               <Text
  //                 style={styles.name}
  //               >{`${student.userFirstName}  ${student.userFamilyName}`}</Text>
  //               <Text
  //                 style={styles.description}
  //               >{`${period.periodName} : du ${dateStart} au ${dateEnd}`}</Text>
  //             </View>
  //           </View>
  //           {livresArray.map((livre, idx) => {
  //             return (
  //               <Text key={idx} style={styles.book}>
  //                 • {livre}
  //               </Text>
  //             );
  //           })}
  //         </View>
  //       );
  //     })}
  //   </Page>
  // </Document>
};

export default StudentsStatsDoc;
