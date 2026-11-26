import { type ReactNode } from "react";
import CarnetSpiraleMini from "@pictures/fond/CarnetSpiraleMini.jpg";
import CarnetSpiraleFond from "@pictures/fond/CarnetSpiraleFond.jpg";

type FeuilleClasseurProps = {
    children: ReactNode;
};

export default function FeuilleClasseur({ children }: FeuilleClasseurProps) {
    
    return (
        <div className="flex">
            <main className="min-h-[300px] w-full pl-20 pr-3 py-5"
                style={{
                    backgroundImage: `url(${CarnetSpiraleMini}), url(${CarnetSpiraleFond})`,
                    backgroundRepeat: "repeat-y, repeat",
                    backgroundPosition: "top left, top left",
                }}>
                {children}
            </main>
        </div>
    );
}