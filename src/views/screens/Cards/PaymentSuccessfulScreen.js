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

const PaymentSuccessfulScreen = ({navigation, route}) => {

    const entry_id = useSelector((state) => state.account.entry_id);
    const {cardName, quantity, currency, currencyImg, amount} = route.params;
    const [loading, setIsLoading] = useState(false);

    const ProcessGiftCardTransaction = () => {

          //data
          const data = {
            entryID: entry_id,
            cardType : "Gift Card",
            cardName :cardName, 
            amount: amount, 
            quantity: quantity,
            issuer : "Reloadly", 
            payment_type : "Cryptocurrency",
            image_url : currencyImg,
            redeem_status : 'Available',
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
                navigation.navigate("PaymentSuccess", {});
            } else{
                Alert.alert("ApexByte", "Unable to process your request, please retry!")
            }
            
        })
        .catch(error => {
            console.log(error + "1");
        });
    }

  return (
    <View
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
   
    <View style={styles.header}>
        <Text style={styles.title}>Payment Successful</Text>
    </View>

    <View style={{
        marginTop: wp(10),
        alignItems: 'center',
        marginVertical: wp(10)
    }}>
    <Image source={icons.success_icon} 
      style={{
            height: wp(25), 
            width: wp(25), 
            resizeMode: 'contain',

        }}
    />
    </View>

    <View style={styles.paymentBox}>
        <Text style={styles.txtWallet}>Payment Received!</Text>
       

        <Text style={styles.txtCurr}>
        
            Thank you, your payment has been validated successfully!
        </Text>

    </View>

    <View style={{marginHorizontal: wp(4), marginTop: wp(5)}}>
        <Button title="Back to Dashboard" onPress={() => navigation.navigate("Tab")} />
    </View>
 
    
      
    </View>
  )
}

export default PaymentSuccessfulScreen;

const styles = StyleSheet.create({
    title: {
        color: COLORS.White,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: Platform.OS === 'android' ? wp(3.7) : wp(4),
        textAlign: 'center'
      },
   header: {
        backgroundColor: COLORS.tabBGColor,
        paddingTop: Platform.OS === 'android' ? wp(5) : wp(15),
        paddingHorizontal: wp(4),
        paddingBottom: Platform.OS === 'android' ? wp(5) : wp(3),
        borderBottomRightRadius: wp(7),
        borderBottomLeftRadius: wp(7),
        columnGap: wp(3)
      },
    txtCurr: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: Platform.OS === 'android' ? wp(4) : wp(5), 
        color: COLORS.White,
        marginTop: wp(5),
        textAlign: 'center'
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
        fontSize: Platform.OS === 'android' ? wp(3.5) : wp(3.4),
        marginBottom: wp(2),
        marginLeft: wp(2)
    },
    paymentBox: {
        backgroundColor: COLORS.tabBGColor,
        marginHorizontal: wp(3),
        borderRadius: wp(7),
        paddingVertical: wp(15),
        marginBottom: wp(10),
        alignItems: 'center',
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