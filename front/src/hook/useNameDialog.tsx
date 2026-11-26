import { useState } from "react";
import NameDialog from "@components/core/NameDialog";
import { StringNameSchema } from "@shared/schema/fields/stringName.schema";

export function useNameDialog() {
  const [open, setOpen] = useState(false);
  const [resolver, setResolver] = useState<(value: string | null) => void>();
  const [error, setError] = useState("");
  const askName = () => {
    setOpen(true);
    return new Promise<string | null>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleSubmit = (name: string) => {
    const result = StringNameSchema.safeParse(name);

    if (!result.success) {
      setError("t(main.nameDialog.error)");
      return;
    }

    resolver?.(result.data);
    setError("");
    setOpen(false);
  };

  const handleCancel = () => {
    resolver?.(null);
    setOpen(false);
  };

  const dialog = (
    <NameDialog
      open={open}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      error={error}
    />
  );

  return { askName, dialog };
}
