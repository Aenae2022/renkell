import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type NameDialogProps = {
  open: boolean;
  onSubmit: (name: string) => void;
  onCancel?: () => void;
  title?: string;
  error?: string;
};

function NameDialog({
  open,
  onSubmit,
  onCancel,
  title = "main.nameDialog.question",
  error = "",
}: NameDialogProps) {
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(open);
  const { t } = useTranslation();
  // gestion animation fermeture
  useEffect(() => {
    if (open) {
      setVisible(true);
      setName("");
    } else {
      setTimeout(() => setVisible(false), 200);
    }
  }, [open]);

  const handleSubmit = () => {
    onSubmit(name.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape" && onCancel) onCancel();
  };

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        transition-opacity duration-200
        ${open ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        className={`
          w-[340px] rounded-2xl bg-white p-6 shadow-xl
          transform transition-all duration-200
          ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}
        `}
      >
        {/* 🎓 Titre */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          {t(title)}
        </h2>

        {/* ✏️ Input */}
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ex: Alex"
          className={`
            w-full rounded-lg border px-3 py-2 text-sm
            focus:outline-none focus:ring-2
            transition
            ${
              error
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            }
          `}
        />

        {/* ⚠️ Erreur */}
        <div className="h-5 mt-1 text-xs text-red-500">{t(error)}</div>

        {/* 🎯 Actions */}
        <div className="flex justify-end gap-2 mt-4">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              {t("main.cancel")}
            </button>
          )}

          <button
            onClick={handleSubmit}
            className="
              px-4 py-1.5 text-sm rounded-lg
              bg-conjugaison text-white
              hover:bg-conjugaison-dark
              active:scale-95
              transition
            "
          >
            {t("main.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
export default NameDialog;
