import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BuyVirtualCardDetails, DashboardScreen, GiftCardCategoriesScreen, GiftCardsByCountry, LoadCountryCardScreen, PayGiftCardRequest, PaymentSuccessfulScreen, RedeemCardScreen, ViewTransactionDetails, 
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
            <Stack.Screen name='GiftCardCategory' component={GiftCardCategoriesScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='GiftCardCountry' component={GiftCardsByCountry} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='LoadCountryCard' component={LoadCountryCardScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='PayGiftCard' component={PayGiftCardRequest} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='RedeemCard' component={RedeemCardScreen} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='CryptoPayment' component={CryptoPayment} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='BuyVirtualCard' component={BuyVirtualCardDetails} options={{animation: 'slide_from_right'}} />
            <Stack.Screen name='MakePayment' component={MakePaymentScreen} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name='ViewTransaction' component={ViewTransactionDetails} options={{animation: 'slide_from_bottom'}} />
            <Stack.Screen name='PaymentSuccess' component={PaymentSuccessfulScreen} options={{animation: 'slide_from_bottom'}} />
        </Stack.Navigator>
    )
}

export default AppStack;