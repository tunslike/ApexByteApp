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
  Dimensions,
  TextInput} from 'react-native';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { Button, InputTextbox, InnerHeader, Loader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup'

const ValidateFieldScheme = Yup.object().shape({
    cardname: Yup.string()
        .min(6, 'Minimum characters is 6!')
        .max(25, 'Maximum characters is 25!')
        .required('Enter card name'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Enter your email address'),
    phone: Yup.string()
      .min(11, 'Phone number must be 11 digits')
      .max(11, 'Phone number must be 11 digits')
      .matches(/^[0-9]+$/, 'Enter a valid phone number')
})

const BuyGiftCardScreen = ({navigation, route}) => {

  const access_token = useSelector((state) => state.account.reloadlyAccessToken);

  const [minValue, setMinValue] = useState(25);
  const [cardAmount, setCardAmount] = useState('20');
  const [totalCardAmount, setTotalCardAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cardName, setCardName] = useState('Vanilla');
  const [loading, setIsLoading] = useState(null);
  const [virtualCard, setVirtualCard] = useState([]);

    // function to test using fetch
    const loadVirtualCardDetails = async () => {

        setIsLoading(true);

        try {

            const headers = { 
                'Authorization': `Bearer ${access_token}`, 
                'Accept' : 'application/com.reloadly.giftcards-v1+json'
            };
            await fetch(`https://giftcards-sandbox.reloadly.com/products?productName=${cardName}`, { headers })
            .then(response => response.json())
            .then(data => {

                setIsLoading(false);

                setVirtualCard(data.content[0])
                console.log(data.content[0])
                
            });
            
        } catch (error) {
            console.log(error)
        }
  }
// end of function

  //USE EFFECT
  useEffect(() => {

        loadVirtualCardDetails();
    
  }, []);

  const increaseCount = (type) => {

    if(type == 1) {
      setQuantity(quantity + 1)
    }else if(type == 0) {
        if(quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
  }

  const makeCryptoPayment = () => {
    if(cardAmount < 20 || cardAmount > 100) {
        Alert.alert("ApexByte", "Card amount must be between 20 and 100")
        return;
    }

    navigation.navigate("CryptoPayment", {totalAmount:(cardAmount * quantity), cardAmount:cardAmount, cardType: 'Virtual Credit Card', cardName:'Virtual Credit Card', productID:virtualCard.productId, 
      quantity:quantity, image:images.virtualCard, redeemInstruction: encodeURI(`${virtualCard.redeemInstruction.concise} ${virtualCard.redeemInstruction.verbose}`)});

  }


  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <Loader loading={loading} />
    <InnerHeader onPress={() => navigation.goBack()} title="Buy Virtual Card" />

    <View style={styles.carBoxName}>

    <Image 
    source={images.virtualCard}
    style={{
      height: wp(20), width: wp(20), resizeMode: 'contain'
    }}
  />

            <View>
            <Text style={styles.txtProdName}>Virtual Credit Card</Text>
            <Text style={styles.txtDesc}>Amount between: ${virtualCard.minRecipientDenomination} - ${virtualCard.maxRecipientDenomination}</Text>
            </View>
    </View>

    <Formik
        initialValues={{
            cardname: '',
            email: '',
            phone: ''
        }}
        validationSchema={ValidateFieldScheme}
        onSubmit={values => makeCryptoPayment(values)}
    >
    {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
        <View>
    <View style={styles.listBox}>
        <Text style={styles.titleHdr}>Provide order information below</Text>
    </View>

    <View style={styles.paymentBox}>

    <Text style={styles.txtWallet}>Amount</Text>
    <View style={styles.walletBox}>
      <Text style={styles.curSign}>$</Text>
      <InputTextbox 
        phone={1}
        value={cardAmount}
        defaultValue={cardAmount}
        onChange={(text) => setCardAmount(text)}
        maxlength={3}
      />
    </View>

    <Text style={styles.txtWallet}>Quantity</Text> 
    <View style={styles.walletBox}>
    <Text style={styles.txtid}>{quantity}</Text>

    <View style={styles.tabControls}>

    <TouchableOpacity onPress={() => (cardAmount > 0) ? increaseCount(0) : null}>
    <Image source={icons.quan_arrow_left} 
        style={{
            height: wp(6.5), width: wp(6.5), tintColor: COLORS.textGray, resizeMode: 'contain'
        }}
    />
</TouchableOpacity>

<TouchableOpacity onPress={() => (cardAmount > 0) ? increaseCount(1) : null}>
    <Image source={icons.quan_arrow_right} 
        style={{
            height: wp(6.5), width: wp(6.5), tintColor: COLORS.textGray, resizeMode: 'contain'
        }}
    />
</TouchableOpacity>

    </View>
</View>
<Text style={[styles.txtWallet, {marginTop: wp(2)}]}>Total Amount to pay</Text>
<View style={styles.walletBoxAmout}>
  <Text style={styles.curSign}>$</Text> 
  <Text style={styles.txtTotalAmt}>{quantity * cardAmount}</Text> 
</View>

{/*
  <View>
        <Text style={styles.txtWallet}>Card Name</Text>
        <View style={styles.walletBox}>
            <InputTextbox 
            phone={1}
            value={values.cardname}
            onChange={handleChange('cardname')}
        />
        </View>
        {errors.cardname && 
            <Text style={styles.formErrortext}>{errors.cardname}</Text>
        } 
        </View>

        <View>
        <Text style={styles.txtWallet}>Recipient Email</Text>
        <View style={styles.walletBox}>
            <InputTextbox 
            value={values.email}
            onChange={handleChange('email')}
        />
        </View>
        {errors.email && 
            <Text style={styles.formErrortext}>{errors.email}</Text>
          } 
        </View>

        <View>
        <Text style={styles.txtWallet}>Recipient Phone</Text>
        <View style={styles.walletBox}>
            <InputTextbox 
            phone={1}
            value={values.phone}
            onChange={handleChange('phone')}
            maxlength={11}
        />
        </View>
        {errors.phone && 
            <Text style={styles.formErrortext}>{errors.phone}</Text>
          }  
        </View>    
    */}


    </View>
 


    <View style={{marginHorizontal: wp(4), marginTop: wp(6)}}>
    <Button
      onPress={() => makeCryptoPayment()}
      disabled={(cardAmount == 0) ? true : false} 
      title="Pay with Cryptocurrency" 
    />
    </View>
</View>

)}
    </Formik>

    </ScrollView>
  )
}

export default BuyGiftCardScreen

const styles = StyleSheet.create({
    formErrortext: {
        color: COLORS.orangeColor,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3),
        marginLeft : wp(3),
        marginTop: wp(-1),
        marginBottom: wp(2)
    },
    txtDesc: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3),
        color: COLORS.textGray,
        marginTop: wp(2)
    },
txtProdName: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(5), 
    color: COLORS.White
 },
  maxAmt: {
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.textGray,
    fontSize: wp(3),
    marginTop: wp(1)
  },
  cardName: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4),
    color: COLORS.White,
    width: '80%'
  },
  txtTotalAmt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(5), 
    color: COLORS.primaryColor
  },
  tabControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: wp(2)
  },
  curSign: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.textGray,
    fontSize: wp(4.5)
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
        padding: Platform.OS === 'android' ? wp(1) : wp(2.5),
        borderRadius: wp(3.5),
        columnGap: wp(2),
        marginBottom: wp(5)
    },

    walletBoxAmout: {
      backgroundColor: COLORS.bgColor,
      flexDirection: 'row',
      justifyContent:'flex-start',
      alignItems: 'center',
      padding: wp(2.5),
      borderRadius: wp(3.5),
      columnGap: wp(2),
      marginBottom: wp(5)
  },

    walletBox: {
      backgroundColor: COLORS.bgColor,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: wp(2.5),
      borderRadius: wp(3.5),
      columnGap: wp(2),
      marginBottom: wp(2.5)
  },
    txtWallet: {
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.primaryColor,
        fontSize: Platform.OS === 'android' ? wp(3) : wp(3.4),
        marginBottom: wp(1.5),
        marginLeft: wp(2)
    },
    carBoxName: {
      backgroundColor: COLORS.tabBGColor,
      marginHorizontal: wp(3),
      borderRadius: wp(5),
      paddingVertical: wp(4),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: wp(4),
      paddingLeft: wp(3),
      columnGap: wp(3)
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
        marginBottom: Platform.OS === 'android' ? wp(3) : wp(2)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(4)
    }
})