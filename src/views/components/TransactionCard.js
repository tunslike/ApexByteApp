import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TouchableOpacity, 
        Platform} from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const TransactionCard = ({narration, onPress, date, amount, status}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.imgbox}>
    <Image source={icons.vcard} 
        style={{
            height: wp(5), width: wp(5), tintColor: COLORS.checkBGColor, resizeMode: 'contain'
        }}
    />
</View>
<View style={styles.txtTitle}>
        <Text style={styles.txtNarration}>{narration}</Text>
        <Text style={styles.txtDate}>{date}</Text>
</View>
<View style={{alignItems: 'flex-end'}}>
        <Text style={styles.txtAmt}>{amount}</Text>
        <Text style={styles.txtStatus}>{status}</Text>
</View>
    </TouchableOpacity>
  )
}

export default TransactionCard

const styles = StyleSheet.create({
    txtNarration: {
        color: COLORS.White,
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3.3)
    },
    txtDate: {
        color: COLORS.textGray,
        fontFamily: FONTS.POPPINS_LIGHT,
        fontSize: wp(3),
        marginLeft: wp(1)
    },
    txtAmt: {
        color: COLORS.orangeColor,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(3.5)
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
        backgroundColor: COLORS.bgColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(2),
        paddingHorizontal: wp(2),
        paddingVertical: wp(1.8)
    },
    container: {
        backgroundColor: COLORS.tabBGColor,
        paddingVertical: wp(2.5),
        paddingHorizontal: wp(2.5),
        borderRadius: Platform.OS === 'android' ? wp(4.5) : wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: COLORS.backBtnBG,
        borderWidth:1,
        borderStyle: 'solid',
        columnGap: wp(3),
        marginBottom: wp(2.5)
    }
})