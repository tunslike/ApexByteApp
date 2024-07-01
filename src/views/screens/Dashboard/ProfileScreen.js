import React, { useContext, useState, useEffect } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Alert,
  FlatList,
  ScrollView,
  Dimensions} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { GiftCardList, InnerHeader, ProfileCard, VirtualCardList } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = ({navigation}) => {

  const {ExitAuthenticatedUser} = useContext(AuthContext);

  return (
    <View
    style={{
      flexGrow: 1,
      backgroundColor: COLORS.bgColor
    }}
  >
  <InnerHeader onPress={() => navigation.goBack()} title="Profile & Settings" />
    
  <View style={styles.profileBox}>

        <Image source={icons.profile_icon} 
          style={{
            height: wp(15), width: wp(15), resizeMode: 'contain', tintColor: COLORS.textGray
          }}
        />
  </View>
  <Text style={styles.txtUser}>Auth-User-0390</Text>
  <View style={styles.idbox}>
        <Text style={styles.txtAuth}>ID</Text>
        <Text style={[styles.txtAuth, {color: COLORS.greenText}]}>8290-020-20-L</Text>
        <Image source={icons.copyText} 
          style={{
            height: wp(4), width: wp(4), marginLeft: wp(3), tintColor: COLORS.textGray, resizeMode: 'contain'
          }}
        />
  </View>
  <View style={styles.settingBox}>

          <ProfileCard title="Delete Account" />
          <ProfileCard title="Privacy Policy" />
          <ProfileCard title="Terms and Conditions" />
          <ProfileCard title="FAQ" />

          <TouchableOpacity onPress={() => ExitAuthenticatedUser()} style={styles.logout}> 
          <Text style={styles.txtLogout}>Logout</Text>
          <Image source={icons.logout_icon} 
            style={{
              height: wp(4.5), width: wp(4.5), tintColor: COLORS.orangeColor, resizeMode: 'contain'
            }}
          />
        </TouchableOpacity>

  </View>



  </View>

  )
}

const styles = StyleSheet.create({

  txtLogout: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.orangeColor,
    fontSize: wp(3.8)
  },
  logout: {
    borderColor: COLORS.orangeColor,
    borderWidth: 1,
    borderStyle: 'solid',
    alignSelf: 'center',
    borderRadius: wp(6),
    paddingHorizontal: wp(15),
    paddingVertical: Platform.OS === 'android' ? wp(2) : wp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: wp(3),
    marginTop: wp(4)
  },
  settingBox: {
      backgroundColor: COLORS.tabBGColor,
      paddingVertical: wp(10),
      paddingHorizontal: wp(7),
      borderTopLeftRadius: wp(10),
      borderTopRightRadius: wp(10),
      height: '100%',
      marginTop: wp(10)

  },
  txtAuth: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.5),
    color: COLORS.White
  },
  txtUser: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.5),
    color: COLORS.White,
    textAlign: 'center',
    marginTop: wp(2)
  },
  idbox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center', 
      marginTop: wp(2),
      backgroundColor: COLORS.tabBGColor,
      paddingHorizontal: wp(7),
      paddingVertical: wp(1),
      borderRadius: wp(5),
      columnGap: wp(1)
  },
  profileBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: wp(2),
    marginTop: wp(10),
    backgroundColor: COLORS.darkGray,
    borderRadius: wp(10),
  }
})

export default ProfileScreen;