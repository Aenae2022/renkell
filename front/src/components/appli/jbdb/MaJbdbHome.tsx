

import { jbdbExosList} from "../../datas/jbdbExosList";
import MajbdbCategory from "../../components/ma-jbdb/MaJbdbCategory";
import { useTranslation } from 'react-i18next';
import diviserLogo from "../../assets/pictures/exercice/calcul/diviser.png";
import multiplierLogo from "../../assets/pictures/exercice/calcul/multiplier.png";
import additionnerLogo from "../../assets/pictures/exercice/calcul/additionner.png";
import soustraireLogo from "../../assets/pictures/exercice/calcul/soustraire.png";

type GeneralMaJbdbHomeProps = {
    categoryToShow : string; 
    setCategoryToShow: (cat:string) => void;
};
function MaJbdbHome({categoryToShow, setCategoryToShow} : GeneralMaJbdbHomeProps){
//const de language
    const { t } = useTranslation();
    const jbdbHomeAddTitle = t('jbdb.home.domaines.add');
    const jbdbHomeMultiTitle = t('jbdb.home.domaines.multi');


    //obtenir les exercices du champ Sammañ ha dilemel
    const jbdbExosListAdd = jbdbExosList.filter(exo => exo.champs === 'Sammañ ha dilemel')[0].categories;
    //lister les catégories du champ Sammañ ha dilemel
    const categoriesAdd = [...new Set(jbdbExosListAdd.map(exo => exo.category))];
    //obtenir les exercices du champ Liesaat ha rannañ
    const jbdbExosListMulti = jbdbExosList.filter(exo => exo.champs === 'Liesaat ha rannañ')[0].categories;
    const categoriesMulti = [...new Set(jbdbExosListMulti.map(exo => exo.category))];
    // const [categoryToShow, setCategoryToShow] = useState('nope')
    let myCategoryContainer = null;
    if(categoryToShow === 'add'){
        myCategoryContainer = <div >
            {categoriesAdd.map((category, index) => {
            const categoryDatas = jbdbExosListAdd.filter(exo => exo.category === category)[0].subCategories;
            const categoryName = t('jbdb.home.categories.'+category);
            return(<MajbdbCategory key={`${category}-${index}`} champ="add" titleCategory={categoryName} datas={categoryDatas}/>)
        })}
        </div>
    }
    if(categoryToShow ==='multi'){
        myCategoryContainer = <div >
            {categoriesMulti.map((category, index) => {
            const categoryDatas = jbdbExosListMulti.filter(exo => exo.category === category)[0].subCategories;
            const categoryName = t('jbdb.home.categories.'+category);
            return(<MajbdbCategory key={`${category}-${index}`} champ='multi' titleCategory={categoryName} datas={categoryDatas}/>)
        })}
        </div>
    }

//const de style
    const isSelectedAdd = categoryToShow === 'add' ? true : false
    const isSelectedMulti = categoryToShow === 'multi' ? true : false
    const champsAddStyleVariantsSelected = {
        'unselected' : "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-red-300",
        'selected' : "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-red-300 font-bold ring-2 ring-gray-500",
    } as const;
    const champsAddStyle = isSelectedAdd ? champsAddStyleVariantsSelected['selected' as keyof typeof champsAddStyleVariantsSelected] : champsAddStyleVariantsSelected['unselected' as keyof typeof champsAddStyleVariantsSelected];
    const champsMultiStyleVariantsSelected = {
        'unselected' : "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-red-400",
        'selected' : "flex items-center justify-center flex-row p-1 m-2 cursor-pointer rounded-md bg-red-400 font-bold ring-2 ring-gray-500",
    } as const;
    const champsMultiStyle = isSelectedMulti ? champsMultiStyleVariantsSelected['selected' as keyof typeof champsMultiStyleVariantsSelected] : champsMultiStyleVariantsSelected['unselected' as keyof typeof champsMultiStyleVariantsSelected];
    const logoChampStyle = 'w-8 ml-2';
    
    
    
    return (
        <>
        <div className="flex">
            <div className={champsAddStyle} 
                onClick={()=>setCategoryToShow('add')}>
                {jbdbHomeAddTitle}
                <img className={logoChampStyle} src={additionnerLogo} alt="plus"/>
                <img className={logoChampStyle} src={soustraireLogo} alt="moins"/>         
            </div>
            <div className={champsMultiStyle} 
                onClick={()=>setCategoryToShow('multi')}>
                {jbdbHomeMultiTitle}
                <img className={logoChampStyle} src={multiplierLogo} alt="fois"/>
                <img className={logoChampStyle} src={diviserLogo} alt="divisé"/>         
            </div>
        </div>
        
            {myCategoryContainer}
            </>
     )
    
}

export default MaJbdbHome;