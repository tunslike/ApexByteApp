import React, { useContext, useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  View, 
  Alert,
  FlatList,
  ScrollView,
  Dimensions} from 'react-native';
import axios from 'axios';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { InnerHeader, PaymentCard, VirtualCardList } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const PurchaseVirtualCardScreen = ({navigation}) => {

  const [virtualCard, setVirtualCard] = useState('');
  
  const BottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['35%','55%'], []);

  //callbacks
  const handleSheetChange = useCallback((index) => {
      console.log(index)
  }, []);

  const handleCloseBottomSheet = () => BottomSheetRef.current?.close();
  const handleOpenBottomSheet = (value) => {
      setVirtualCard(value)
      BottomSheetRef.current?.expand();
  } 

  const renderBackdrop = useCallback(
      (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, []
  )



  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
  
    <InnerHeader onPress={() => navigation.goBack()} title="Purchase Virtual Card" />

    <ScrollView>

    <View style={styles.listBox}>
        <Text style={styles.titleHdr}>Select what you want to pay for?</Text>

        <VirtualCardList 
          onPress={() => handleOpenBottomSheet('GooglePlay')} 
          icon={images.google_icon} 
          title="GooglePlay" />
        <VirtualCardList 
          onPress={() => handleOpenBottomSheet('Apple Subscription')} 
          icon={images.apple_icon} 
          title="Apple Subscription" />
        <VirtualCardList 
          onPress={() => handleOpenBottomSheet('Apple Subscription')} 
          icon={images.apple_icon} 
          title="Apple Subscription" />
        <VirtualCardList 
          onPress={() => handleOpenBottomSheet('AmazonPlay')} 
          icon={images.amazon_icon} 
          title="AmazonPlay" />
    </View>

    </ScrollView>


    {virtualCard != '' ? (
          <BottomSheet
          ref={BottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: COLORS.transBGColor,
            borderTopLeftRadius: wp(7),
            borderTopRightRadius: wp(7),
          }}
          >
          <View style={styles.contentContainer}>
          <Text style={styles.bt_title}>Select payment method</Text>

            <PaymentCard  onPress={() => navigation.navigate("CryptoPayment")} title="Crypto" />
            <PaymentCard title="Bank Transfer" />
            <PaymentCard title="Mobile Money" />

          </View>
          </BottomSheet>) : null
    }
    </View>
  )
}

const styles = StyleSheet.create({
  bt_title: {
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(4),
    color: COLORS.bgColor,
    marginBottom: Platform.OS === 'android' ? wp(2) : wp(4)
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: wp(5),
    paddingTop: wp(2)
  },
    titleHdr: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.5),
        color: COLORS.textGray,
        marginBottom: wp(6)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(8)
    }
})

export default PurchaseVirtualCardScreen;