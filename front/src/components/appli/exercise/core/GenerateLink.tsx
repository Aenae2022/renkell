import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { buttonStyle } from "@srcFront/librairies/buttonStyle";

function GenerateLink({ linkGenerated }: { linkGenerated: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyLink = async () => {
    await navigator.clipboard.writeText(linkGenerated);
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
      <p>Lien généré :</p>
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
  );
}

export default GenerateLink;
