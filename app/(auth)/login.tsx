import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'
import FormField from '../components/FormField'
import { fetchUserData, findUserPhone, generateCode } from '@/utils/usersHandler'
import { AUTH_ERROR_MESSAGE, ID_ERROR_MESSAGE } from '@/data/consts'
import { useUser } from '../../context/GlobalProvider';


export default function Login() {
    const { setUserID, users } = useUser();
    const [showMobileAuth, setShowMobileAuth] = useState<boolean>(false);
    const [ID, setID] = useState<string>('');
    const [mobileCode, setMobileCode] = useState<string>('');
    const [generatedCode, setGeneratedCode] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onGetMobileCode = async () => {
        setHasError(false);
        if (users) {
            const phone = findUserPhone(ID, users);
            if (!!phone) {
                const authCode = generateCode();
                console.log(authCode);
                setGeneratedCode(authCode);
                setShowMobileAuth(true);
            } else {
                setErrorMessage(ID_ERROR_MESSAGE);
                setHasError(true);
            }
        }
        else {
            setErrorMessage(ID_ERROR_MESSAGE);
            setHasError(true);
        }   
    }

    const onLogin = () => {
        setHasError(false);
        if (mobileCode === generatedCode && users) {
            setUserID(ID);
            router.push('/home')
        } else {
            setErrorMessage(AUTH_ERROR_MESSAGE);
            setHasError(true);
        }
    }

    return (
        <SafeAreaView className='flex w-full h-full items-center justify-center bg-black-100 flex-col gap-2'>
            <Text className='color-white text-xl'>Login to your account</Text>
            <FormField title='ID' value={ID} placeholder='Your ID here...' handleChangeText={(val) => setID(val)} />
            {!showMobileAuth && <CustomButton title='Get code' containerStyles='w-3/4 h-16 ' handlePress={onGetMobileCode} isLoading={false} textStyles='color-white' />}
            {showMobileAuth && 
            <>
                <FormField title='2 Factor Authentication' value={mobileCode} placeholder='Enter code from SMS' handleChangeText={(newVal: string) => setMobileCode(newVal)} />
                <CustomButton title='Login' containerStyles='w-3/4 h-16' handlePress={onLogin} isLoading={false} textStyles='color-white'  />
            </>}
            {hasError && <Text className='color-red-600 font-bold'>{errorMessage}</Text>}
        </SafeAreaView>
    )
}