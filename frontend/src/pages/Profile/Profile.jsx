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

const Profile = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const {user, loading} = useSelector((state) => state.user)
    const {user: userAuth} = useSelector((state) => state.auth)

    //new form and edit form refs
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        
    }, [dispatch, id]);
    
    const submiHandle = (e) => {
        e.preventDefault();
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
                                <input type="text" placeholder="Insira um título"/>
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" />
                            </label>
                            <input type="submit" value="Postar"/>
                        </form>
                    </div>
                </>
            )}
        </div>;
};

export default Profile;  