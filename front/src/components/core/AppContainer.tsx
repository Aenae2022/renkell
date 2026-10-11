import { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Croix from "@pictures/exercice/faux.png"

type AppContainerProps = {
    children: ReactNode;
};

export default function AppContainer({ children }: AppContainerProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const returnTo = location.state?.returnTo;
    return (
        <div className="w-full relative">
            <img src={Croix} alt="close" className="absolute right-0 mt-2 mr-2 h-8" onClick={() => navigate(returnTo ?? "/")} />


            {children}
        </div>

    );
}