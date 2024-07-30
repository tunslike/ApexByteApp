import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TouchableOpacity, 
        Clipboard} from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const CryptoCard = ({title, network, image, onPress}) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={image} 
            style={{
                height: wp(9), width: wp(9), resizeMode: 'contain'
            }}
        />
        <View style={{flex: 1}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.network}>Network: {network}</Text>
        </View>
      <Image 
        source={icons.arrow_forward} 
        style={{
            height: wp(7), width: wp(7), marginRight: wp(3), tintColor: COLORS.primaryColor, resizeMode: 'contain'
        }}
      />
    </TouchableOpacity>
  )
}

export default CryptoCard;

const styles = StyleSheet.create({
  network: {
    fontFamily: FONTS.POPPINS_LIGHT,
    color: COLORS.blueTextColor,
    fontSize: wp(3)
  },
    title: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(4),
        color: COLORS.White,
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
        padding: wp(2.8),
        borderRadius: wp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: COLORS.backBtnBG,
        borderWidth:1,
        borderStyle: 'solid',
        columnGap: wp(3),
        marginBottom: wp(2.3)

    }
})