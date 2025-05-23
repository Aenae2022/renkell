import { type LinkShortType } from "@shared/schema/link.schema";

function LinkItem({
  link,
  actualLng,
  handleClick,
}: {
  link: LinkShortType;
  actualLng: string | undefined;
  handleClick: (redirection: string) => void;
}) {
  let titleLinkButton = "";
  switch (actualLng) {
    case "fr":
      titleLinkButton =
        link.linkTitleFr !== "" ? link.linkTitleFr : link.linkTitleBr;
      break;
    case "br":
      titleLinkButton =
        link.linkTitleBr !== "" ? link.linkTitleBr : link.linkTitleFr;
      break;
    default:
      titleLinkButton = link.linkTitleFr;
      break;
  }
  return (
    <div
      className={`flex flex-col justify-end items-center
            w-32 h-32 m-5 bg-amber-100 cursor-pointer pt-2 px-2
            align-text-bottom text-m text-black
            border-r-4 border-b-4 border-gray-700 rounded-[10px] 
            `}
    >
      <div className="flex-1 flex items-center justify-center overflow-hidden">
        <img
          className="w-full h-full object-contain rounded-xl"
          alt="logoSite"
          src={`/src/assets/pictures/lienSite/${link.linkIcon}`}
          onClick={() => handleClick(link.linkRedirection)}
        />
      </div>
      <p className="text-center px-1 text-sm whitespace-pre-wrap">
        {titleLinkButton}
      </p>
    </div>
  );
}

export default LinkItem;
