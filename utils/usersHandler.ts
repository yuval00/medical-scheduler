import { Doctors } from "@/types/appointments";
import { UserData, UserMeeting, Users } from "@/types/users";
import RNFS from 'react-native-fs';

export function findUserPhone(id: string, users: Users): string {
    if (Object.keys(users).includes(id)) return users[id].phone;
    else return '';
}

export function fetchUserData(id: string, users: Users): UserData {
    return users[id];
}

export function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function addAppointment (userID: string, meetingID: string, meetingDetails: UserMeeting, users: Users): Users {
    const newUserData = {
        ...users,
        [userID]: {
            ...users[userID],
            appointments: {[meetingID]: meetingDetails, ...users[userID].appointments}, 
        }, 
    }
    return newUserData;
}

export function removeAppointment(userID: string, meetingID: string, users: Users) {
    const userInfo = users[userID]
    delete userInfo.appointments[meetingID]
    const newUsers = {
        ...users,
        [userID]: userInfo
    }
    return newUsers;
}