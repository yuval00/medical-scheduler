import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SelectList } from 'react-native-dropdown-select-list';
import { Calendar, DateData } from 'react-native-calendars';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import { AppointmentOptions, appointmentOptions, HourOptions } from '@/types/appointments';
import { addDoctorAppointment, findAvailableMeetingsPerDoctorDate, generateMeetingID, handleFindRelevantDoctors } from '@/utils/doctorHandler';
import { useUser } from '@/context/GlobalProvider';
import { addAppointment } from '@/utils/usersHandler';


const ScheduleAppointment = () => {
    const [serviceSelected, setServiceSelected] = useState<AppointmentOptions | ''>('');
    const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
    const [currentSelectedDate, setCurrentSelectedDate] = useState<string>('');
    const [selectedDoctor, setSelectedDoctor] = useState<string>('');
    const [currentSelectedTime, setCurrentSelectedTime] = useState<HourOptions | ''>();
    const { userID, doctors, users, setUsers, setDoctors }  = useUser();

    const onSelectTime = (time: HourOptions, doctor: string) => {
        setCurrentSelectedTime(time);
        setSelectedDoctor(doctor);
    }

    const onSchedule = () => {
        if (users && doctors && userID && currentSelectedTime && serviceSelected ) {
            const meetingID = generateMeetingID();
            const newUsers = addAppointment(userID, meetingID, {date: currentSelectedDate, time: currentSelectedTime, type: serviceSelected, doctor: selectedDoctor}, users)
            const newDoctors = addDoctorAppointment(selectedDoctor, meetingID, {date: currentSelectedDate, time: currentSelectedTime, type: serviceSelected}, doctors)
            setUsers(newUsers);
            setDoctors(newDoctors);
            setServiceSelected('');
            setCurrentSelectedDate('');
            setSelectedDoctor('')
            setCurrentSelectedTime('');
            setAvailableDoctors([]);
            router.push('/home');
        }
    }

    useEffect(() => {
        if (!!serviceSelected && doctors) setAvailableDoctors(handleFindRelevantDoctors(doctors, serviceSelected));
    }, [serviceSelected]);

    return (
        <SafeAreaView className='w-full h-full bg-black-100'>
            <View className='h-full px-4 pt-4 flex flex-col gap-6'>
                <Text className='color-secondary-100 font-bold text-3xl'>
                    Schedule Appointment
                </Text>
                <ScrollView className='w-full rounded-2xl border-gray-400 border-solid border-2 p-4'>
                    <View className='flex-col gap-2'>
                        <Text className='color-white text-lg font-bold'>Choose Service</Text>
                        <SelectList inputStyles={{color: 'white', backgroundColor: '#126945'}} 
                        boxStyles={{ backgroundColor: '#126945' }}
                        dropdownTextStyles={{ color: 'white' }}
                        dropdownItemStyles={{ backgroundColor: '#126945' }} 
                        dropdownStyles={{backgroundColor: '#126945'}}
                        setSelected={(val: AppointmentOptions) => setServiceSelected(val)} 
                        save='value' 
                        
                        data={appointmentOptions.map((option, index) => ({
                            key: (index + 1).toString(),
                            value: option                 
                          }))} />
                        {!!serviceSelected &&
                        <>
                            <Text className='color-white text-lg font-bold'>Choose Date for appointment</Text>
                            <Calendar
                            theme={{
                                textSectionTitleDisabledColor: '#d9e1e8'
                              }}
                              markedDates={currentSelectedDate ? {[currentSelectedDate]: {marked: true}} : {}}
                              onDayPress={(e: DateData) => setCurrentSelectedDate(e.dateString)}
                            minDate={new Date().toDateString()} disableAllTouchEventsForDisabledDays/>
                        </>
                        }
                        {!!currentSelectedDate &&
                        <>
                            <Text className='color-white text-lg font-bold'>Choose Time</Text>
                            {doctors && availableDoctors.map(doctor => {
                                const availableTimes = findAvailableMeetingsPerDoctorDate(doctors[doctor], currentSelectedDate);
                                if (!!availableTimes.length)
                                return (
                                    <View key={doctor}>
                                        <Text className='color-gray-400 text-md'>{doctor}</Text>
                                        <ScrollView horizontal className='w-full h-12'>
                                            <View className='flex-row gap-2 p-4'>
                                                {availableTimes.map(time => (
                                                    <CustomButton key={`${time}-${doctor}`} title={time} containerStyles='h-6 px-2' textStyles='color-white text-xs' handlePress={() => onSelectTime(time, doctor)} />
                                                ))}
                                            </View>
                                        </ScrollView>
                                    </View>
                                )
                                else return <></>
                            })}
                        </>
                        }
                        {!!currentSelectedDate && !!currentSelectedTime &&
                            <View className='w-full items-center justify- mt-6'>
                            <CustomButton title='Schedule' containerStyles='w-1/2' textStyles='color-white font-bold' handlePress={onSchedule} />
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ScheduleAppointment