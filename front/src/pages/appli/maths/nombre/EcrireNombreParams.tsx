import ExerciseGeneriqueParams from "@components/appli/exercise/core/ExerciseGeneriqueParams";
import EcrireNombreParamsExercises from "@components/appli/exercise/nombre/ecrireNombre/EcrireNombreParamsExercises";
import { buttonStyle } from "@srcFront/librairies/buttonStyle";
import { useEcrireNombreParams } from "@srcFront/features/exercises/maths/nombre/ecrireNombre/useEcrireNombreParams";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

function EcrireNombreParams() {
  const {
    paramsGenerique,
    paramsExercise,
    dispatchGenerique,
    dispatchExercise,
  } = useEcrireNombreParams();
  //const qrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  //const getCanvas = () => qrRef.current?.querySelector("canvas") ?? null;

  const handleCreateLink = () => {
    const url = new URL(window.location.href);

    // Remplace le dernier segment
    url.pathname = url.pathname.replace(/\/ecrireparams$/, "/ex/ecrire");

    const params = [
      {
        key: "le",
        param: paramsGenerique.refLecon,
      },
      {
        key: "nbEx",
        param: paramsGenerique.nbExercice,
      },
      {
        key: "nbRp",
        param: paramsGenerique.nbReponse,
      },
      {
        key: "nbA",
        param: paramsGenerique.acquis,
      },
      {
        key: "nbPa",
        param: paramsGenerique.eca,
      },
      // {
      //   key: "nbMin",
      //   param: paramsExercise.nbMin,
      // },
      // {
      //   key: "nbMax",
      //   param: paramsExercise.nbMax,
      // },
      // {
      //   key: "tLg",
      //   param: paramsExercise.typeLangue,
      // },
      // {
      //   key: "tQu",
      //   param: paramsExercise.typeQuestion,
      // },
    ];

    const searchParams = new URLSearchParams();

    params.forEach(({ key, param }) => {
      if (
        param.isValid &&
        // param.valeur !== "" &&
        // param.valeur !== param.default
        param.saisie !== param.default
      ) {
        searchParams.append(key, param.saisie);
      }
    });

    // Ajoute les paramètres
    url.search = searchParams.toString();

    const lien = url.toString();
    console.log("paramsDirection", lien);
    dispatchGenerique({ type: "SET_LINKGENERATED", value: lien });
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(paramsGenerique.linkGenerated);
  };

  const downloadQr = () => {
    //const canvas = getCanvas();
    if (!canvasRef.current) return;

    const a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = "qrcode.png";
    a.click();
  };

  const copyQr = async () => {
    //const canvas = getCanvas();
    if (!canvasRef.current) return;

    const blob = await new Promise<Blob | null>((resolve) =>
      canvasRef.current?.toBlob(resolve, "image/png"),
    );

    if (!blob) return;

    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": blob,
      }),
    ]);
  };

  return (
    <>
      {paramsGenerique.linkGenerated !== "" && (
        <div className="bg-nombre-light border-2 border-nombre-dark mb-4 px-2">
          <p>Lien généré :</p>
          <div //div contenant le QR code, positionné hors de l'écran pour ne pas être visible
            style={{
              position: "absolute",
              left: "-10000px",
              top: "-10000px",
            }}
          >
            <QRCodeCanvas
              ref={canvasRef}
              value={paramsGenerique.linkGenerated}
              size={50}
            />
          </div>
          <div className="flex items-center justify-around text-base">
            <button className={`${buttonStyle} mr-4 mb-4`} onClick={copyLink}>
              Copier le lien
            </button>

            <button className={`${buttonStyle} mr-4 mb-4`} onClick={downloadQr}>
              Télécharger le QR Code
            </button>

            <button className={`${buttonStyle} mr-4 mb-4`} onClick={copyQr}>
              Copier le QR Code
            </button>
          </div>
        </div>
      )}
      <div>
        <button
          className={`${buttonStyle} mr-4 mb-4`}
          onClick={() => {
            //dispatchGenerique({ type: "RESET" });
            //dispatchExercise({ type: "RESET" });
          }}
        >
          Réinitialiser les paramètres
        </button>
        <button
          //type="button"
          className={`${buttonStyle} mb-4`}
          onClick={handleCreateLink}
        >
          Générer le lien
        </button>
      </div>
      <ExerciseGeneriqueParams
        paramsGenerique={paramsGenerique}
        dispatchGenerique={dispatchGenerique}
        domaine="nombre"
      />
      <EcrireNombreParamsExercises
        paramsExercise={paramsExercise}
        dispatchExercise={dispatchExercise}
      />
    </>
  );
}

export default EcrireNombreParams;
