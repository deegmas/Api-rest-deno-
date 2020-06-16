interface IVoiture {
    id: string;
    marque: string;
    modele: string;
    annee: string;
}

// creation d'un tableau de données 
let voitures: Array<IVoiture> = [
{
    id: "1",
    marque: "Audi",
    modele: "RS6",
    annee: "2020"
},
{
    id: "2",
    marque: "Tesla",
    modele: "Model X",
    annee: "2020"
}]

// Permet d'obtenir les infos des voitures
const getVoitures = ({ response }: { response: any }) => {
    response.body = voitures;
    response.status = 200;
}


// Permet d'obtenir les infors d'une voiture
const getVoiture = ({ params, response }: { params: { id: string }; response: any }) => {
    const voiture: IVoiture | undefined = searchVoitureById(params.id);
    if (voiture) {
        response.body = voiture;
        response.status = 200;
    }
    else {
        response.body = { message: `aucune voiture trouvé`};
        response.status = 404;
    }
}

// Permet d'ajouter une voiture à la liste actuel
const addVoiture = async ({ request, response }: {request: any; response: any }) => {
    const body = await request.body();
    const voiture: IVoiture = body.value;
    voitures.push(voiture);
    response.body = { message: 'Valeur ajouté'};
    response.status = 200;
}


// Permet de mettre à jour les informations d'une voiture
const updateVoiture = async ({ params, request, response}: {params: {id: string}; request: any; response: any }) => {
    let voiture: IVoiture | undefined = searchVoitureById(params.id);
    if (voiture) {
        const body = await request.body();
        const updateData: { marque?: string; modele?: string; annee?: string } = body.value;
        voiture = { ...voiture, ...updateData};
        voitures = [ ...voitures.filter(voiture => voiture.id !== params.id), voiture];
        response.body = {message: 'Valeur modifier'};
        response.status = 200;
    }
    else {
        response.body = {message: 'Voiture introuvable'};
        response.status = 404;
    }
}

// Supprime une voiture
const deleteVoiture = ({ params, response }: {params: {id: string}; response: any}) => {
    voitures = voitures.filter(voiture => voiture.id !== params.id);
    response.body = {message: 'Voiture supprimé'};
    response.status = 200;
}

// methode pour rechercher une voiture par son id 
const searchVoitureById = (id: string): ( IVoiture | undefined ) => voitures.filter(voiture => voiture.id === id)[0];

export { getVoitures, getVoiture, addVoiture, updateVoiture, deleteVoiture }