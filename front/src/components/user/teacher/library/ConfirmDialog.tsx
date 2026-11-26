import type { PeriodType } from "@shared/schema/library.schema";
import React from "react";
import { useTranslation } from "react-i18next";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  period: PeriodType | null;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  period,
}) => {
  const { t } = useTranslation();
  if (!isOpen || period === null) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-center border-4 border-mesure-dark">
        <p className="mb-4 text-lg">{`${t("library.paramsBox.deleteConfirm")} ${
          period.periodName
        } ?`}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-mesure-light  hover:bg-mesure min-w-15 min-h-6.5 text-base rounded-full border-1 border-zinc-500 m-2.5 px-1.5"
          >
            {t("library.paramsBox.confirm")}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 min-w-15 min-h-6.5 text-base rounded-full border-1 border-zinc-500 m-2.5 px-1.5"
          >
            {t("library.paramsBox.abort")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
