import { useMemo } from "react";

type TabLabelProps = {
  label: string;
  maxLines?: number;
  className?: string;
};

function TabLabel({ label, maxLines = 2, className = "" }: TabLabelProps) {
  const isSingleWord = useMemo(() => !label.includes(" "), [label]);

  return (
    <span
      className={`block overflow-hidden min-w-0 ${className}`}
      title={label}
      style={
        isSingleWord
          ? {
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }
          : {
              display: "-webkit-box",
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }
      }
    >
      {label}
    </span>
  );
}

export default TabLabel;
