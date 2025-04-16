import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
}

// Publish user photo
export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async(photo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await photoService.publishPhoto(photo, token)

        // check for erros
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// Get user photos
export const getUserPhotos = createAsyncThunk(
    "photos/userphotos",
    async(IdleDeadline, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getUserPhotos(IdleDeadline, token);

        console.log(data);
        console.log(data.errors);

        return data;
    }
);

// Delete a photo
export const deletePhoto = createAsyncThunk(
    "photo/delete",
    async(id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;
        const data = await photoService.deletePhoto(id, token);

        //check for erros
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// update a photo
export const updatePhoto = createAsyncThunk(
    "photo/update",
    async(photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.updatePhoto({title: photoData.title}, photoData.id, token);

        // check for erros
        if(data.errors){
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
)

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) =>{
            builder
                .addCase(publishPhoto.pending, (state) => {
                     state.loading = true;
                     state.error = false;
                })
                .addCase(publishPhoto.fulfilled, (state, action) =>{
                    state.loading = false;
                    state.success = true;
                    state.error = null;
                    state.photo = action.payload;
                    state.photos.unshift(state.photo);
                    state.message = "Foto publicada com sucesso!"
                })
                .addCase(publishPhoto.rejected, (state, action) =>{
                    state.loading = false;
                    state.error = action.payload;
                    state.photo = {};
                })
                .addCase(getUserPhotos.pending, (state) => {
                    state.loading = true;
                    state.error = false;
               })
               .addCase(getUserPhotos.fulfilled, (state, action) =>{
                   state.loading = false;
                   state.success = true;
                   state.error = null;
                   state.photo = action.payload;
               })
                .addCase(deletePhoto.pending, (state) => {
                    state.loading = true;
                    state.error = false;
                })
                .addCase(deletePhoto.fulfilled, (state, action) =>{
                    state.loading = false;
                    state.success = true;
                    state.error = null;
                    state.photos = state.photos.filter((photo) => {
                        return photo._id != action.payload.id
                    })
                    state.message = action.payload.message;
                })
                .addCase(deletePhoto.rejected, (state, action) =>{
                    state.loading = false;
                    state.error = action.payload;
                    state.photo = {};
                })
                .addCase(updatePhoto.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(updatePhoto.fulfilled, (state, action) => {
                    state.loading = false;
                    state.success = true;
                    state.error = null;

                    state.photo.map((photo) => {
                        if(photo._id === action.payload.photo._id){
                            return (photo.title = action.payload.photo.title);
                        }
                        return photo;
                    });

                    state.message = action.payload.message;
                })
                .addCase(updatePhoto.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                    state.photo = null;
                })
    },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;