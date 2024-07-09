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

const GiftCard = ({title, onPress, image}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.brandCard}>
    <Image source={image} 
      style={{
        width: wp(20), height: wp(20), resizeMode: 'contain', borderRadius: wp(3)
      }}
    />
    <Text style={styles.cardTxt}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({  cardTxt: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.White,
    marginTop:wp(-2)
  },
  brandCard: {
    borderColor: COLORS.backBtnBG,
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: wp(3.3),
    paddingVertical: wp(1.5),
    borderRadius: wp(7),
    alignItems: 'center',
    backgroundColor: COLORS.tabBGColor,
  }
})
export default GiftCard