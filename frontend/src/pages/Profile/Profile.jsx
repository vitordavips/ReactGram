import "./Profile.css";

// components
import Message from "../../components/Message";
import {Link} from "react-router-dom";
import { BsFillEyeFill, BsPCircleFill, BsXLg} from "react-icons/bs"; 

// hooks
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import {getUserDetails} from "../../slices/userSlice";
import { uploads } from "../../utils/config";
import { publishPhoto, resetMessage } from "../../slices/photoSlices";

const Profile = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const {user, loading} = useSelector((state) => state.user)
    const {user: userAuth} = useSelector((state) => state.auth)
    const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);

    //new form and edit form refs
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        
    }, [dispatch, id]);

    const handleFile = (e) => {
        const image = e.target.files[0];

        setImage(image);
    };
    
    const submiHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        }

        //build from
        const formData = new FormData();

        const photoFormData = Object.keys(photoData).forEach((key) => formData.append(key, photoData[key]));

        formData.append("photo", photoFormData)

        dispatch(publishPhoto(formData))

        setTitle("")

        setTimeout(() => {
            dispatch(resetMessage());
        }, 200);
    };

    if(loading){
        return <p>Carregando...</p>
    }

    return <div id="profile">
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
            {id === userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu: </h3>
                        <form onSubmit={submiHandle}>
                            <label>
                                <span>Título para a foto:</span>
                                <input type="text" placeholder="Insira um título" onChange={(e) => setTimeout(e.target.value)} value={title || " "}/>
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile}/>
                            </label>
                            {!loadingPhoto && <input type="submit" value="Postar"/>}
                            {loadingPhoto && <input type="submit" value="Aguarde..."/>}
                        </form>
                    </div>
                    {errorPhoto && <Message msg={errorPhoto} type='error'/>}
                    {errorPhoto && <Message msg={messagePhoto} type='success'/>}
                </>
            )}
        </div>;
};

export default Profile;  