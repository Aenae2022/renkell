import Articles from "@components/blog/Articles";
import Classeur from "@components/core/classeur/Classeur";
import type { PrincipalTag, SecondaryTag } from "@components/core/classeur/types";
import Loader from "@components/core/Loader";
import { useLocation } from "react-router-dom";

const principalTags: PrincipalTag[] = [
    {
        id: "blog",
        label: "article.pTag.blog",
        color: "orthographe",
    },
    {
        id: "langue",
        label: "article.pTag.langue",
        color: "francais",
    },
    {
        id: "mathematiques",
        label: "article.pTag.maths",
        color: "mathematiques",
    },
    {
        id: "art",
        label: "article.pTag.art",
        color: "grammaire",
    },
];

const secondaryTags: SecondaryTag[] = [
    {
        id: "calculmental",
        label: "main.calculmental",
        parentId: "mathematiques",
        color: "calculmental",
    },
    {
        id: "nombre",
        label: "main.nombre",
        parentId: "mathematiques",
        color: "nombre",
    },
    {
        id: "lexique",
        label: "article.sTag.lexique",
        parentId: "langue",
        color: "lexique",
    },
];



export default function Home() {
    const location = useLocation();
    const restoreSession = location.state?.restoreClasseur === true;
    return (
        <Classeur principalTags={principalTags} secondaryTags={secondaryTags} restoreSession={restoreSession}>
            {(principal, secondary) => {
                if (principal === "mathematiques" && secondary === "calculmental") {
                    return (
                        <Articles
                            principalTagActivated={principal}
                            secondaryTagActivated={secondary}
                        />
                    )
                }

                if (principal === "mathematiques" && secondary === "nombre") {
                    return <Loader />;
                }

                return (
                    <Articles
                        principalTagActivated={principal}
                        secondaryTagActivated={secondary}
                    />
                );
            }}
        </Classeur>
    );
}