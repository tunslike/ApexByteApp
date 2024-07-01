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

const RebuyCard = ({onPress, amount, name, cardType}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={styles.container}
    >
        <View style={styles.hdr}>
            <View style={styles.cardbg}>
                <Image source={icons.cards} 
                    style={{
                        height: wp(7), width: wp(7), resizeMode: 'contain', tintColor: COLORS.textBoxStrokeColor
                    }}
                />
            </View>
            <Text style={styles.txtAmt}>${amount}</Text>
        </View> 
        <Text style={styles.txtName}>{name}</Text>
        <Text style={styles.txtCard}>{cardType}</Text>
    </TouchableOpacity>
  )
}

export default RebuyCard;

const styles = StyleSheet.create({
    txtCard: {
        color: COLORS.White,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize:  Platform.OS === 'android' ? wp(3.2) : wp(3.5)
    },
    txtName: {
        color: COLORS.textGray,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: Platform.OS === 'android' ? wp(2.8) : wp(3)
    },
    txtAmt: {
        color: COLORS.primaryColor,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: wp(4.3)
    },
    cardbg: {
        backgroundColor: COLORS.ButtonTxtColor,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp(1),
        borderRadius: wp(3)
    },
    hdr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: wp(4)
    },
    container: {
        backgroundColor: COLORS.tabBGColor,
        borderRadius: wp(6),
        padding: wp(4),
        width: wp(35),
        height: wp(30),
        borderColor: COLORS.backBtnBG,
        borderWidth: 1,
        borderStyle: 'solid',
        marginRight: wp(4)
    }
})