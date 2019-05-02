import * as types from "./../types";
import AnnouncementsService from "./../../services/AnnouncementsService";
import { updateInArray, removeFromArray } from "./../../util/helpers";

export function createSingleAnnouncement(data) {
    AnnouncementsService.createAnnouncement(data);
}

export function getAnnouncments(categoryId, limit = 20, offset = 0) {
    return (dispatch) => {
        AnnouncementsService.getListOfAnnouncements({ categoryId, limit, offset })
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
            .then((announcement) => {
                const { announcements } = getState().admin;
                let newAnnouncments = announcements;
                const findFn = (e) => e.announcementId === announcementId;

                if (categoryId === announcement.announcementId) {
                    const updateFn = () => ({ ...announcement });
                    newAnnouncments = updateInArray(newAnnouncments, findFn, updateFn);
                } else {
                    newAnnouncments = removeFromArray(newAnnouncments,findFn);
                }

                dispatch({
                    type: types.SET_ANNOUNCEMENTS,
                    announcements: newAnnouncments
                });
            })
    }
}






