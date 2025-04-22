// Redux
import {resetMessage} from "../slices/photoSlices";

export const useResetComponentMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }
};