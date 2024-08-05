import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TextInput, 
        Platform} from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const InputTextbox = ({ placeholder,maxlength, defaultValue, phone, onFocus, onChange, value, icon, setSecureText}) => {
  return (
    <View style={styles.container}>

        <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.inputStyle}
            placeholder={placeholder}
            placeholderTextColor= {COLORS.textGray}
            keyboardType={(phone == 1) ? 'numeric' : "default"}
            autoCapitalize='none'
            defaultValue={defaultValue}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={setSecureText}
            returnKeyType='next'
            maxLength={maxlength}
            onFocus={onFocus}
        />
        
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: Platform.OS === 'android' ? wp(4) : wp(3.5),
    color: COLORS.White,
    width: "100%"

  },
   container : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1

   }
})

export default InputTextbox;