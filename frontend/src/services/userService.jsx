  import {api, requestConfig} from '../utils/config';

  // GET user details
  const profile = async(data, token) => {
        const config = requestConfig("GET", data, token)

        try {
            const res = await fetch(api + "/users/profile", config)
                    .then((res) => res.json())
                    .catch((err) => err)
            
            return res;       
        } catch (error) {
            console.log(error)
        }
  };

  // Upadate user details
  const updateProfile = async(data, token) => {
    const config = requestConfig("PUT", data, token, true)

    try {
      const res = await fetch(api + "/users/", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
    } catch (error) {
      console.log(error);
    }
  };

  // Get user details
  const getUSerDetails = async (id) => {
    const config = requestConfig("GET")

    try {
      const res = await fetch(api + "/users"/ + id, config)
                .then((err) => res.json())
                .catch((err) => err)
      return res;
    } catch (error) {
      console.log(error)
    }
  };
  
  const userService = {
    profile,
    updateProfile,
    getUSerDetails,
  };

  export default userService;