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

const CardsScreen = ({navigation}) => {

  const [tab, setTab] = useState(1);

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="My Virtual Cards" />

    <View style={styles.tabBox}>
      <TouchableOpacity onPress={() => setTab(1)} style={(tab == 1) ? styles.activeTab : styles.notActivetab}>
          <Text style={[styles.activeTxt, {color: (tab == 1) ? COLORS.bgColor : COLORS.White}]}>Virtual Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTab(2)} style={(tab == 2) ? styles.activeTab : styles.notActivetab}>
          <Text style={[styles.notActiveTxt, {color: (tab == 2) ? COLORS.bgColor : COLORS.White}]}>Gift Cards</Text>
      </TouchableOpacity>
    </View>
      
    <View style={styles.tabBody}>
        <Text style={styles.txtLine1}>Your virtual cards will show here</Text>
        <Text style={styles.txtLine2}>No available virtual card found!</Text>
    </View>

    </View>
  )
}

export default CardsScreen

const styles = StyleSheet.create({
  notActiveTxt: {
    color: COLORS.White,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3),
  },
  activeTxt: {
    color: COLORS.bgColor,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3),
  },
  activeTab: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: wp(3),
    paddingVertical: Platform.OS === 'android' ? wp(2.4) :  wp(3),
    width: wp(44),
    alignItems: 'center'
  },
  notActivetab: {
    borderColor: COLORS.textBoxStrokeColor,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: COLORS.tabBGColor,
    borderRadius: wp(3),
    paddingVertical: Platform.OS === 'android' ? wp(2.4) :  wp(3),
    width: wp(44),
    alignItems: 'center'
  },
  tabBox: {
    marginHorizontal: wp(4),
    marginTop: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(4)
  },
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