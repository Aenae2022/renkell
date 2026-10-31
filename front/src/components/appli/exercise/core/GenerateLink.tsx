import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { buttonStyle } from "@srcFront/librairies/buttonStyle";
import { useTranslation } from "react-i18next";

function GenerateLink({ linkGenerated }: { linkGenerated: string }) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyLink = async () => {
    await navigator.clipboard.writeText(linkGenerated);
  };

  const goLink = () => {
    window.open(linkGenerated, "_blank");
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
    <div className="bg-nombre-light border-2 border-nombre-dark mb-4 px-2">
      <p>{t("applies.generique.generatedLink")}</p>
      <div //div contenant le QR code, positionné hors de l'écran pour ne pas être visible
        style={{
          position: "absolute",
          left: "-10000px",
          top: "-10000px",
        }}
      >
        <QRCodeCanvas ref={canvasRef} value={linkGenerated} size={50} />
      </div>
      <div className="flex items-center justify-around text-base">
        <button className={`${buttonStyle} mr-4 mb-4`} onClick={goLink}>
          {t("applies.generique.goLink")}
        </button>

        <button className={`${buttonStyle} mr-4 mb-4`} onClick={copyLink}>
          {t("applies.generique.copyLink")}
        </button>

        <button className={`${buttonStyle} mr-4 mb-4`} onClick={downloadQr}>
          {t("applies.generique.downloadQr")}
        </button>

        <button className={`${buttonStyle} mr-4 mb-4`} onClick={copyQr}>
          {t("applies.generique.copyQr")}
        </button>
      </div>
    </div>
  );
}

export default GenerateLink;
