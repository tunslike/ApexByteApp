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
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { GiftCardList, InnerHeader, VirtualCardList } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const HistoryScreen = () => {
  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="My Transactions" />

    <Text style={styles.titleHdr}>View all transactions till date</Text>
      
    <View style={styles.tabBody}>
        <Text style={styles.txtLine1}>Your transactions will show here</Text>
        <Text style={styles.txtLine2}>No available transactions found!</Text>
    </View>

    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
  txtLine1: {
    color: COLORS.textGray,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.5)
  },
  txtLine2: {
    marginTop: wp(2),
    color: COLORS.textBoxStrokeColor,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  txtLine1: {
    color: COLORS.textGray,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  titleHdr: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.5),
    marginTop: wp(10),
    marginHorizontal: wp(4),
    color: COLORS.textGray,
    marginBottom: wp(3),
    marginLeft: wp(7)
},
  tabBody: {
    backgroundColor: COLORS.tabBGColor,
    borderRadius: wp(7),
    minHeight: wp(120),
    marginHorizontal: wp(3),
    justifyContent: 'center',
    alignItems: 'center'
  }
})