import * as types from "./../types";
import AnnouncementsService from "./../../services/AnnouncementsService";

export function createSingleAnnouncement(data) {
        AnnouncementsService.createAnnouncement(data);
}




