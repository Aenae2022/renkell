import LinkItem from "@components/core/LinkItem";
import type {ResultatTeacher } from "@hook/degemer.type";
import i18n from "@srcFront/i18n";


export function DegemerTeacherView({ datas }: { datas: ResultatTeacher }) {
    const actualLng = i18n.resolvedLanguage;

    const handleClickLink = (redirection: string) => {
        window.open(redirection, "_blank", "noreferrer");
    };

    return <div className="flex flex-wrap justify-around ">
          {datas.teacherDatas.userLinks.map((link) => {
            return (
              <LinkItem
                key={link.link.linkId}
                link={link.link}
                actualLng={actualLng}
                handleClick={handleClickLink}
              />
            );
          })}
        </div>
}