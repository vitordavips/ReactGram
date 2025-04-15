import "./Profile.css";

// components
import Message from "../../components/Message";
import {Link} from "react-router-dom";
import { BsFillEyeFill, BsPCircleFill, BsPencilFill, BsXLg} from "react-icons/bs"; 

// hooks
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import {getUserDetails} from "../../slices/userSlice";
import { uploads } from "../../utils/config";
import { publishPhoto, resetMessage, getUserPhotos, deletePhoto } from "../../slices/photoSlices";

const Profile = () => {

    const {id} = useParams()

    const dispatch = useDispatch()

    const {user, loading} = useSelector((state) => state.user)
    const {user: userAuth} = useSelector((state) => state.auth)
    const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");

    //new form and edit form refs
    const newPhotoForm = useRef()
    const editPhotoForm = useRef()

    // Load user data
    useEffect(() => {
        dispatch(getUserDetails(id));
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

   //change image state
   const handleFile = (e) => {
    const image = e.target.files[0];

    setImage(image);
   };

   const resetComponentMessage = () => {
    setTimeout(() => {
        dispatch(resetMessage());
    }, 2000);
   }
    
    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image
        }

        //build from
        const formData = new FormData();

        Object.keys(photoData).forEach((key) => {
            formData.append(key, photoData[key]);
        });

        dispatch(publishPhoto(formData))

        setTitle("")

       resetComponentMessage()
    };

    // Delete photo
    const handleDelete = (id) => {
         dispatch(deletePhoto(id))

        resetComponentMessage();
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
                        <form onSubmit={submitHandle}>
                            <label>
                                <span>Título para a foto:</span>
                                <input type="text" placeholder="Insira um título" onChange={(e) => setTitle(e.target.value)} value={title || ""}/>
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile}/>
                            </label>
                            {!loadingPhoto && <input type="submit" value="Postar"/>}
                            {loadingPhoto && <input type="submit" disabled value="Aguarde..."/>}
                        </form>
                    </div>
                    {errorPhoto && <Message msg={errorPhoto} type='error'/>}
                    {messagePhoto && <Message msg={messagePhoto} type='success'/>}
                </>
            )}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos && photos.map((photo) => (
                        <div className="photo" key={photo._id}>
                            {photo.image && (
                                <img 
                                src={`${uploads}/photos/${photo.image}`} 
                                alt={photo.title}
                                />
                            )}
                            {id === userAuth._id ? (
                                <div className="actions">
                                    <Link to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill/>
                                    </Link>
                                    <BsPencilFill/>
                                    <BsXLg onClick={() => handleDelete(photo._id)}/>
                                </div>
                            ) : (
                                <Link className="btn" to={`/photos/${photos._id}`}>
                                    Ver
                                </Link>
                            )}
                        </div>
                    ))}
                    {photos.length === 0 && <p>Ainda não há fotos publicadas</p>}
                </div>
            </div>
        </div>;
};

export default Profile;  