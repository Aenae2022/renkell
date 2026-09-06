import { Utilitaires } from "@utils/Utilitaires";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import type {
  ExerciseGenerique,
  ExerciseGeneriqueItem,
} from "@srcFront/features/exercises/core/exerciseGenerique.type";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
    color: "",
  },
  section1: {
    position: "relative", // IMPORTANT
    alignItems: "center",
    justifyContent: "center",
  },
  section3: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  textNom: {
    fontSize: 14,
    color: "#4f39f6",
    marginBottom: 4,
  },
  textDate: {
    fontSize: 14, // text-sm
    color: "#4f39f6", // gray-500
    textDecoration: "underline",
  },
  logo: {
    width: 50,
  },
  scoreOverlay: {
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
  },
  col: {
    width: "40%",
  },
  row: {
    flexDirection: "row",
    borderBottom: "1 solid #e5e7eb",
    paddingVertical: 4,
  },
  cel1: {
    backgroundColor: "#525252",
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 11,
  },
  cel2: {
    fontSize: 11,
    paddingHorizontal: 3,
  },
  cel3: {
    fontSize: 10,
    paddingHorizontal: 5,
    textAlign: "left",
  },
  textCel3: {
    fontSize: 8,
    fontStyle: "italic",
  },
});

type ExerciseGeneriqueResultPrintProps = {
  name: string;
  sourceLogo: string;
  monScore: number;
  tableau1: ExerciseGeneriqueItem[];
  tableau2: ExerciseGeneriqueItem[];
  indiceTableau2: number;
  eltPush: number[];
  exercise: ExerciseGenerique;
  scoreColor: { color: string };
  scoreLogo: string;
};

export function ExerciseGeneriqueResultPrint({
  name,
  monScore,
  tableau1,
  tableau2,
  indiceTableau2,
  scoreColor,
  scoreLogo,
}: ExerciseGeneriqueResultPrintProps) {
  const language = localStorage.getItem("i18nextLng") === "fr" ? "fr" : "br";
  const moment = Utilitaires.getCurrentMoment();
  const date = language === "fr" ? moment.dateFr : moment.dateBr;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.textNom}>{name}</Text>
          <Text style={styles.textDate}>{date}</Text>
        </View>
        <View style={styles.section1}>
          <Image style={styles.logo} src={scoreLogo} />
          <View style={styles.scoreOverlay}>
            <Text style={scoreColor}>{monScore}</Text>
          </View>
        </View>
        <View style={styles.section3}>
          <View style={styles.col}>
            {tableau1.map((item, indice) => renderCorrection(item, indice, 0))}
          </View>
          <View style={styles.col}>
            {tableau2.map((item, indice) =>
              renderCorrection(item, indice, indiceTableau2),
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const renderCorrection = (
  item: ExerciseGeneriqueItem,
  indice: EntierPositifType,
  count: EntierPositifType,
) => {
  const counter = count + indice + 1;

  const getReponseStyle = (validation: boolean) => ({
    color: validation
      ? "#22c55e" // vert
      : "#ef4444", // rouge
  });

  const reponses = item.reponse.map((reponse, index) => {
    let textReponse = "";
    let validation = item.isCorrect;
    if (index > 1) {
      textReponse = " / ";
    }
    //mettre en rouge les réponse eronées
    if (validation && index < item.reponse.length - 1) {
      validation = false;
    }

    textReponse += reponse;

    return (
      <Text
        style={getReponseStyle(validation)}
        key={`${validation ? "valid" : "unvalid"}-${indice}-${index}`}
      >
        {textReponse}
      </Text>
    );
  });

  const resultats = item.correction.model;

  return (
    <View style={styles.row} key={`correction-${indice}`}>
      {/*le compteur de l'exercice*/}
      <Text style={styles.cel1}>{counter}</Text>
      {/*//la question*/}
      <Text style={styles.cel2}>{item.question.model}</Text>
      <View style={styles.cel3}>
        {reponses}
        {!item.isCorrect && <Text style={styles.textCel3}>({resultats})</Text>}
      </View>
    </View>
  );
};

export default ExerciseGeneriqueResultPrint;
