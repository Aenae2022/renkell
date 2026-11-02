import LinkItem from "@components/core/LinkItem";
import i18n from "@srcFront/i18n";
import type { ResultatGroup } from "@hook/degemer.type";
import LinkExerciseItem from "@components/core/LinkExerciseItem";

export function DegemerGroupView({ datas }: { datas: ResultatGroup }) {
    const actualLng = i18n.resolvedLanguage;

    const handleClickLink = (redirection: string) => {
        window.open(redirection, "_blank", "noreferrer");
    };

    return <div className="flex flex-wrap justify-around ">
        {datas.groupWithLinks.groupLinks.map((link) => {
            return (
                <LinkItem
                    key={link.link.linkId}
                    link={link.link}
                    actualLng={actualLng}
                    handleClick={handleClickLink}
                />
            );
        })}
        {datas.groupExerciseLinks.map((link)=>{
            return (
                <LinkExerciseItem
                    key={link.linkId}
                    link={link}
                    actualLng={actualLng}
                    handleClick={handleClickLink}
                />
            );
        })}
    </div>
}