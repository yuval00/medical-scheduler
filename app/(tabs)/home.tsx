import { ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppointmentCard from '../components/AppointmentCard'
import { useUser } from '@/context/GlobalProvider'
import { removeDoctorAppointment } from '@/utils/doctorHandler'
import { removeAppointment } from '@/utils/usersHandler'

const Home = () => {
    const { users, userID, doctors, setDoctors, setUsers }  = useUser();

    const onDeleteMeeting = (meetingID: string) => {
        if (users && userID && doctors) {
            const meetingDoctor = users[userID].appointments[meetingID].doctor;
            const newDoctors = removeDoctorAppointment(meetingDoctor, meetingID, doctors);
            const newUsers = removeAppointment(userID, meetingID, users);
            setUsers(newUsers);
            setDoctors(newDoctors);
        }
    }

    if (users && userID) {
        return (
            <SafeAreaView className='w-full h-full bg-black-100'>
                <View className='h-full px-4 pt-4 flex flex-col gap-6'>
                    <Text className='color-secondary-100 font-bold text-3xl'>
                        {`Welcome ${users[userID].name}`}
                    </Text>
                    <View className='flex flex-col gap-2'>
                        <Text className='text-white font-bold text-xl'>
                            Your upcoming appointments:
                        </Text>
                        <ScrollView className='w-full min-h-[50vh] max-h-[50vh] rounded-2xl border-gray-400 border-solid border-2 p-4'>
                            <View className='flex flex-col gap-4'>
                                {
                                    (users[userID] && Object.keys(users[userID].appointments).length > 0) ? Object.keys(users[userID].appointments).map((apt, index) => 
                                        <AppointmentCard     
                                        key={index} 
                                        title={users[userID].appointments[apt].type} 
                                        doctor={users[userID].appointments[apt].doctor} 
                                        time={users[userID].appointments[apt].time} 
                                        date={users[userID].appointments[apt].date} 
                                        onDelete={() => onDeleteMeeting(apt)} />
                                ) :
                                <Text className='text-white'>No appointments scheduled.</Text>
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        )
    } else return <></>
    
}

export default Home