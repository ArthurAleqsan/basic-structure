import * as types from "./../types";
import AnnouncementsService from "./../../services/AnnouncementsService";

export function createSingleAnnouncement(data) {
    AnnouncementsService.createAnnouncement(data);
}

export function getAnnouncments(categoryId, limit = 20, offset = 0) {
    return (dispatch) => {
        AnnouncementsService.getListOfAnnouncements({categoryId, limit, offset})
        .then(announcements => {
            console.log(announcements);
            dispatch({
                type: types.GET_LIST_OF_ANNOUNCEMENTS,
                announcements,
            });
        })
    }
}




