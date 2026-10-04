import { type ReactNode, useEffect, useState } from "react";
import PrincipalTags from "./PrincipalTags";
import type { PrincipalTag, SecondaryTag } from "./types";
import SecondaryTags from "./SecondaryTags";
import CarnetSpiraleMini from "@pictures/fond/CarnetSpiraleMini.jpg";
import CarnetSpiraleFond from "@pictures/fond/CarnetSpiraleFond.jpg";

type ClasseurProps = {
    principalTags: PrincipalTag[];
    secondaryTags: SecondaryTag[];
    children: (
        principalTag: string,
        secondaryTag: string,
    ) => ReactNode;
};

export default function Classeur({ principalTags, secondaryTags, children }: ClasseurProps) {
    const [principalTag, setPrincipalTag] = useState(principalTags[0]?.id ?? "");
    const [secondaryTag, setSecondaryTag] = useState("");

    useEffect(() => {
        const storedPrincipalTag = sessionStorage.getItem("principalTag");
        if (storedPrincipalTag !== null) {
            setPrincipalTag(storedPrincipalTag);
        }
        const storedSecondaryTag = sessionStorage.getItem('secondaryTag')
         if (storedSecondaryTag !== null) {
            setSecondaryTag(storedSecondaryTag);
        }
    }, []);

    const handleClickPrincipal = (tagid: string) => {
        setPrincipalTag(tagid)
        setSecondaryTag("")
        sessionStorage.setItem("principalTag",tagid)
        sessionStorage.removeItem("secondaryTag");
    }

    const handleClickSecondary = (tagId: string) => {
        setSecondaryTag(tagId);
        sessionStorage.setItem("secondaryTag",tagId)
    };

    return (
        <div className="w-full">
            <PrincipalTags
                tags={principalTags}
                activeTag={principalTag}
                handleClickPrincipal={handleClickPrincipal}
            />

            <div className="flex">
                <main className="min-h-[300px] w-full pl-20 pr-3 py-5"
                    style={{
                        backgroundImage: `url(${CarnetSpiraleMini}), url(${CarnetSpiraleFond})`,
                        backgroundRepeat: "repeat-y, repeat",
                        backgroundPosition: "top left, top left",
                    }}>
                    {children(principalTag, secondaryTag)}
                </main>
                <SecondaryTags
                    tags={secondaryTags}
                    principalTag={principalTag}
                    activeTag={secondaryTag}
                    handleClickSecondary={handleClickSecondary}
                />

            </div>



        </div>
    );
}