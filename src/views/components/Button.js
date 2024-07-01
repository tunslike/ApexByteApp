import React from 'react'
import { StyleSheet, 
         Text, 
         Image, Platform,
        TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '../../constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Button = ({title, onPress, disabled}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={[styles.btnStarted, {backgroundColor : disabled ? COLORS.primaryColor : COLORS.primaryColor}]}
        disabled={disabled}>
      <Text style={styles.txtBtn}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
    txtBtn: {
        color: COLORS.ButtonTxtColor,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: Platform.OS === 'android' ? wp(3.4) : wp(3.8),
        textAlign: 'center'
    },
    btnStarted: {
        backgroundColor: COLORS.primaryColor,
        borderRadius: wp(4),
        paddingVertical: Platform.OS === 'android' ? wp(4) : wp(5)
    },
})