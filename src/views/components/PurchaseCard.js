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

const PurchaseCard = ({title, desc, image, onPress}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={styles.container}
    >
      <Image source={image} 
        style={{
            width: wp(17), height: wp(17), resizeMode: 'contain'
        }}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    desc: {
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.primaryColor,
        fontSize: wp(3)
    },
    title: {
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.White,
        fontSize: wp(3.8)
    },
    container: {
        backgroundColor: COLORS.tabBGColor,
        borderRadius: wp(8),
        paddingVertical: Platform.OS === 'android' ? wp(6.7) : wp(7.5),
        marginBottom: wp(3),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default PurchaseCard;