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
import { CryptoCard, InnerHeader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
    {id: 1, name: 'Addidas Germany', cardType: 'Google Pay', amount: 100, srcImage: require("../../../assets/images/addidas.png")},
    {id: 2, name: 'Addidas UK', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/addidas.png")},
    {id: 3, name: 'Addidas Spain', cardType: 'Google Pay', amount: 35, srcImage: require("../../../assets/images/addidas.png")},
    {id: 5, name: 'Amazon Francis', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/amazon.png")},
    {id: 6, name: 'Amazon UK', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/amazon.png")},
    {id: 9, name: 'Ebay UK', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/ebay_pic.png")},
    {id: 10, name: 'Ebay Spain', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/ebay_pic.png")},
    {id: 11, name: 'Ebay USA', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/ebay_pic.png")},
    {id: 12, name: 'Ebay UK', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/ebay_pic.png")},

  ]

const CryptoPayment = ({navigation}) => {
  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="Choose Crypto Payment" />

    <View style={styles.listBox}>
        <Text style={styles.titleHdr}>Select your preferred crypto payment?</Text>

        <CryptoCard onPress={() => navigation.navigate("MakePayment")} title="BTC" image={icons.btc_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment")} title="ETH" image={icons.eth_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment")} title="USDT" image={icons.usdt_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment")} title="XMR" image={icons.xmr_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment")} title="LTC" image={icons.ltc_icon} />

    </View>
    
      
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    titleHdr: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.5),
        color: COLORS.textGray,
        marginBottom: wp(6)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(8)
    }
})

export default CryptoPayment;