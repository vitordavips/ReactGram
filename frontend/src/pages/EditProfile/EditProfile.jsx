import './EditProfile.css';

import { uploads } from '../../utils/config';

// hooks
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

// Redux
import {profile, resetMessage} from "../../slices/userSlice.jsx";

// Components
import Message from "../../components/Message.jsx";

const EditProfile = () => {
    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state) => state.user);

    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [preview, setPreviewImage] = useState("");

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

    const handleSumit = (e) => {
        e.preventDefault()
    }
  return (
    <div>
        <h2>Edite seus dados</h2>
        <p>Adicione uma imagem de perfil e conte mais sobre você...</p>
        {/* preview da imagem */}
        <form onSubmit={handleSumit}>
            <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""}/>
            <input type="email" placeholder='E-mail' disabled value={name || ""}/>
            <label>
                <span>Imagem do Perfil</span>
                <input type="file" />
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder='Descrição do perfil' onChange={(e) => setBio(e.target.value)} value={bio || ""}/>
            </label>
            <label>
                <span>Quer alterar sua senha?</span>
                <input type="password" value="Digite a sua senha" onChange={(e) => setPassword(e.target.value)}  />
            </label>
            <input type="submit" value="Atualizar"/>
        </form>
    </div>
  )
}

export default EditProfile