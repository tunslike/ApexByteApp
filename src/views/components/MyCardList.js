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

const MyCardList = ({image, status, onPress, date, amount, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>

        <Image 
          source={{uri: image}}
          style={{
            height: wp(15), width: wp(15), resizeMode: 'contain'
          }}
        />
      <View style={{flex: 1}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.txtDate}>Purchased: 02-Jun-2024</Text>
      </View>
      <View style={styles.priceWindow}>
          <Text style={styles.txtAmt}>${amount}</Text>
          <Text style={[styles.txtStatus, {color: (status == 1) ? COLORS.greenText : COLORS.orangeColor}]}>
              {(status == 1) &&
                'Available'
              }
              {(status == 2) &&
                'Redeemed'
              }
          </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  txtDate: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(2.8),
    color: COLORS.textGray
  },
  txtStatus: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  txtAmt: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4),
    color: COLORS.primaryColor
  },
  priceWindow: {
     alignItems: 'flex-end',
     marginRight: wp(3)
  },
  title: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3),
    color: COLORS.White,
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
});

export default MyCardList;