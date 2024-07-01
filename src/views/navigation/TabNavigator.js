import React from 'react';

import {StyleSheet, Platform} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DashboardScreen, HistoryScreen, CardsScreen, ProfileScreen } from '../screens';
import { COLORS, icons, images } from '../../constants';
import { TabIcon } from '../components';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
        <Tab.Navigator
            
        screenOptions={{
            tabBarShowLabel:false,
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: COLORS.ButtonTxtColor,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                elevation: 0,
                height: hp(6.9),
                borderRadius: wp(3.5),
                marginBottom: Platform.OS === 'ios' ? hp(3.5) : hp(2),
                marginHorizontal:10,
                borderColor: COLORS.tabBGColor,
                borderWidth: 1,
                borderStyle: 'solid',
            }
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={DashboardScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.home}
                    title="Home"    
                />
            }}
            />
        <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.cards}
                    title="History"   
                />
            }}
            />
        <Tab.Screen 
            name="Cards" 
            component={CardsScreen} 
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.vcard}
                    title="Loans"    
                />
            }}
            />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{
                tabBarIcon: ({focused}) => 
                <TabIcon 
                    focused={focused} 
                    icon={icons.setting}
                    title="Profile"  
                />
            }}
            />
    </Tab.Navigator>
    )
}

export default TabNavigator;