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
import {Buffer} from 'buffer';
import { COLORS, images, FONTS, icons, APIBaseUrl, CryptomusKeys } from '../../../constants';
import { CryptoCard, InnerHeader, Loader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import md5 from 'md5'; 

const dataPayment = [
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
  const [loading, setIsLoading] = useState(null);
  const [data, setData] = useState([]);


  // function to test using fetch
    const loadCryptomusPaymentServiceUpdate = async () => {

      let encodePayload = Buffer.from('', 'utf-8').toString('base64');
      let signedMD5 = md5(encodePayload + CryptomusKeys.payment_api_key);

          setIsLoading(true);

          try {

              const options = {
                method: 'POST',
                headers: {
                  'merchant': `${CryptomusKeys.merchant_id}`,
                  'sign' : `${signedMD5}`,
                  'Content-Type' : 'application/json' 
                },
                body: '',
                };

              await fetch(`https://api.cryptomus.com/v1/payment/services`, options)
              .then(response => response.json())
              .then(data => {
  
                  setIsLoading(false);

                  let filteredData = [];

                  console.log(data.result.length)
                  
                  for (let i=0; i < data.result.length; i++) {
                    if(data.result[i].is_available == true && data.result[i].currency == 'USDC') {
                      filteredData = [...filteredData, data.result[i]];
                    }
                }
  
                  console.log(filteredData.length);
              });
              
          } catch (error) {
            setIsLoading(false)
          }
      }
      // end of function

  const fetchCrpytoPaymentNetwork = () => {

    setIsLoading(true);

  axios.get(APIBaseUrl.developmentUrl + 'product/fetchCryptoNetworks',{},{
      headers: {
        'Content-Type' : 'application/json' 
      }
  })
  .then(response => {

      setIsLoading(false)

      console.log(response.data)
      setData(response.data);
      
  })
  .catch(error => {
      setIsLoading(false)
      console.log(error + "1");
  });
}

const PaymentImageMatchAlgorithm = (network) => {

  if(network == '') 
      return;

  //match rice picture
  if(network.toLowerCase().indexOf("eth") > -1) {

      return require("../../../assets/icons/eth_icon.png")

  }else if(network.toLowerCase().indexOf("btc") > -1) {

      return require("../../../assets/icons/btc_icon.png")

}else if(network.toLowerCase().indexOf("xmr") > -1) {

  return require("../../../assets/icons/xmr_icon.png")

}else if(network.toLowerCase().indexOf("usdt") > -1) {

  return require("../../../assets/icons/usdt_icon.png")

}
else if(network.toLowerCase().indexOf("ltc") > -1) {

  return require("../../../assets/icons/ltc_icon.png")

}
else if(network.toLowerCase().indexOf("doge") > -1) {

  return require("../../../assets/icons/dodge_icon.png")

}
else if(network.toLowerCase().indexOf("sol") > -1) {

  return require("../../../assets/icons/sol_icon.png")

}
else if(network.toLowerCase().indexOf("trx") > -1) {

  return require("../../../assets/icons/tron_icon.png")

}
  else{

      return;
  }
}


 //USE EFFECT
 useEffect(() => {

  fetchCrpytoPaymentNetwork();

}, []);

  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <Loader loading={loading} />
    <InnerHeader onPress={() => navigation.goBack()} title="Choose Crypto Payment" />

    <View style={styles.carBoxName}>
        <Text style={styles.cardTitle}>Your Order</Text>
        <View style={styles.innerBox}>
        <Image source={{uri: `${image}`}} 
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

        {
          data.map((item) => {
            return (
              <CryptoCard key={item.NETWORK_ID} 
                title={item.CURRENCY} 
                image={PaymentImageMatchAlgorithm(item.CURRENCY)}
                network={item.NETWORK}
                onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: item.CURRENCY, network: item.NETWORK,
                                                  currencyImg: PaymentImageMatchAlgorithm(item.CURRENCY), amount: totalAmount, giftImage: image})}
              />
            )
          })
        }

        {/**
          <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "BTC", currencyImg: icons.btc_icon, amount: totalAmount, giftImage: image})} title="BTC" image={icons.btc_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "ETH", currencyImg: icons.eth_icon, amount: totalAmount, giftImage: image})} title="ETH" image={icons.eth_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "USDT", currencyImg: icons.usdt_icon, amount: totalAmount, giftImage: image})} title="USDT" image={icons.usdt_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "XMR", currencyImg: icons.xmr_icon, amount: totalAmount, giftImage: image})} title="XMR" image={icons.xmr_icon} />
        <CryptoCard onPress={() => navigation.navigate("MakePayment", {cardName:cardName, quantity: quantity, currency: "LTC", currencyImg: icons.ltc_icon, amount: totalAmount, giftImage: image})} title="LTC" image={icons.ltc_icon} />
          */}

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
        marginBottom: wp(3)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(8)
    }
})

export default CryptoPayment;