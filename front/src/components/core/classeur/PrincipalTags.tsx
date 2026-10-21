import { useTranslation } from "react-i18next";
import { tagStyles } from "./tagStyles";
import type { PrincipalTag } from "./types";

type PrincipalTagsProps = {
    tags: PrincipalTag[];
    activeTag: string;
    handleClickPrincipal: (tagid: string) => void;
};

export default function PrincipalTags({
    tags,
    activeTag,
    handleClickPrincipal,
}: PrincipalTagsProps) {
    const {t} = useTranslation()
    return (
        <div className="flex">
            {tags.map((tag) => {
                const isSelected = activeTag === tag.id;
                const style = tagStyles[tag.color];
                return (
                    <div
                        key={tag.id}
                        className="relative"
                    >
                        <button
                            key={tag.id}
                            type="button"
                            className={`
                                mr-1 px-2 py-1
                                min-w-20 min-h-5
                                rounded-t-lg
                                text-center
                                cursor-pointer
                                ${isSelected
                                        ? `${style.selected} font-bold border-t-2 border-x-2`
                                        : style.normal
                                    }
                            `}
                            onClick={() => handleClickPrincipal(tag.id)}
                        >
                            {t(tag.label)}
                        </button>
                        {isSelected && (
                            <div
                                className={`
                                absolute
                                left-0 right-0 -bottom-[10px]
                                mr-1 h-[10px]
                                border-x-2
                                ${style.extension}
                            `}
                            />
                        )}
                    </div> 
                )
            }

            )}
        </div>
    );
}