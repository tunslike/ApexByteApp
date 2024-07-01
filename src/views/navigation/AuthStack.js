import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WelcomeScreen, 
        } from '../screens';
import { CreateAccountScreen } from '../screens';
import { LoginScreen } from '../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='CreateAccount' component={CreateAccountScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='Login' component={LoginScreen} options={{animation: 'slide_from_right'}} />
        </Stack.Navigator>
    )
}

export default AuthStack;