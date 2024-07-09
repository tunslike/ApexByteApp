import React, { useContext, useState, 
  useRef, useMemo, useCallback, useEffect } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TextInput,
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
import { SelectList } from 'react-native-dropdown-select-list'
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { Loader, InnerHeader, GiftCard, virtualCard, PaymentCard } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';


const GiftCardCategoriesScreen = ({navigation}) => {

  const [virtualCard, setVirtualCard] = useState('');
  const [searchText, setSearchText] = useState('');
  const [tab, setTab] = useState(1);
  const [countryList, setCountryList] = useState('');
  const [data, setData] = useState('');    
  const [loading, setIsLoading] = useState(null);
  const [countryCount, setCountryCount] = useState(0);

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

    <Loader loading={loading} />
    <InnerHeader onPress={() => navigation.goBack()} title="Buy Gift Card" />

    <View style={styles.hdrBox}>
    <Text style={styles.titleHdr}>Browse by popular Brands?</Text>
    </View>
    
    {/*
        <View style={styles.tabBox}>
        <TouchableOpacity onPress={() => setTab(1)} style={(tab == 1) ? styles.activeTab : styles.notActivetab}>
            <Text style={[styles.activeTxt, {color: (tab == 1) ? COLORS.bgColor : COLORS.White}]}>Shop by Brands</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(2)} style={(tab == 2) ? styles.activeTab : styles.notActivetab}>
            <Text style={[styles.notActiveTxt, {color: (tab == 2) ? COLORS.bgColor : COLORS.White}]}>Shop by Country</Text>
        </TouchableOpacity>
      </View>
      */}

          <View style={styles.brandBox}>

             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "Adidas", image: images.addidas_card})} title="Addidas" image={images.addidas_card} />
             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "Amazon", image: images.amazon_card})} title="Amazon" image={images.amazon_card} />
             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "Apple", image: images.apple_card})} title="Apple" image={images.apple_card} />
             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "Airbnb", image:images.airbnb_card})} title="Airbnb" image={images.airbnb_card} />
             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "Apple Music", image:images.music_card})} title="Apple Music" image={images.music_card} />
             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "PlayStation", image: images.playstore_card})} title="Playstore" image={images.playstore_card} />
             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "xBox", image: images.xbox_card})} title="xBox" image={images.xbox_card} />
             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "eBay", image:images.ebay_card})} title="eBay" image={images.ebay_card} />
             <GiftCard onPress={() => navigation.navigate("BuyGiftCard", {cardName: "Spotify", image: images.spotify_card})} title="Spotify" image={images.spotify_card} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("GiftCardCountry")} style={styles.btnCountry}>
            <Text style={styles.activeTxt}>Browse by Country</Text>
          </TouchableOpacity>
  


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
  btnCountry: {
    marginHorizontal: wp(4),
    marginTop: wp(13),
    backgroundColor: COLORS.primaryColor,
    paddingVertical: wp(4),
    borderRadius: wp(3.5)
  },
  searchBar: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.3),
    color: COLORS.textGray,
    width: 'auto',
    flex: 1
   },
   searchBox: {
       flexDirection: 'row',
       justifyContent: 'flex-start',
       padding: wp(3),
       alignItems: 'center',
       columnGap: wp(3),
       borderColor: COLORS.backBtnBG,
       borderWidth: 1,
       borderStyle: 'solid',
       borderRadius: wp(4),
       marginBottom: wp(5),
       marginTop: wp(2),
       marginHorizontal: wp(4)
   },
   notice: {
       color: COLORS.orangeColor,
       fontFamily: FONTS.POPPINS_LIGHT,
       fontSize: wp(2.8),
       marginBottom: wp(3),
       marginLeft: wp(5)
       
   },
  brandBox: {
    marginHorizontal: wp(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: wp(3.),
    rowGap: wp(3.8),
    marginTop:wp(2)
},
  hdrBox: {
   marginHorizontal: wp(4),
   marginTop: wp(8)
  },
  notActiveTxt: {
    color: COLORS.White,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3),
  },
  activeTxt: {
    color: COLORS.bgColor,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    fontSize: wp(3.3),
    textAlign: 'center'
  },
  activeTab: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: wp(3),
    paddingVertical: Platform.OS === 'android' ? wp(2.4) :  wp(3),
    width: wp(44),
    alignItems: 'center'
  },
  notActivetab: {
    borderColor: COLORS.textBoxStrokeColor,
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: COLORS.tabBGColor,
    borderRadius: wp(3),
    paddingVertical: Platform.OS === 'android' ? wp(2.4) :  wp(3),
    width: wp(44),
    alignItems: 'center'
  },
  tabBox: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(4)
  },
    titleHdr: {
        fontFamily: FONTS.POPPINS_MEDIUM,
        fontSize: wp(3.5),
        color: COLORS.White,
        marginBottom: wp(3),
        marginLeft: wp(2)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(8)
    }
})

export default GiftCardCategoriesScreen;