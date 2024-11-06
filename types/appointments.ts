export type AppointmentOptions =  "Routine checkup" | "Flu shot" | "Reflex check" | "Eye inspection" | "Throat check" | "Ear check" | "Allergy check"

export const appointmentOptions: AppointmentOptions[] = [
    "Routine checkup", 
    "Flu shot", 
    "Reflex check", 
    "Eye inspection", 
    "Throat check", 
    "Ear check", 
    "Allergy check"
  ];

export type HourOptions = "10:00" | "11:00" | "12:00" | "13:00" | "14:00" | "15:00" | "16:00" | "17:00" | "18:00"

export const hourOptions: HourOptions[] = [
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
]

export interface Meeting {
    date: string;
    time: HourOptions;
    type: AppointmentOptions;
}

export type DoctorInfo = {
    services: AppointmentOptions[];
    appointments: {
        [meetingID: string]: Meeting 
    }
}

export type Doctors = {
    [name: string]: DoctorInfo
};