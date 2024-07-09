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

const CryptoPayment = ({navigation, route}) => {
  const {totalAmount, cardName, quantity, image} = route.params;

  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="Choose Crypto Payment" />

    <View style={styles.carBoxName}>
        <Text style={styles.cardTitle}>Your Order</Text>
        <View style={styles.innerBox}>
        <Image source={image} 
          style={{
            height: wp(12), width: wp(20), resizeMode: 'contain'
          }}
        />
            <View style={{flex: 1}}>
                <Text style={styles.txtGiftName}>{cardName}</Text>
                <Text style={styles.txtQuantity}>Quantity: {quantity}</Text>
            </View>
            <Text style={styles.txtAmount}>${totalAmount}</Text>
        </View>
    </View>

    <View style={styles.listBox}>
        <Text style={styles.titleHdr}>Select your preferred crypto payment?</Text>

        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "BTC", currencyImg: icons.btc_icon, amount: totalAmount})} title="BTC" image={icons.btc_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "ETH", currencyImg: icons.eth_icon, amount: totalAmount})} title="ETH" image={icons.eth_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "USDT", currencyImg: icons.usdt_icon, amount: totalAmount})} title="USDT" image={icons.usdt_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "XMR", currencyImg: icons.xmr_icon, amount: totalAmount})} title="XMR" image={icons.xmr_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "LTC", currencyImg: icons.ltc_icon, amount: totalAmount})} title="LTC" image={icons.ltc_icon} />

    </View>
    
      
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  txtGiftName: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.9),
    color: COLORS.White
  },
  txtQuantity: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.3),
    color: COLORS.textGray
  },
  txtAmount: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(5),
    color: COLORS.primaryColor
  },
  innerBox: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    columnGap: wp(3),
    alignItems: 'center',
    marginTop: wp(3),
    paddingRight: wp(4)
  },
  cardTitle: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.primaryColor
  }
,  carBoxName: {
    backgroundColor: COLORS.tabBGColor,
    marginHorizontal: wp(3),
    borderRadius: wp(5),
    paddingVertical: wp(3),
    marginTop: wp(4),
    paddingLeft: wp(4)
  },
    titleHdr: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3.5),
        color: COLORS.textGray,
        marginBottom: wp(3.5)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(10)
    }
})

export default CryptoPayment;