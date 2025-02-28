import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const VirtualCardList = ({title, icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
     <View style={styles.imgBox}>
        <Image source={icon} 
            style={{
                height: wp(7), width: wp(7), resizeMode: 'contain', tintColor: COLORS.darkGray
            }}
        />
     </View>
      <Text style={styles.title}>{title}</Text>
      <Image 
        source={icons.arrow_forward} 
        style={{
            height: wp(7), width: wp(7), marginRight: wp(3), tintColor: COLORS.primaryColor, resizeMode: 'contain'
        }}
      />
    </TouchableOpacity>
  )
}

export default VirtualCardList

const styles = StyleSheet.create({
    title: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3.3),
        color: COLORS.White,
        flex: 1
    },
    imgBox: {
        backgroundColor: COLORS.textBoxStrokeColor,
        borderRadius: wp(3),
        justifyContent:'center',
        alignItems: 'center',
        padding: wp(2)
    },
    container: {
        backgroundColor: COLORS.tabBGColor,
        padding: wp(2),
        borderRadius: wp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: COLORS.backBtnBG,
        borderWidth:1,
        borderStyle: 'solid',
        columnGap: wp(3),
        marginBottom: wp(3)

    }
})