import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DashboardScreen, 
        } from '../screens';
import TabNavigator from './TabNavigator';
import { PurchaseVirtualCardScreen } from '../screens';
import { BuyGiftCardScreen } from '../screens';
import { CryptoPayment } from '../screens';
import { MakePaymentScreen } from '../screens';

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return(
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='Tab' component={TabNavigator} />
            <Stack.Screen name='Dashboard' component={DashboardScreen} />
            <Stack.Screen name='PurchaseVirtualCard' component={PurchaseVirtualCardScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='BuyGiftCard' component={BuyGiftCardScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='CryptoPayment' component={CryptoPayment} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='MakePayment' component={MakePaymentScreen} options={{animation: 'slide_from_bottom'}} />
        </Stack.Navigator>
    )
}

export default AppStack;