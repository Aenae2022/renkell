import { Users } from "lucide-react"

 export default function ExerciseAssociationIcon({nbAssociated, handleClick }:{nbAssociated : number, handleClick : () => void;} ){
    return<div className="flex justify-center cursor-pointer" onClick={handleClick}>
            <Users  color={nbAssociated > 0 ? "#16a34a" : "#9ca3af"} />
            <p className="text-nombre">
                {nbAssociated > 0 ? `${nbAssociated}` : ""}
            </p>
        </div>
}
