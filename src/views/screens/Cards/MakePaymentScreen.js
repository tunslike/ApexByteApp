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
import { Button, CryptoCard, InnerHeader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const MakePaymentScreen = ({navigation}) => {
  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="Make Payment" />

    <View style={styles.listBox}>
        <Text style={styles.titleHdr}>Make payment using the details below</Text>
    </View>

    <View style={styles.paymentBox}>
        <Text style={styles.txtWallet}>Wallet Address</Text>
        <View style={styles.walletBox}>
            <Text style={styles.txtid}>TWVjnaTHAdkLjzUWER4CPjskasJSaa</Text>
            <TouchableOpacity>
                <Image source={icons.copyText} 
                    style={{
                        height: wp(4), width: wp(4), tintColor: COLORS.backBtnBG, resizeMode: 'contain'
                    }}
                />
            </TouchableOpacity>
        </View>

        <Text style={[styles.txtWallet, {marginTop: wp(6)}]}>Payment Details</Text>
        <View style={styles.walletBox}>
            <Text style={styles.txtid}>Send 10.0 USD (TRC-20) to the wallet 
            address</Text>
            <TouchableOpacity>
                <Image source={icons.copyText} 
                    style={{
                        height: wp(4), width: wp(4), tintColor: COLORS.backBtnBG, resizeMode: 'contain'
                    }}
                />
            </TouchableOpacity>
        </View>


        <Image source={images.barcode} 
            style={{
                height: wp(60), width: wp(60), marginBottom:wp(3), marginTop:wp(5), alignSelf:'center', resizeMode: 'contain'
            }}
        />
    </View>

    <View style={{marginHorizontal: wp(4), marginTop: wp(5)}}>
    <Button title="Make Payment" />
    </View>
 
    
      
    </ScrollView>
  )
}

export default MakePaymentScreen

const styles = StyleSheet.create({
    txtid: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        color: COLORS.White,
        fontSize: wp(3.8)
    },
    walletBox: {
        backgroundColor: COLORS.bgColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(2.3),
        borderRadius: wp(3.5)
    },
    txtWallet: {
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.primaryColor,
        fontSize: Platform.OS === 'android' ? wp(3) : wp(3.4),
        marginBottom: wp(2),
        marginLeft: wp(2)
    },
    paymentBox: {
        backgroundColor: COLORS.tabBGColor,
        marginHorizontal: wp(3),
        borderRadius: wp(7),
        paddingVertical: wp(4),
        paddingHorizontal: Platform.OS === 'android' ? wp(2) : wp(4)
    },
    titleHdr: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.5),
        color: COLORS.textGray,
        marginBottom: Platform.OS === 'android' ? wp(3) : wp(5)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(8)
    }
})