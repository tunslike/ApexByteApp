import React, { useContext, useState, useEffect } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  TextInput,
  View, 
  Alert,
  FlatList,
  ScrollView,
  Dimensions} from 'react-native';
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { GiftCardList, InnerHeader, Loader, Button } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Modal from 'react-native-modal';
import { useFocusEffect } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';


const RedeemCardScreen = ({navigation, route}) => {


  const {cardId, cardName, cardType, cardImage, amount, quantity, 
                  redeemInstructure, dateCreated, dateRedeemed,
                  cardStatus, transid, email, phone} = route.params;

  const access_token = useSelector((state) => state.account.reloadlyAccessToken);

  const [loading, setIsLoading] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [cardList, setCardList] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [pinCode, setPinCode] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const showCardDetails = (cardNumber, pinCode) => {
    setCardNumber(cardNumber);
    setPinCode(pinCode)
    toggleModal();
  }


  const UpdateRedeemStatus = () => {

  axios.get(APIBaseUrl.developmentUrl + `product/setRedeemStatus/${cardId}`,{},{
      headers: {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3331'
      }
  })
  .then(response => {
      
  })
  .catch(error => {
      console.log(error + "1");
  });
}

const copyCardNumber = async (textCopy) => {

  Clipboard.setString(textCopy);

  Toast.show({
    type: 'success',
    text1: 'Card number copied!',
  });
  
};

const copyRedeemInstructure = async (textCopy) => {


  Clipboard.setString(textCopy);

  Toast.show({
    type: 'success',
    text1: 'Redeem instruction copied!',
  });

}

const copyPinCode = async (textCopy) => {

  Clipboard.setString(textCopy);

  Toast.show({
    type: 'success',
    text1: 'Pin code copied!',
  });
  
};


    //validate account number
    const postCardRedemption = () => {
      
      Alert.alert("ApexByte", 'Proceed to redeem card? Action not irreversible', [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => processRedeemCard()},
      ]);
  
    }// end function


    function maskCard(num) {
      return `${'*'.repeat(num.length - 4)}${num.substr(num.length - 4)}`;
    }

    // function to test using fetch
    const processRedeemCard = async () => {

          setIsLoading(true);

          try {

              const headers = { 
                  'Authorization': `Bearer ${access_token}`, 
                  'Accept' : 'application/com.reloadly.giftcards-v1+json'
              };
              await fetch(`https://giftcards-sandbox.reloadly.com/orders/transactions/${transid}/cards`, { headers })
              .then(response => response.json())
              .then(data => {

                UpdateRedeemStatus();

                setCardList(data)

                setIsLoading(false);
                  

              });
              
          } catch (error) {
            setIsLoading(false);
              console.log(error)
          }
    }
  // end of function

    useFocusEffect(
      React.useCallback(() => {
        
          if(cardStatus == 'Redeemed') {
            processRedeemCard();
          }

      }, [])
    );
    


  return (
    <View
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title={`Redeem Gift Card`} />

    <Loader loading={loading} />

    <View style={styles.cardBody}>
    <Text style={styles.cardTitle}>{cardType}</Text>
    <View style={styles.cardBox}>

    {(cardType == 'Gift Card') &&
      <Image 
      source={{uri: `${cardImage}`}}
      style={{
        height: wp(18), width: wp(18), resizeMode:'contain'
      }}
    />
    }

    {(cardType == 'Virtual Credit Card') && 
      <Image 
      source={images.virtualCard}
      style={{
        height: wp(18), width: wp(18), resizeMode:'contain'
      }}
    />
    }
  

    <View style={{flex:1}}>
      <Text style={styles.cardName}>{cardName}</Text>
      <Text style={styles.cardDesc}>Purchased: {moment(dateCreated).format('DD-MMM-YYYY')}</Text>
    </View>

    <View>
    <Text style={styles.cardAmount}>${amount}</Text>
    <Text style={styles.quanTxt}>Qty: {quantity}</Text>
    </View>
    
    </View>
    </View>

    <View style={styles.listBox}>
    <Text style={styles.titleHdr}>Redeem Details</Text>
</View>


    <View style={styles.paymentBox}>

    <View style={{marginBottom: wp(8)}}>
      <Text style={styles.txtWallet}>{cardList.length} Card Loaded</Text>


      {
        (cardList.length > 0) &&

        cardList.map((item, index) => {
          return (
            <View key={index} style={styles.walletBox}>
            <Text style={styles.txtid}>{maskCard(item.cardNumber)}</Text>
            <TouchableOpacity onPress={() => showCardDetails(item.cardNumber, item.pinCode)}>
              <Text style={styles.cardList}>Show</Text>
            </TouchableOpacity>
          </View>
          )
        }) 
      }

      {(cardList.length == 0) &&
        <View style={{marginHorizontal: wp(2), marginVertical: wp(1)}}>
          <Text style={{fontFamily: FONTS.POPPINS_REGULAR, 
            fontSize: wp(3), color: COLORS.textGray}}>Your cards will show here!</Text>
        </View>
      }

    {/**
       <View style={styles.walletBox}>
      <Text style={styles.txtid}>8938******09309***</Text>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.cardList}>Show</Text>
      </TouchableOpacity>
    </View>
      */}
  

    </View>
    



    {/**

       <Text style={styles.txtWallet}>Card Number</Text>
    <View style={styles.walletBox}>
        <Text style={styles.txtid}>****************</Text>
        <TouchableOpacity>
            <Image source={icons.copyText} 
                style={{
                    height: wp(4), width: wp(4), tintColor: COLORS.backBtnBG, resizeMode: 'contain'
                }}
            />
        </TouchableOpacity>
    </View>

    <Text style={styles.txtWallet}>Pin Code</Text>
    <View style={styles.walletBox}>
        <Text style={styles.txtid}>****</Text>
        <TouchableOpacity>
            <Image source={icons.copyText} 
                style={{
                    height: wp(4), width: wp(4), tintColor: COLORS.backBtnBG, resizeMode: 'contain'
                }}
            />
        </TouchableOpacity>
    </View>

      
      */}
      

    <Text style={styles.txtWallet}>Redeem Instruction</Text>
    <View style={styles.walletWindow}>
    <ScrollView>
      <Text style={styles.txtWord}>{decodeURI(redeemInstructure)}</Text>     
    </ScrollView>
     
        <TouchableOpacity
          onPress={() => copyRedeemInstructure(decodeURI(redeemInstructure))}
        >
            <Image source={icons.copyText} 
                style={{
                    height: wp(4), width: wp(4), tintColor: COLORS.backBtnBG, resizeMode: 'contain'
                }}
            />
        </TouchableOpacity>
    </View>
    {(cardStatus == 'Redeemed') &&
      <Text style={styles.txtRdm}>This card was redeemed on: {moment(dateRedeemed).format('DD-MMM-YYYY, hh:mm:a')}</Text>
    }

    </View>
    
    <View style={{marginHorizontal: wp(4), marginTop: wp(1)}}>
    <TouchableOpacity 
    disabled={(cardList.length > 0) ? true : false}
    onPress={() => postCardRedemption()}
    style={[styles.btnRedeem, {backgroundColor: (cardList.length > 0) ? COLORS.checkBGColor : COLORS.orangeColor}]}>
        {
          (cardList.length > 0) &&
          <View style={{flexDirection: 'row', columnGap: wp(1), justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.txtBtn, {color: (cardList.length > 0) ? COLORS.tabBGColor : null}]}>Card Reedemed</Text>
            <Image source={icons.check_icon} 
              style={{
                width: wp(5), height: wp(5), resizeMode: 'contain', tintColor: COLORS.tabBGColor
              }}
            />
            
          </View>
        }

        {
          (cardList.length == 0) &&
          <Text style={styles.txtBtn}>Redeem Now</Text>
        }
                
    </TouchableOpacity>

    <TouchableOpacity
    onPress={() => navigation.navigate("Home")}
    style={styles.btnBackDash}>
            <Text style={styles.txtBack}>Back to Dashboard</Text>
    </TouchableOpacity>
</View>


<Modal isVisible={isModalVisible}>
<View style={styles.modalWindow}>
 <TouchableOpacity onPress={toggleModal}>
    <Image source={icons.close_modal} 
        style={{
          height: wp(10), width: wp(10), tintColor: COLORS.orangeColor, resizeMode: 'contain',
          alignSelf: 'center'
        }}
    />
 </TouchableOpacity>

 <View style={{marginTop: wp(5)}}>

    <Text style={styles.txtWallet}>Card Number</Text>
    <View style={styles.walletBox}>
    <Text style={styles.txtid}>{cardNumber}</Text>
    <TouchableOpacity
        onPress={() => copyCardNumber(cardNumber)}
    >
    <Image source={icons.copyText} 
    style={{
      height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.orangeColor
    }}
/>
    </TouchableOpacity>
    </View>

    <Text style={styles.txtWallet}>Pin Code</Text>
    <View style={styles.walletBox}>
    <Text style={styles.txtid}>{pinCode}</Text>
    <TouchableOpacity
      onPress={() => copyPinCode(pinCode)}
    >
      <Image source={icons.copyText} 
          style={{
            height: wp(5), width: wp(5), resizeMode: 'contain', tintColor: COLORS.orangeColor
          }}
      />
    </TouchableOpacity>
    </View>
 </View>

</View>
</Modal>

{/*
  <Button title="Show modal" onPress={toggleModal} />
  <Modal isVisible={isModalVisible}>
<View style={{
  backgroundColor: COLORS.darkGray, width: '100%', height: wp(10)
}}>
  <Text>Hello!</Text>

  <Button title="Hide modal" onPress={toggleModal} />
</View>
</Modal>
  */}


    </View>
  )
}


