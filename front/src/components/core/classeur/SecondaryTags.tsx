import { useTranslation } from "react-i18next";
import type { SecondaryTag } from "./types";
import { tagStyles } from "./tagStyles";

type SecondaryTagsProps = {
  tags: SecondaryTag[];
  principalTag: string;
  activeTag: string;
  handleClickSecondary: (tagId: string) => void;
};

export default function SecondaryTags({
  tags,
  principalTag,
  activeTag,
  handleClickSecondary,
}: SecondaryTagsProps) {
  const { t } = useTranslation();

  const visibleTags = tags.filter(
    (tag) => tag.parentId === principalTag,
  );

  return (
    <div className="flex flex-col pt-5">
      {visibleTags.map((tag) => {
        const isSelected = activeTag === tag.id;
        const style = tagStyles[tag.color];

        return (
          <div
            key={tag.id}
            className="relative"
          >
            <button
              type="button"
              className={`
                mr-2 mb-1 px-2 py-1
                min-h-20
                rounded-r-lg
                text-center
                cursor-pointer
                ${
                  isSelected
                    ? `${style.selected} font-bold border-y-2 border-r-2`
                    : style.normal
                }
              `}
              onClick={() => handleClickSecondary(tag.id)}
            >
              {t(tag.label)}
            </button>

            {isSelected && (
              <div
                className={`
                  absolute
                  -left-[10px] top-0 bottom-1
                  w-[10px]
                  border-y-2
                  ${style.extension}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}