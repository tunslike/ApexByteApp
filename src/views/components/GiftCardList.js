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
import { SvgUri } from 'react-native-svg';

const GiftCardList = ({title, image, onPress, type}) => {

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>

      {(type == 1) &&
        <SvgUri 
            width="35"
            height="35"
            uri={image}
            style={{
              borderRadius: wp(5)
            }}
        />
      }

      {(type == 2) &&
        <Image 
          source={image}
          style={{
            height: wp(10), width: wp(10), resizeMode: 'contain'
          }}
        />
      }

     
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

export default GiftCardList;

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
        padding: wp(1),
        paddingLeft: wp(3),
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