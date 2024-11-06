import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton';

type Props = {
    title: string,
    doctor: string,
    time: string,
    date: string,
    onDelete: () => void;
}

const AppointmentCard = ({title, doctor, date, time, onDelete}: Props) => {
    return (
        <View className='w-full rounded-lg bg-jade-800 max-h-24 px-2 py-2 flex-row items-center'>
            <View className='flex flex-col gap-1 ms-0'>
                <Text className='color-white font-bold text-lg'>{title}</Text>
                <Text className='color-gray-400 text-md'>{doctor}</Text>
                <Text className='color-gray-400 text-md'>{date}</Text>
                <Text className='color-gray-400 text-md'>{time}</Text>
            </View>
            <View className='ml-auto flex flex-row gap-2'>
                <CustomButton title='Cancel' handlePress={onDelete} textStyles='color-white text-sm' containerStyles='p-2 min-w-16 max-w-16' />
            </View>
        </View>
    )
}

export default AppointmentCard