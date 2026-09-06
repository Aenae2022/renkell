type GeneralModeleProps = {
    
    myExercise : {
        exId: string;//+
        description: string;//+
        shortTitle: string;//+
        logo: string;//+
        exampleQuestion: string;//+
        duration: number;//+
        exerciseNumber: number;//+
        objectif: number;//+
        eca: number;//+
        calculAGenerer: () => void;//+
        };   
    handleStart : () => void;
};
import { useTranslation } from 'react-i18next';
export function MaJbdbdModele({myExercise, handleStart} : GeneralModeleProps){
    
//const langue    
    const {t} = useTranslation();
    const exampleQuestion = t('jbdb.home.questions.'+myExercise.exId, { defaultValue: myExercise.exampleQuestion });

//const style
    const formStyle = "text-center"
    const consigneStyle="font-normal no-underline text-3xl"
    const calculationStyle ="mb-4 mt-3 text-5xl"
    const buttonStyle ="w-48 mt-8 pt-1 pb-2 cursor-pointer text-center rounded-full border-2 border-gray-400"
    return( <>
        <form className={formStyle}>
        <h3 className={consigneStyle}></h3>
        <div>
        <p className={calculationStyle}> {exampleQuestion}</p>
        <input type="button" className={buttonStyle} value={t('jbdb.exercise.startButton')} onClick={handleStart}/>
        </div>
        </form>
    
    
    </>)
}
        
  

export default MaJbdbdModele