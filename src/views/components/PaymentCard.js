import React from 'react'
import { StyleSheet, 
    Text, 
    View,
    Image, 
    Keyboard,
   TouchableOpacity } from 'react-native'
    import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const PaymentCard = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imgbox}>
            <Image source={icons.wallet_icon} 
                style={{
                    height: wp(7), width: wp(7), tintColor: COLORS.darkGray, resizeMode: 'contain'
                }}
            />
      </View>
      <View style={styles.txtTitle}>
                <Text style={styles.txtNarration}>{title}</Text>
      </View>
        <Image source={icons.arrow_forward} 
            style={{
                height: wp(6), width: wp(6),marginRight: wp(3), tintColor: COLORS.tabActiveColor, resizeMode: 'contain'        
            }}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    txtNarration: {
        color: COLORS.darkGray,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(3.5)
    },
    txtDate: {
        color: COLORS.backBtnBG,
        fontFamily: FONTS.POPPINS_LIGHT,
        fontSize: wp(3)
    },
    txtAmt: {
        color: COLORS.orangeColor,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(4.2)
    },
    txtStatus: {
        color: COLORS.greenText,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3)
    },
    txtTitle: {
        flex: 1
    },
    imgbox: {
        backgroundColor: COLORS.transCardBG,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(3),
        paddingHorizontal: wp(2),
        paddingVertical: wp(1.8)
    },
    container: {
        backgroundColor: COLORS.White,
        borderRadius: wp(3.5),
        padding: wp(2.5),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: wp(4),
        marginBottom: wp(2)
    }
})

export default PaymentCard;