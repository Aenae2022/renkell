import LinkItem from "@components/core/LinkItem";
import i18n from "@srcFront/i18n";
import { DegemerButtonGroups } from "./DegemerButtonGroups";
import type { ResultatClassroom } from "@hook/degemer.type";

export function DegemerClassroomView({ datas }: { datas: ResultatClassroom }) {
    const actualLng = i18n.resolvedLanguage;

    const handleClickLink = (redirection: string) => {
        window.open(redirection, "_blank", "noreferrer");
    };

    return <div className="flex flex-wrap justify-around ">
        {datas.classroom.group.groupLinks.map((link) => {
            return (
                <LinkItem
                    key={link.link.linkId}
                    link={link.link}
                    actualLng={actualLng}
                    handleClick={handleClickLink}
                />
            );
        })}
        {datas.addedGroupsDatas.map((addedGroup)=>{
            return(
            <DegemerButtonGroups datas={addedGroup} key={addedGroup.groupId}/>)
        })}

        
    </div>
}