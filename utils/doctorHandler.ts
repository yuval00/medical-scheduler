import { AppointmentOptions, DoctorInfo, Doctors, hourOptions, HourOptions, Meeting } from "@/types/appointments";
import {v4 as uuidv4} from 'uuid';

export function handleFindRelevantDoctors(doctors: Doctors, service: AppointmentOptions): string[] {
    return Object.keys(doctors).filter((val) => doctors[val].services.includes(service));
}

export function findAvailableMeetingsPerDoctorDate(doctor: DoctorInfo, date: string): HourOptions[] {
    const meetingTimesForTheDay = Object.values(doctor.appointments).filter((meeting) => meeting.date === date).map(meeting => meeting.time);
    return hourOptions.filter((hour) => !meetingTimesForTheDay.includes(hour));    
}

export function addDoctorAppointment(doctor: string, meetingID: string, meeting: Meeting, doctors: Doctors) {
    const newDoctors = {
        ...doctors,
        [doctor]: {
            ...doctors[doctor],
            appointments: {[meetingID]: meeting, ...doctors[doctor].appointments}, 
        }, 
    }
    return newDoctors;
}

export function removeDoctorAppointment (doctor: string, meetingID: string, doctors: Doctors) {
    const doctorInfo = doctors[doctor]
    delete doctorInfo.appointments[meetingID]
    const newDoctors = {
        ...doctors,
        [doctor]: doctorInfo
    }
    return newDoctors;
}

export function generateMeetingID () {
    return uuidv4();
}