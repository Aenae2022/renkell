
export class PrincipalTag {
    id: number;  //id du group, de la classroom ou du user
    title: string;  //titre de l'onglet
    concerned: string;  //classroom ou group ou user
    ref:string;
    tagStyle: string; //classname tailwind qui prend en charge une couleur spécifique
    tagStyleSelected: string; //classname tailwind qui prend en charge une couleur spécifique
    tagStyleTagAdd: string; //classname tailwind qui prend en charge une couleur spécifique

    constructor(id : number, title : string|null, concerned:string, color : string) {
    this.id = id;
    this.title = title===null?'':title;
    this.ref = concerned+id
    this.concerned = concerned;
    this.tagStyle = `mr-1 pl-2 pr-2 pt-1 pb-1 text-center cursor-pointer m-w-20 m-h-5 rounded-t-lg bg-${color}-light hover:bg-${color}`;
    this.tagStyleSelected = `mr-1 pl-2 pr-2 pt-1 pb-1 text-center cursor-pointer m-w-20 m-h-5 rounded-t-lg bg-${color} font-bold z-2 border-t-2 border-x-2 border-${color}-dark`;
    this.tagStyleTagAdd =`absolute left-0 right-0 bottom-[-10px] mr-1 pl-2 pr-2 pt-1 pb-1 bg-${color} z-5 h-[10px] border-x-2 border-${color}-dark`
    }
    }

export class SecondaryTag {
    type: string;  //link ou appli
    title : string; //titre de l'onglet
    tagStyle: string; //classname tailwind qui prend en charge une couleur spécifique
    tagStyleSelected: string; //classname tailwind qui prend en charge une couleur spécifique
    tagStyleTagAdd: string; //classname tailwind qui prend en charge une couleur spécifique
    tagSource : string; //référence au tagprincipal sous forme 'concerned''id' (par exemple 'classroom5)

    constructor(type:string, title : string, color : string, source:string) {
    this.type = type;
    this.title = title;
    this.tagStyle = `mr-2 mb-1 pr-2 pl-2 pb-1 pt-1 text-center cursor-pointer m-h-20 rounded-r-lg bg-${color}-light hover:bg-${color}`;
    this.tagStyleSelected = `mr-2 mb-1 pr-2 pl-2 pb-1 pt-1 text-center cursor-pointer m-h-20 rounded-r-lg bg-${color} font-bold z-2 border-y-2 border-r-2 border-${color}-dark`;
    this.tagStyleTagAdd =`absolute left-[-10px] top-0 bottom-0 h-[calc(100%-4px)] bg-${color} z-5 w-[10px] border-y-2 border-${color}-dark`
    this.tagSource = source;
    }
}

export const defineActiveTags = (principalTagsList : PrincipalTag[], secondaryTagsList : SecondaryTag[]) => {
    console.log('principalTagsList', principalTagsList)
    console.log('secondaryTagsList', secondaryTagsList)
    
    //1- récup premier onglet principal
    const storedTag = localStorage.getItem('principalTag');
    const storedTagValid = storedTag !== null && principalTagsList.filter(t => t.ref === storedTag).length > 0;
    const startPrincipalTag = storedTagValid  ? storedTag : principalTagsList[0].ref;
    console.log('startPrincipalTag', startPrincipalTag)

    //vérifier si des tags spécifiques sont associés à ce tag général
    //2- récup premier onglet spécifique si existant
    const firstSecondaryTag = secondaryTagsList.find(tag => tag.tagSource === startPrincipalTag)?.type
    let startSecondaryTag = ""
    if(firstSecondaryTag){
        console.log('firstSecondaryTag', firstSecondaryTag)
        console.log("il y a un tag spé. on vérifie sur un tag est déjà en mémoire")
        const storedSecondaryTag = localStorage.getItem('secondaryTag');
        console.log('storedSecondaryTag', storedSecondaryTag)

        //pas de tag en mémoire
        if(storedSecondaryTag === null || storedSecondaryTag === ''){
            console.log('pas de tag en mémoire')
            startSecondaryTag = firstSecondaryTag;
        } 
        else { //tag en mémoire, on vérifie le match avec le tag principal
            console.log('tag en mémoire, on vérifie le match avec le tag principal')
            const storedSecondaryTagValid = secondaryTagsList.find(sTag => sTag.type === storedSecondaryTag && sTag.tagSource === startPrincipalTag);
            console.log('storedSecondaryTagValid', storedSecondaryTagValid)
            if(!storedSecondaryTagValid){ //si le tag est valid on ne fait rien, sinon on le remplace pour le first
                startSecondaryTag = firstSecondaryTag;
            } else {
                startSecondaryTag = storedSecondaryTag;
            }
            
        }
    }

    //4- on stocke dans la sessionStorage les deux tags activés
    localStorage.setItem('principalTag', startPrincipalTag);
    localStorage.setItem('secondaryTag', startSecondaryTag);

    return({startPrincipalTag, startSecondaryTag})

}