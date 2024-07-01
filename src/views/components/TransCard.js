import React from 'react'
import { StyleSheet, 
    Text, 
    View,
    Image, 
    Keyboard,
   TouchableOpacity, 
   Platform} from 'react-native'
    import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const TransCard = ({narration, date, amount, status}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgbox}>
            <Image source={icons.vcard} 
                style={{
                    height: wp(5), width: wp(5), tintColor: COLORS.darkGray, resizeMode: 'contain'
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
    </View>
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
        borderRadius: wp(2),
        paddingHorizontal: wp(2),
        paddingVertical: wp(1.8)
    },
    container: {
        backgroundColor: COLORS.White,
        borderRadius: wp(3),
        paddingHorizontal: wp(2),
        paddingVertical: Platform.OS === 'ios' ? wp(2) : null,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        columnGap: wp(3),
        marginBottom: wp(2),
    }
})

export default TransCard;