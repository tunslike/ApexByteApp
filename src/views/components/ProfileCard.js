import React from 'react'
import { StyleSheet, 
         Text, 
         View,
         Image, 
         Keyboard,
        TouchableOpacity } from 'react-native'
         import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FONTS, COLORS, icons, images } from '../../constants'

const ProfileCard = ({title}) => {
  return (
    <View style={styles.container}>
    <View style={styles.checkBox}>
        <Image source={icons.check_icon} 
            style={{
                height: wp(6), width: wp(6), resizeMode: 'contain', tintColor: COLORS.textGray
            }}
        />
    </View>
      <Text style={styles.title}>{title}</Text>
      <Image source={icons.small_arrow_right} 
        style={{
            height: wp(7),
            width: wp(7), tintColor: COLORS.primaryColor, resizeMode: 'contain'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    checkBox: {
        backgroundColor: COLORS.checkBGColor,
        borderRadius: wp(3.3),
        padding: wp(1),
        marginRight: wp(3)
    },
    title: {
        flex: 1,
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3.5),
        color: COLORS.White,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: wp(10)
    }
})
export default ProfileCard;