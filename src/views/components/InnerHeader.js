import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
        TouchableOpacity, 
        Platform} from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons } from '../../constants'

const InnerHeader = ({title, onPress}) => {
  return (
    <View style={styles.header}>
            <TouchableOpacity
            onPress={onPress}
            style={styles.iconBox}
        >
            <Image source={icons.leftarrow} 
            style={{
                height: wp(5), width: wp(5), tintColor: COLORS.primaryColor, resizeMode: 'contain'
            }}
            />
        </TouchableOpacity>
        <View style={{flex: 1}}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity>
            <Image source={icons.notification} 
                style={{
                height: wp(7), width: wp(7), resizeMode: 'contain', tintColor: COLORS.White
                }}
            />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    title: {
        color: COLORS.White,
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        fontSize: Platform.OS === 'android' ? wp(3.7) : wp(4)
      },
      greetings: {
        color: COLORS.textBoxStrokeColor,
        fontFamily: FONTS.POPPINS_LIGHT,
        fontSize: wp(3.5)
      },
      iconBox: {
        backgroundColor: COLORS.backBtnBG,
        borderRadius: wp(3),
        padding: wp(1.5),
        justifyContent: 'center',
        alignItems: 'center'
      },
    header: {
        backgroundColor: COLORS.tabBGColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? wp(5) : wp(15),
        paddingHorizontal: wp(4),
        paddingBottom: Platform.OS === 'android' ? wp(5) : wp(3),
        borderBottomRightRadius: wp(7),
        borderBottomLeftRadius: wp(7),
        columnGap: wp(3)
      }
})


export default InnerHeader;