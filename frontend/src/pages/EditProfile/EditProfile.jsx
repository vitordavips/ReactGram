import './EditProfile.css';

import { uploads } from '../../utils/config';

// hooks
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Redux
import {profile, resetMessage, updateProfile} from "../../slices/userSlice.jsx";

// Components
import Message from "../../components/Message.jsx";

const EditProfile = () => {
    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state) => state.user);

    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setImageProfile] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // Load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // Fill form with user data
    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setBio(user.bio)
        }
    },[user])

    const handleSumit = async (e) => {
        e.preventDefault()

        //Coleta de dados de usuários de estados
        const userData = {
            name
        }

        if (profileImage) {
            userData.profileImage = profileImage;
        }

        if(bio) {
            userData.bio = bio;
        };

        if(password){
            userData.password = password;
        };

        
        // Construir o FormData
            const formData = new FormData();

            const userFormData = Object.keys(userData).forEach((key) => 
                formData.append(key, userData[key])
            );

            //Object.keys(userData).forEach((key) => formData.append(key, userData[key]));

            formData.append("user", userFormData)

            // Chamar o dispatch
            await dispatch(updateProfile(userFormData));

            // Resetar mensagens após 200ms
            setTimeout(() => {
                dispatch(resetMessage());
            }, 2000);
    };

    const handleFile = (e) => {
        // image preview
        const image = e.target.files[0];

        setPreviewImage(image);

        // update image state
        setImageProfile(image);
    }
  return (
    <div>
        <h2>Edite seus dados</h2>
        <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você...</p>
        {(user.profileImage || previewImage) && (
            <img 
                className='profile-image'
                src={
                    previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`
                }
                alt={user.name}

            />
        )}
        <form onSubmit={handleSumit}>
            <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""}/>
            <input type="email" placeholder='E-mail'  disabled value={email || ""}/>
            <label>
                <span>Imagem do Perfil</span>
                <input type="file" onChange={handleFile}/>
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder='Descrição do perfil' onChange={(e) => setBio(e.target.value)} value={bio || ""}/>
            </label>
            <label>
                <span>Quer alterar sua senha?</span>
                <input type="password" placeholder="Digite a sua senha" onChange={(e) => setPassword(e.target.value)}  value={password || ""}/>
            </label>
            {!loading && <input type='submit' value="Atualizar" />}
            {loading && <input type='submit' disabled value="Aguarde..."/>}
            {error && <Message msg={error} type="error" />}
            {message && <Message msg={message} type="success" />}
        </form>
    </div>
  )
}

export default EditProfile