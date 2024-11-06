import { Meeting } from "./appointments";

export interface UserMeeting extends Meeting {
    doctor: string;
} 

export type UserData = {
    name: string;
    phone: string;
    appointments: {
        [meetingID: string]: UserMeeting
    }
}

export type Users = {
    [id: string]: UserData
};