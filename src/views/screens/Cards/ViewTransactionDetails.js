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
import { COLORS, images, FONTS, icons, APIBaseUrl, CryptomusKeys, USDT_Account } from '../../../constants';
import { Button, CryptoCard, InnerHeader, Loader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const ViewTransactionDetails = ({navigation, route}) => {

    const {trans_id} = route.params;

    const entry_id = useSelector((state) => state.account.entry_id);
    
    const [loading, setIsLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(0);
    const [qrImage, setQRImage] = useState('');
    const [details, setDetails] = useState('');

    const FetchTransactionStatus = () => {

    setIsLoading(true)

    axios.get(APIBaseUrl.developmentUrl + `product/fetchPaymentStatus/${trans_id}`,{},{
        headers: {
          'Content-Type' : 'application/json' 
        }
    })
    .then(response => {
  
        setIsLoading(false)
  
        console.log(response.data);
        setDetails(response.data);

        GenerateCryptoAPIQRIamge(response.data.WALLET_ADDRESS_IN);
  
    })
    .catch(error => {
        setIsLoading(false)
        console.log(error + "1");
    });
  }

  const GenerateCryptoAPIQRIamge = async (address_in) => {

    const query = new URLSearchParams({
        address: address_in,
        value: '0',
        size: '512'
      }).toString();
    
    try {

        const ticker = USDT_Account.ticker;

        await fetch(`https://api.cryptapi.io/${ticker}/qrcode/?${query}`)
        .then(response => response.json())
        .then(data => {

            setIsLoading(false);

            var qr_da = `data:image/png;base64,${data.qr_code}`;

            setQRImage(qr_da);

        });
    
    }catch (error) {
        console.log(error)
    }
}
  

     //USE EFFECT
 useEffect(() => {

    FetchTransactionStatus();

  }, []);

  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="View Transaction" />

    <Loader loading={loading} />


    {(paymentStatus == 1) && 
        <View style={styles.paymentStatus}>
        <Image source={icons.confirm_payment} 
         style={{
             height: wp(10), width: wp(10), resizeMode: 'contain'
         }}
        />
        <Text style={styles.txtPymConfirm}>Payment was succesfull!</Text>
     </View>
    }

    {(paymentStatus == 0) && 
        <View style={styles.pendingPayment}>
        <Image source={icons.pending_payment} 
         style={{
             height: wp(10), width: wp(10), resizeMode: 'contain', tintColor: COLORS.orangeColor
         }}
        />
        <Text style={styles.txtPymPending}>Payment is pending!</Text>
     </View>
    }
 

    <View style={styles.carBoxName}>
        <View>
             <Text style={styles.cardTitle}>Payment Currency</Text>
             <View style={styles.iconLine}>
    <Image source={icons.usdt_icon} 
        style={{
            height: wp(10), width: wp(10), resizeMode: 'contain'
        }}
    />
    <Text style={styles.txtCurr}>{details.CURRENCY}</Text>
    </View>
        </View>
        <View>
             <Text style={styles.cardTitle}>Amount</Text>
             <Text style={styles.txtAmount}>$ {details.TOTAL_AMOUNT}</Text>
        </View>
    </View>


    <View style={styles.listBox}>
    <Text style={styles.titleHdr}>Make payment using the details below</Text>
</View>

<View style={styles.paymentBox}>
    <Text style={styles.txtWallet}>Wallet Address</Text>
    <View style={styles.walletBox}>
        <Text style={styles.txtid}>{details.WALLET_ADDRESS_IN}</Text>
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
        <Text style={styles.txtid}>Send {details.TOTAL_AMOUNT} USD to the wallet 
        address</Text>
        <TouchableOpacity>
            <Image source={icons.copyText} 
                style={{
                    height: wp(4), width: wp(4), tintColor: COLORS.backBtnBG, resizeMode: 'contain'
                }}
            />
        </TouchableOpacity>
    </View>

   {(qrImage != '') &&
        <Image source={{uri: qrImage}} 
            style={{
                height: wp(50), width: wp(50), marginBottom:wp(3), marginTop:wp(5), alignSelf:'center', resizeMode: 'contain'
            }}
        />
   } 

   {(qrImage == '') &&

    <View style={styles.noImage}>
        <Image source={icons.brokenImage} 
            style={{
                width: wp(9), height: wp(9), marginBottom: wp(3), 
                tintColor: COLORS.textBoxStrokeColor,
                resizeMode: 'contain'
            }}
        />
        <Text style={styles.noImgTxt}>Unable to load QR Image</Text>
    </View>

   }
</View>

{(paymentStatus == 0) && 
    <View style={{marginHorizontal: wp(4), marginTop: wp(5)}}>
        <Button title="Confirm Payment" onPress={() => navigation.navigate("PaymentSuccess", {cardName : "", quantity : "", currency : "", currencyImg: "", amount: ""})} />
    </View>
}



{(paymentStatus == 1) && 
    <View style={{marginHorizontal: wp(4), marginTop: wp(5)}}>
        <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
}


    
    </ScrollView>
  )
}

export default ViewTransactionDetails

const styles = StyleSheet.create({
    paymentStatus: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: COLORS.greenText,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(10),
        marginHorizontal: wp(10),
        marginVertical: wp(4.5),
        padding: wp(2),
        columnGap: wp(2)
    },
    pendingPayment: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: COLORS.orangeColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(10),
        marginHorizontal: wp(10),
        marginVertical: wp(4.5),
        padding: wp(2),
        columnGap: wp(2)
    },
    txtPymConfirm: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        color: COLORS.greenText,
        fontSize: wp(3.5)
    },
    txtPymPending: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        color: COLORS.orangeColor,
        fontSize: wp(3.5)
    },
    noImgTxt: {
        textAlign: 'center',
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.textBoxStrokeColor
    },
    noImage: {
        width: wp(45),
        height: wp(40),
        borderColor: COLORS.textBoxStrokeColor,
        borderWidth: 1,
        borderStyle: 'solid',
        alignSelf: 'center',
        marginTop: wp(5),
        marginBottom: wp(3),
        padding: wp(4),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(3)
    },
    cautionTxt: {
        color: COLORS.orangeColor,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.4)
    },
    cautionWindow: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: wp(4),
        marginVertical: wp(3),
        borderColor: COLORS.orangeColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: wp(3.5),
        padding: wp(1.5),
        paddingLeft:wp(2),
        columnGap: wp(2)
    },
    txtCurr: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(5), 
        color: COLORS.White
    },
    txtAmount: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(5), 
        color: COLORS.White,
        alignSelf: 'flex-end',
        marginTop: wp(3)
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.tabBGColor,
        marginHorizontal: wp(3),
        borderRadius: wp(5),
        paddingVertical: wp(3),
        paddingHorizontal: wp(4)
    },
    txtid: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        color: COLORS.White,
        fontSize: wp(3.5)
    },
    walletBox: {
        backgroundColor: COLORS.bgColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: wp(2),
        borderRadius: wp(2.5)
    },
    txtWallet: {
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.primaryColor,
        fontSize: Platform.OS === 'android' ? wp(3) : wp(3.4),
        marginBottom: wp(1),
        marginLeft: wp(2)
    },
    paymentBox: {
        backgroundColor: COLORS.tabBGColor,
        marginHorizontal: wp(3),
        borderRadius: wp(7),
        paddingVertical: wp(4),
        paddingHorizontal: Platform.OS === 'android' ? wp(2) : wp(2)
    },
    titleHdr: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize:  Platform.OS === 'android' ? wp(3.1) : wp(3.5),
        color: COLORS.textGray,
        marginBottom: Platform.OS === 'android' ? wp(1.5) : wp(1.5)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(5)
    }
})