import { Doctors } from '@/types/appointments'
import DoctorObject from '../data/doctors.json'
import { Users } from '@/types/users';
import UserObject from '../data/users.json';

export const DOCTOR_DATA: Doctors = DoctorObject;

export const USER_DATA: Users = UserObject;

export const ID_ERROR_MESSAGE = 'No user found with this ID.'
export const AUTH_ERROR_MESSAGE = 'Wrong code.'