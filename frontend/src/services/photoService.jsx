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
const getPhoto = async(id, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/" + id, config);

        if(!res.ok){
            const errorData = await res.json();
            throw new Error(errorData.message || "Erro ao buscar a foto");
        }

        const data = await res.json();

        return data;
    } catch (error) {
        throw error;
    }
}

// Like a photo
const like = async(id, token) => {
    const config = requestConfig("PUT", null, token);

    try {
        const res = await fetch(`${api}/photos/like/${id}`, config);
        const data = await res.json();

        if(!res.ok){
            throw new Error(data.errors ? data.errors[0] : "Erro ao curitir a foto");
        }

        return data;
    } catch (error) {
        console.log("erro no like", error.message);
        return{errors : [error.message]};
    }
};

// Add comment to a photo
const comment = async (data, id, token) => {
    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + "/photos/comment/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// Get all photos
const getPhotos = async (token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/", config)
            .then((res) => res.json())
            .catch((err) => err);
        return res;
    } catch (error) {
        console.log(error)
    }
};

// Search photo by title
const searchPhotos = async(query, token) => {
    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "/photos/search?q=" + query, config)
            .then((res) => res.json())
            .catch((err) => err);
        
        return res;
    } catch (error) {
        console.log(error)
    }
};

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos,
    searchPhotos,
};

export default photoService;