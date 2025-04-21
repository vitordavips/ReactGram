import { api, requestConfig } from '../utils/config';

//Publish an user photo
const publishPhoto = async (data, token) => {
    const config = requestConfig("POST", data, token, true);

    try{
        const res = await fetch(api + "/photos", config)
                    .then((res) => res.json())
                    .catch((err) => err);

        return res;
    }
    catch(error) {
        console.log(error);
    }
};

// get user photos
const getUserPhotos = async(id, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/photos/user/" + id, config)
                    .then((res) => res.json())
                    .catch((err) => err)
        return res;
    } catch (error) {
        console.log(error)
    }
};

//Delete a photo
const deletePhoto = async(id, token) => {
        const config = requestConfig("DELETE", null, token)

        try {
            const res = await fetch(api + "/photos/" + id, config)
                .then((res) => res.json())
                .catch((err) => err);
            
            return res;
        } catch (error) {
            console.log(error)
        }
};

// update a photo
const updatePhoto = async(data, id, token) => {
    const config = requestConfig("PUT", data, token)

    try {
        const res = await fetch(api + "/photo/" + id, config)
                .then((res) => res.json())
                .catch((err) => err) 
        
                return res;
    } catch (error) {
        console.log(error)
    }
    
};

// Get a photo by id
const getPhoto = async (id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/" + id, config);

        if(!res.ok){
            const errorText = await res.text();
            throw new Error(`Erro ao buscar a foto: ${res.status} - ${errorText}`)
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error("Error em getPhoto", error.message);
        return {errors: [error.message]};
    }
};

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
};

export default photoService;