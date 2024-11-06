import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from './components/CustomButton'
import { router } from 'expo-router'

export default function App() {
    return (
        <SafeAreaView className='flex w-full h-full items-center justify-center bg-black-100 flex-col gap-2'>
        <Text className='color-white'>Welcome to your</Text>
        <Text className='font-bold text-3xl color-primary'>Medical Schedualer</Text>
        <CustomButton handlePress={() => router.push('/login')} containerStyles='w-3/4 h-16' title='Log In' isLoading={false} textStyles='color-white'  />    
        </SafeAreaView>
    ) 
}