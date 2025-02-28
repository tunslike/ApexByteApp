import React, { useContext, useState, useEffect } from 'react'
import { 
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet, 
  Text, 
  TextInput,
  View, 
  Alert,
  FlatList,
  ScrollView,
  Dimensions} from 'react-native';
import axios from 'axios';
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { GiftCardList, InnerHeader, Loader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';


const BuyGiftCardScreen = ({navigation, route}) => {

  const access_token = useSelector((state) => state.account.reloadlyAccessToken);
  const {cardName} = route.params;

  const [giftCardList, setGiftCardList] = useState('');
  const [data, setData] = useState('');    
  const [loading, setIsLoading] = useState(null);
  const [giftCardCount, setGiftCardCount] = useState(0);
  const [searchText, setSearchText] = useState('');

    // function to test using fetch
    const getBrandGiftCards = async () => {

          setIsLoading(true);

          try {

              const headers = { 
                  'Authorization': `Bearer ${access_token}`, 
                  'Accept' : 'application/com.reloadly.giftcards-v1+json'
              };
              await fetch(`https://giftcards-sandbox.reloadly.com/products?productName=${cardName}&includeRange=true&includeFixed=true`, { headers })
              .then(response => response.json())
              .then(data => {

                  setIsLoading(false);
                  setGiftCardCount(data.content.length)
                  setData(data.content)
                  setGiftCardList(data.content)                  

              });
              
          } catch (error) {

          }
    }
  // end of function

  const searchFunction = (text) => {
        
    setSearchText(text);
    text = text.toLowerCase();
    if (text == "") {
        setData(giftCardList);
    }
    else {
      let filterListCards = giftCardList.filter(giftCardList => (giftCardList.productName.toLowerCase().startsWith(text)))
      setData(filterListCards);
    }
    
  }

  //USE EFFECT
  useEffect(() => {

    if(access_token != '') {
      getBrandGiftCards(); 
    }

    if(data.length == 0) {
       
    }
    
  }, []);

  const renderItem = ({item}) => (
    <GiftCardList  
        type={2}
        image={item.logoUrls} 
        title={item.productName} 
        onPress={() => navigation.navigate("PayGiftCard", {cardName: item.productName, cardType: 'Gift Card', cardImage: item.logoUrls,
                      currencyCode: item.recipientCurrencyCode, minRecepAmt: item.minRecipientDenomination,
                      maxRecepAmt: item.maxRecipientDenomination, minSenderAmt: item.minSenderDenomination,
                      maxSenderAmt: item.maxSenderDenomination, rangeType: item.denominationType,
                      giftCardRange: item.fixedRecipientDenominations, globa: item.global, giftCardID: item.productId, redeemInstruction: encodeURI(`${item.redeemInstruction.concise} ${item.redeemInstruction.verbose}`)
        })}
    />
);

  return (
    <View
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <InnerHeader onPress={() => navigation.goBack()} title={`Buy ${cardName} Gift Cards`} />

    <Loader loading={loading} />

    <View style={styles.listBox}>
        <Text style={styles.titleHdr}>Available Gift cards for {cardName}</Text>


        <View style={styles.searchBox}>
        <Image source={icons.search} 
            style={{
                height: wp(6), width: wp(6), resizeMode: 'contain', tintColor: COLORS.backBtnBG
            }}
        />
                <TextInput 
                style={styles.searchBar}
                placeholderTextColor={COLORS.textGray}
                placeholder="Search Gift Cards"
                value={searchText}
                clearButtonMode='always'
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={text => searchFunction(text)}
            />
        </View>

        <View>
        <Text style={styles.notice}>{giftCardCount} gift cards loaded!</Text>

          <FlatList
          data={data}
          showsVerticalScrollIndicator={ false }
          renderItem={ renderItem }
          keyExtractor={(item) => item.productId}
          />

    </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  notice: {
    color: COLORS.orangeColor,
    fontFamily: FONTS.POPPINS_LIGHT,
    fontSize: wp(2.8),
    marginBottom: wp(1.8),
    marginLeft: wp(2)  
},
    titleHdr: {
      fontFamily: FONTS.POPPINS_MEDIUM,
      fontSize: wp(3.5),
      color: COLORS.White,
      marginBottom: wp(3),
      marginLeft: wp(2)
    },
    searchBar: {
      fontFamily: FONTS.POPPINS_REGULAR,
      fontSize: wp(3),
      color: COLORS.textGray,
      width: 'auto',
      flex: 1
     },
     searchBox: {
         flexDirection: 'row',
         justifyContent: 'flex-start',
         padding: Platform.OS === 'android' ? wp(0.5) : wp(2.5),
         paddingLeft: Platform.OS === 'android' ? wp(2) : null,
         alignItems: 'center',
         columnGap: wp(3),
         borderColor: COLORS.backBtnBG,
         borderWidth: 1,
         borderStyle: 'solid',
         borderRadius: wp(4),
         marginBottom: wp(5),
     },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(8)
    }
})

export default BuyGiftCardScreen;