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
import { Button, CryptoCard, InnerHeader, Loader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const MakePaymentScreen = ({navigation, route}) => {

    const entry_id = useSelector((state) => state.account.entry_id);
    const {cardName, quantity, currency, currencyImg, amount} = route.params;
    const [loading, setIsLoading] = useState(null);

    const ProcessGiftCardTransaction = () => {

          //data
          const data = {
            entryID: entry_id,
            cardType : "Gift Card",
            cardName :cardName, 
            amount: amount, 
            quantity: quantity,
            issuer : "Reloadly", 
            payment_type : "Cryptocurrency"
        }

        setIsLoading(true);

        axios.post(APIBaseUrl.developmentUrl + 'product/createGiftCard',data,{
            headers: {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3331'
            }
        })
        .then(response => {

            setIsLoading(false)

            if(response.data) {
                Alert.alert('Your payment was successfully');
            }  
            
        })
        .catch(error => {
            console.log(error + "1");
        });

    }


  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="Make Payment" />

    <Loader loading={loading} />

    <View style={styles.carBoxName}>
        <Text style={styles.cardTitle}>Payment Currency</Text>
        <View style={styles.iconLine}>
        <Image source={currencyImg} 
            style={{
                height: wp(10), width: wp(10), resizeMode: 'contain'
            }}
        />
        <Text style={styles.txtCurr}>{currency}</Text>
    </View>
    </View>

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
            <Text style={styles.txtid}>Send {amount} USD to the wallet 
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
        <Button title="Confirm Payment" onPress={() => ProcessGiftCardTransaction()} />
    </View>
 
    
      
    </ScrollView>
  )
}

export default MakePaymentScreen

const styles = StyleSheet.create({
    txtCurr: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(5), 
        color: COLORS.White
    },
    iconLine: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: wp(2),
        columnGap: wp(3)
    },
    cardTitle: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3),
        color: COLORS.primaryColor
    },
    carBoxName: {
        backgroundColor: COLORS.tabBGColor,
        marginHorizontal: wp(3),
        borderRadius: wp(5),
        paddingVertical: wp(3),
        marginTop: wp(4),
        paddingLeft: wp(4)
    },
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
        marginBottom: Platform.OS === 'android' ? wp(1.5) : wp(1.5)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(5)
    }
})