const styles = StyleSheet.create({
  txtRdm: {
    fontFamily: FONTS.POPPINS_REGULAR,
    marginLeft: wp(3),
    fontSize: wp(3),
    color: COLORS.orangeColor
  },
  quanTxt: {
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(3),
      color: COLORS.textGray,
      alignSelf: 'flex-end'
  },
  modalWindow: {
    backgroundColor: COLORS.darkGray, 
    paddingHorizontal: wp(3),
    paddingTop: wp(1.8),
    paddingBottom: wp(5),
    borderRadius: wp(3),
    width: '100%', 

  },
  cardList: {
      fontFamily: FONTS.POPPINS_REGULAR,
      color: COLORS.orangeColor,
      fontSize: wp(3)
  },
  txtBack: {
      fontFamily: FONTS.POPPINS_MEDIUM,
      fontSize: wp(3.5),
      color: COLORS.primaryColor
  },
  btnBackDash: {
    marginTop: wp(7),
    alignItems: 'center',
  },
  txtBtn: {
    color: COLORS.White,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: Platform.OS === 'android' ? wp(3.4) : wp(3.8),
    textAlign: 'center'
},
btnRedeem: {
    backgroundColor: COLORS.orangeColor,
    borderRadius: wp(4),
    marginTop: wp(3),
    paddingVertical: Platform.OS === 'android' ? wp(4) : wp(4.3)
},
  txtid: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    color: COLORS.White,
    fontSize: wp(3.5)
},

txtWord: {
  fontFamily: FONTS.POPPINS_REGULAR,
  color: COLORS.textGray,
  fontSize: wp(3)
},
  walletBox: {
    backgroundColor: COLORS.bgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(2),
    borderRadius: wp(2.5),
    marginBottom: wp(2)
},

walletWindow: {
  backgroundColor: COLORS.bgColor,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: wp(2),
  height: wp(45),
  overflow: 'scroll',
  borderRadius: wp(2.5),
  marginBottom: wp(5),
},

txtWordWinodw: {
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  maxWidth: '100%', // Ensure the view doesn't exceed its parent width
},
txtWallet: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.primaryColor,
    fontSize: Platform.OS === 'android' ? wp(3) : wp(3.4),
    marginBottom: wp(1),
    marginLeft: wp(2)
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
},

paymentBox: {
  backgroundColor: COLORS.tabBGColor,
  marginHorizontal: wp(3),
  borderRadius: wp(7),
  paddingVertical: wp(4),
  paddingHorizontal: Platform.OS === 'android' ? wp(2) : wp(2)
},

  cardAmount: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4.5),
    color: COLORS.primaryColor
  },
  cardDesc: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3),
    color: COLORS.textGray,
    marginTop: wp(0.5)
  },
  cardName: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4),
    color: COLORS.White,
  },

  cardTitle: {
    color: COLORS.primaryColor,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  cardBody: {
    backgroundColor: COLORS.tabBGColor,
    marginHorizontal: wp(3),
    borderRadius: wp(5),
    paddingVertical: wp(2),
    marginTop: wp(4),
    paddingHorizontal: wp(3)
  },
  cardBox : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: wp(3)
  }

})

export default RedeemCardScreen;