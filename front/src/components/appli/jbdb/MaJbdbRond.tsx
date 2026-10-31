type GeneralRondsProps = {
    items: { 
        question: string; 
        resultats: { texte: string; valeurRep: number }[]; 
        reponses: (string | number)[][]; 
        indexCalcul: number; 
        validation: boolean; 
    }[]; 
    itemSelected : number;  
};
export function MaJbdbdRond({items, itemSelected}: GeneralRondsProps){
    
    return(
        <div className="ml-3">
            {items.map((item) => {
                const rondStyleVariants ={
                    "rond": "w-4 h-4 border border-gray-500 inline-block mr-1 rounded-full",
                    "rondValid": "bg-lime-500 w-4 h-4 border border-gray-500 inline-block mr-1 rounded-full",
                    "rondUnvalid": "bg-red-600 w-4 h-4 border border-gray-500 inline-block mr-1 rounded-full",
                    "rondSelected": "w-4 h-4 border-2 border-black inline-block mr-1 rounded-full",
                    "rondValidSelected": "bg-lime-500 w-4 h-4 border-2 border-black inline-block mr-1 rounded-full",
                    "rondUnvalidSelected": "bg-red-600 w-4 h-4 border-2 border-black inline-block mr-1 rounded-full",
                } 
                let rondStyle = rondStyleVariants['rond' as keyof typeof rondStyleVariants];
                if(item.indexCalcul === itemSelected){
                    rondStyle = rondStyleVariants['rondSelected' as keyof typeof rondStyleVariants];
                    if(item.reponses.length > 1){
                        if(item.validation){
                            rondStyle = rondStyleVariants['rondValidSelected' as keyof typeof rondStyleVariants];
                        }
                        else{
                            rondStyle = rondStyleVariants['rondUnvalidSelected' as keyof typeof rondStyleVariants];
                        }
                            
                    }
                } else {
                    if(item.reponses.length > 1){
                        if(item.validation){
                            rondStyle = rondStyleVariants['rondValid' as keyof typeof rondStyleVariants];
                        }
                        else{
                            rondStyle = rondStyleVariants['rondUnvalid' as keyof typeof rondStyleVariants];
                        }
                    }
                            
                }
                return(
                    <div key={item.indexCalcul} className={rondStyle}>
                    </div>
                )
            })}
        </div>
    )
}

export default MaJbdbdRond