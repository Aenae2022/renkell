import { Utilitaires } from "@utils/Utilitaires";
import { useTranslation } from "react-i18next";
import laurierVert from "@pictures/exercice/laurierVert.png";
import laurierOrange from "@pictures/exercice/laurierOrange.png";
import laurierRouge from "@pictures/exercice/laurierRouge.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { EntierPositifType } from "@shared/schema/fields/entierPositif.schema";
import { Matematik } from "@utils/Matematik";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: "column",
  },
  section: {
    margin: 10,
    padding: 10,
    borderColor: "black",
  },
  section1: {
    marginTop: 12,
    position: "relative", // IMPORTANT
    alignItems: "center",
    justifyContent: "center",
  },
  section2: {
    marginBottom: 12,
    fontSize: 11,
    textAlign: "center",
  },
  section3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  textNom: {
    fontSize: 16, // text-lg
    fontWeight: "bold",
    marginBottom: 4, // mb-1 (≈ 4px)
  },
  textDate: {
    fontSize: 14, // text-sm
    color: "#4f39f6", // gray-500
    textDecoration: "underline",
    marginBottom: 4, // mb-1 (≈ 4px)
  },
  logo: {
    width: 96,
  },
  scoreOverlay: {
    position: "absolute",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
  },
  row: {
    flexDirection: "row",
    borderBottom: "1 solid #e5e7eb",
    paddingVertical: 4,
  },
  cel1: {
    backgroundColor: "#525252", // neutral-600
    paddingLeft: 4, // pl-1
    paddingRight: 4, // pr-1
    fontSize: 12, // text-xs
  },
  cel2: {
    fontSize: 11, // 0.8em ≈ 11px
    paddingHorizontal: 3,
  },
  cel3: {
    fontSize: 12, // 1.1em ≈ 15px
    paddingHorizontal: 5, // px-[5px]
    fontWeight: "bold", // font-bold
    textAlign: "left", // text-left
  },
  textCel3: {
    fontSize: 8,
    fontStyle: "italic",
    paddingLeft: 5,
  },
});

type MaJbdbResultPrintProps = {
  name: string;
  sourceLogo: string;
  monScore: number;
  minute: number;
  seconde: number;
  tableau1: {
    question: string;
    resultats: {
      texte: string;
      valeurRep: number;
    }[];
    reponses: (string | number)[][];
    indexCalcul: number;
    validation: boolean;
  }[];
  tableau2: {
    question: string;
    resultats: {
      texte: string;
      valeurRep: number;
    }[];
    reponses: (string | number)[][];
    indexCalcul: number;
    validation: boolean;
  }[];
  tableau3: {
    question: string;
    resultats: {
      texte: string;
      valeurRep: number;
    }[];
    reponses: (string | number)[][];
    indexCalcul: number;
    validation: boolean;
  }[];
  indiceTableau2: number;
  indiceTableau3: number;
  eltPush: number[];
  modele: {
    exId: string;
    description: string;
    shortTitle: string;
    logo: string;
    exampleQuestion: string;
    duration: number;
    exerciseNumber: number;
    objectif: number;
    eca: number;
    calculAGenerer: () => void;
  };
};

export function MaJbdbResultPrint({
  name,
  monScore,
  minute,
  seconde,
  tableau1,
  tableau2,
  tableau3,
  indiceTableau2,
  indiceTableau3,
  modele,
}: MaJbdbResultPrintProps) {
  const language = localStorage.getItem("i18nextLng") === "fr" ? "fr" : "br";
  const moment = Utilitaires.getCurrentMoment();
  const date = language === "fr" ? moment.dateFr : moment.dateBr;
  const { t } = useTranslation();

  // -------------------------------- STYLE --------------------------------------------------------

  const getScoreStyle = (score: number) => ({
    color:
      score >= modele.objectif
        ? "#22c55e" // vert
        : score >= modele.eca
          ? "#f59e0b" // orange
          : "#ef4444", // rouge
  });
  const getLaurierSource = (score: number) => {
    if (score >= modele.objectif) {
      return laurierVert;
    } else if (score >= modele.eca) {
      return laurierOrange;
    } else {
      return laurierRouge;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.textNom}>{name}</Text>
          <Text style={styles.textDate}>{date}</Text>
        </View>
        <View style={styles.section1}>
          <Image style={styles.logo} src={getLaurierSource(monScore)} />
          <View style={styles.scoreOverlay}>
            <Text style={getScoreStyle(monScore)}>{monScore}</Text>
          </View>
        </View>
        <View style={styles.section2}>
          <Text>
            {" "}
            {t("jbdb.exercise.timer")} {minute > 0 && `${minute} m`}{" "}
            {seconde > 0 && `${seconde} s`}
          </Text>
        </View>
        <View style={styles.section3}>
          <View>
            {tableau1.map((item, indice) => renderCorrection(item, indice, 0))}
          </View>
          <View>
            {tableau2.map((item, indice) =>
              renderCorrection(item, indice, indiceTableau2),
            )}
          </View>
          <View>
            {tableau3.map((item, indice) =>
              renderCorrection(item, indice, indiceTableau3),
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

const renderCorrection = (
  item: {
    question: string;
    resultats: {
      texte: string;
      valeurRep: number;
    }[];
    reponses: (string | number)[][];
    indexCalcul: number;
    validation: boolean;
  },
  indice: EntierPositifType,
  count: EntierPositifType,
) => {
  const counter = count + indice + 1;

  const getReponseStyle = (validation: boolean) => ({
    color: validation
      ? "#22c55e" // vert
      : "#ef4444", // rouge
  });

  const reponse = item.reponses.map((reponse, index) => {
    let textReponse = "";
    let validation = item.validation;
    if (index > 1) {
      textReponse = " / ";
    }
    //mettre en rouge les réponse eronées
    if (validation && index < item.reponses.length - 1) {
      validation = false;
    }
    reponse.map((rep, indice) => {
      const textAdd = item.resultats[indice].texte;
      textReponse += textAdd;
      textReponse +=
        typeof rep === "number"
          ? Matematik.ecrireNombreEnChiffreEspace(rep)
          : `${rep}   `;
      return textReponse;
    });

    return (
      <Text
        style={getReponseStyle(validation)}
        key={`${validation ? "valid" : "unvalid"}-${indice}`}
      >
        {textReponse}
      </Text>
    );
  });

  const resultats = item.resultats.map(
    (quest) =>
      `${quest.texte} ${Matematik.ecrireNombreEnChiffreEspace(quest.valeurRep)} `,
  );

  return (
    <View style={styles.row} key={`correction-${indice}`}>
      <Text style={styles.cel1}>{counter}</Text>
      <Text style={styles.cel2}>{item.question}</Text>
      <Text style={styles.cel3}>
        {reponse}
        {!item.validation && <Text style={styles.textCel3}>({resultats})</Text>}
      </Text>
    </View>
  );
};

export default MaJbdbResultPrint;
