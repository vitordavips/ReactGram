import "./photo.css";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import {Link} from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";


// hooks
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like } from "../../slices/photoSlices";
import LikeContainer from "../../components/LikeContainer";

const Photo = () => {
  const {id} = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch)

  const {user} = useSelector((state) => state.auth);
  const {photo, loading, error, message} = useSelector(
    (state) => state.photo
  );

  // comentários

  // Load photo data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  //like photo
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div id="photo">
        <PhotoItem photo={photo}/>
        <LikeContainer photo={photo} user={user} handleLike={handleLike}/>
        <div>
          {error && <Message msg={error} type={error}/>}
          {message && <Message msg/>}
        </div>
    </div>
  )
};

export default Photo