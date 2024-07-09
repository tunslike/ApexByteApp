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
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { Button, InputTextbox, InnerHeader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const PayGiftCardRequest = ({navigation, route}) => {

  const {cardName, cardImage, currencyCode, minRecepAmt,
         maxRecepAmt, minSenderAmt, maxSenderAmt, cardType} = route.params;

  const [minValue, setMinValue] = useState(25);
  const [cardAmount, setCardAmount] = useState('30');
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const increaseCount = (type) => {
    if(type == 1) {
      setQuantity(quantity + 1)
  }else if(type == 0) {
      if(quantity > 1) {
        setQuantity(quantity - 1)
      }
  }
  }

  return (
    <ScrollView
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title="Buy Gift Card" />

    <View style={styles.carBoxName}>

      <Image 
        source={cardImage}
        style={{
          height: wp(18), width: wp(30), resizeMode: 'contain'
        }}
      />
      <View>
        <Text style={styles.cardName}>{cardName}</Text>
        <Text style={styles.maxAmt}>Max Amount: $500</Text>
      </View>
    </View>

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
    </View>

    <View style={{marginHorizontal: wp(4), marginTop: wp(10)}}>
    <Button
      onPress={() => navigation.navigate("CryptoPayment", {totalAmount: (quantity * cardAmount), quantity: quantity,  cardName, cardName, image:cardImage})}
      disabled={(cardAmount == 0) ? true : false} 
      title="Pay with Cryptocurrency" 
    />
    </View>
 
    </ScrollView>
  )
}

export default PayGiftCardRequest

const styles = StyleSheet.create({
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
        padding: wp(2.5),
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
      marginBottom: wp(5)
  },
    txtWallet: {
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.primaryColor,
        fontSize: Platform.OS === 'android' ? wp(3) : wp(3.4),
        marginBottom: wp(2),
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
        marginTop: wp(8)
    }
})