import * as types from './../types';
import MediaService from "./../../services/MediaService";

const LIMIT = 20;

export function getMedia(mediaType, offset = null) {
    return (dispatch, getState) => {
        const {media: mediaState, user: { currentUser ,user = {}}} = getState();
        offset = offset !== null ? offset : mediaState.offset + LIMIT;
        const {id: userId,} = user || currentUser;
        MediaService.getMedia({offset, userId, limit: LIMIT, mediaType}).then(({media}) => {
            const oldMedia = offset === 0 ? [] : mediaState.media;
            const newMedia = [...oldMedia, ...media];
            dispatch({
                type: types.GET_MEDIA_SUCCESS,
                media: newMedia,
                offset,
            })
        })
    }
}