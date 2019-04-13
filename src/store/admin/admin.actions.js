import * as types from "./../types";
import AnnouncementsService from "./../../services/AnnouncementsService";

export function createSingleAnnouncement(data) {
    AnnouncementsService.createAnnouncement(data);
}

export function getAnnouncments(categoryId, limit = 20, offset = 0) {
    return (dispatch) => {
        AnnouncementsService.getListOfAnnouncements({categoryId, limit, offset})
        .then(announcements => {
            dispatch({
                type: types.GET_LIST_OF_ANNOUNCEMENTS,
                announcements,
            });
        });
    }
}
export function removeAnnouncement(announcementId, categoryId) {
    return (dispatch) => {
        AnnouncementsService.removeAnnouncement(announcementId)
        .then(() => {
            dispatch(getAnnouncments(categoryId));
        });
    }
}
export function editAnnouncement(data, announcementId, categoryId) {
    return (dispatch, getState) => {
        AnnouncementsService.editAnnouncement(data, announcementId)
        .then(announcement => {
            const { announcements } = getState().admin;
            dispatch(getAnnouncments(categoryId));
            let newAnnouncments = announcements;
            const findFn = (e) => e.announcementId === announcementId;
            const updateFn = (el) => ({ ...el, text: el.announcement.text});
            newAnnouncments = updateInArray(newAnnouncments, findFn, updateFn);

            dispatch({
                type: types.SET_ANNOUNCEMENTS,
                announcements : newAnnouncments
            });
        })
    }
}
function updateInArray(array, findFn, updateFn) {
    const index = array.findIndex(findFn);
    const elem = array.find(findFn);
    const newArray = [...array];
    newArray.splice(index, 1, updateFn(elem));
    return newArray;
}





