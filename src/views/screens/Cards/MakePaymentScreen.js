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
import uuid from 'react-native-uuid';
import {Buffer} from 'buffer';
import md5 from 'md5'; 

const MakePaymentScreen = ({navigation, route}) => {

    const {cardName, quantity, network, currency, currencyImg, giftImage, amount} = route.params;

    const entry_id = useSelector((state) => state.account.entry_id);
    const [loading, setIsLoading] = useState(false);
    const [orderID, setOrderID] = useState(uuid.v4());
    const [lifetime, setLifetime] = useState(1800);
    const [cryptapiData, setCryptoAPIData] = useState('');
    const [qrImage, setQRImage] = useState('');


    const ProcessOrderRequest = (data) => {

          //data
          const data_order = {
            entry_id: entry_id,
            order_id: orderID,
            order_name : `${cardName} Gift Card`, 
            amount : amount, 
            quantity : quantity, 
            total_amount : amount * quantity,
            currency: currency, 
            crypto_market : USDT_Account.ticker,
            wallet_address_in : data.address_in, 
            wallet_address_out :data.address_out,
            callback_url : data.callback_url
        }
    
      axios.post(APIBaseUrl.developmentUrl + 'product/createPaymentRequest',data_order,{
          headers: {
            'Content-Type' : 'application/json' 
          }
      })
      .then(response => {
    
          setIsLoading(false)
    
          console.log('Request has been created.')
    
          
      })
      .catch(error => {
          setIsLoading(false)
          console.log(error + "1");
      });
    }
    

    const CryptAPIReceivePayment = async () => {

        const query = new URLSearchParams({
            callback: `${USDT_Account.callback_url}?order_id=${orderID}`,
            address: USDT_Account.USDT_TRC20_Wallet_Address,
            pending: '0',
            confirmations: '1',
            email: USDT_Account.emailAddress,
            post: '1',
            json: '1',
            priority: 'default',
            multi_token: '0',
            convert: '0'
          }).toString();

          setIsLoading(true);

          

          console.log('************* Request is Sent ***************')

          try {

            const ticker = USDT_Account.ticker;
            await fetch(`https://api.cryptapi.io/${ticker}/create/?${query}`,)
            .then(response => response.json())
            .then(data => {

                console.log('*************** Request is back *****************')
                console.log('')

                if(data != null) {

                    console.log(data)
                    setCryptoAPIData(data);

                    ProcessOrderRequest(data);

                    GenerateCryptoAPIQRIamge(data.address_in);
                }

                console.log('')
                console.log('*************** Request is back *****************')

            })
        

          }catch (error) {
              setIsLoading(false)
          }
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

    // function to test using fetch
    const createCryptoPaymentInvoice = async () => {

        const bodyRequest = {
            "amount": "20",
            "currency": "USDT",
            "order_id": "6756ed63-e02b-444b-b82c-9f66d7dde6a",
        }

        let encodePayload = Buffer.from('', 'utf-8').toString('base64');
        let signedMD5 = md5(encodePayload + CryptomusKeys.payment_api_key);

        console.log(signedMD5)
  
            setIsLoading(true);
  
            try {
  
                const options = {
                  method: 'POST',
                  headers: {
                    'merchant': `${CryptomusKeys.merchant_id}`,
                    'sign' : `${signedMD5}`,
                    'Content-Type' : 'application/json' 
                  },
                  body: {
                    "amount": "20",
                    "currency": "USDT",
                    "order_id": "6756ed63-e02b-444b-b82c-9f66d7dde6a",
                  },
                  };

                await fetch(`https://api.cryptomus.com/v1/payment`, options)
                .then(response => response.json())
                .then(data => {
    
                    setIsLoading(false);


                    console.log("********** Response from Service ****************")
                    console.log('')
  
                    console.log(data);

                    console.log('');
                    console.log('*********** End of Response ***********')

                });
                
            } catch (error) {
              setIsLoading(false)
            }
        }
        // end of function

 //USE EFFECT
 useEffect(() => {

    if(cryptapiData.length == 0) {
        console.log('new loadings');
    }else {
        console.log('no loading...')
    }


   CryptAPIReceivePayment();
   //GenerateCryptoAPIQRIamge();
  
  }, []);


  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="Make Payment" />

    <Loader loading={loading} />

    <View style={styles.cautionWindow}>
        <Image 
            source={icons.caution}
            style={{
                height: wp(6), width: wp(6), resizeMode: 'contain',
                tintColor: COLORS.orangeColor
            }}
        />
        <Text style={styles.cautionTxt}>Your payment will be expired in 30 minutes!</Text>
    </View>

    <View style={styles.carBoxName}>
        <View>
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
        <View>
             <Text style={styles.cardTitle}>Amount</Text>
             <Text style={styles.txtAmount}>$ {amount}</Text>
        </View>
    </View>

    {/**
        <View>
    <Text style={styles.cardTitle}>Payment Currency</Text>
    <View style={styles.iconLine}>
    <Image source={currencyImg} 
        style={{
            height: wp(10), width: wp(10), resizeMode: 'contain'
        }}
    />
    <Text style={styles.txtCurr}>{currency}</Text>
    </View>
    <View>
        <Text style={styles.cardTitle}>Amount</Text>
        <Text>$30</Text>
    </View>
    </View>
        
        */}

    <View style={styles.listBox}>
        <Text style={styles.titleHdr}>Make payment using the details below</Text>
    </View>

    <View style={styles.paymentBox}>
        <Text style={styles.txtWallet}>Wallet Address</Text>
        <View style={styles.walletBox}>
            <Text style={styles.txtid}>{cryptapiData.address_in}</Text>
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

    <View style={{marginHorizontal: wp(4), marginTop: wp(5)}}>
        <Button disabled={(cryptapiData == '') ? true : false} title="Confirm Payment" onPress={() => navigation.navigate("PaymentSuccess", {cardName : "", quantity : "", currency : "", currencyImg: "", amount: ""})} />
    </View>
 
    
      
    </ScrollView>
  )
}

export default MakePaymentScreen

const styles = StyleSheet.create({
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