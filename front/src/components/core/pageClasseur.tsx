import { type ReactNode } from "react";
import CarnetSpiraleMini from "@pictures/fond/CarnetSpiraleMini.jpg";
import CarnetSpiraleFond from "@pictures/fond/CarnetSpiraleFond.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Croix from "@pictures/exercice/faux.png"

type FeuilleClasseurProps = {
    children: ReactNode;
};

export default function FeuilleClasseur({ children}: FeuilleClasseurProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const returnTo = location.state?.returnTo;
    return (
        <div className="w-full relative">
            <img src={Croix} alt="close" className="absolute right-0 mt-2 mr-2 h-8" onClick={() => navigate(returnTo ?? "/")}/>
            
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
        </div>
    );
}