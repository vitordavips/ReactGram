import { api, requestConfig } from '../utils/config';

//Publish an user photo
const publishPhoto = async(data, token) => {
    const config = requestConfig("POST", data, token, true)

    try {
        const res = await fetch(api + "/photo", config).then((res) => res.json()).catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    };
}

const photoService = {};

export default photoService;