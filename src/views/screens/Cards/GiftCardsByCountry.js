import React, { useContext, useState, useEffect } from 'react'
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
import { COLORS, images, FONTS, icons, APIBaseUrl, ReloadlyKeys } from '../../../constants';
import { GiftCardList, InnerHeader, Loader, VirtualCardList } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import filter from 'lodash.filter';


const data_list = [
    {id: 1, name: 'Addidas Germany', cardType: 'Google Pay', amount: 100, srcImage: require("../../../assets/images/addidas.png")},
    {id: 2, name: 'Addidas UK', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/addidas.png")},
    {id: 3, name: 'Addidas Spain', cardType: 'Google Pay', amount: 35, srcImage: require("../../../assets/images/addidas.png")},
    {id: 5, name: 'Amazon Francis', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/amazon.png")},
    {id: 6, name: 'Amazon UK', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/amazon.png")},
    {id: 9, name: 'Ebay UK', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/ebay_pic.png")},
    {id: 10, name: 'Ebay Spain', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/ebay_pic.png")},
    {id: 11, name: 'Ebay USA', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/ebay_pic.png")},
    {id: 12, name: 'Ebay UK', cardType: 'Apple Pay', amount: 20, srcImage: require("../../../assets/images/ebay_pic.png")},

  ]

const GiftCardsByCountry = ({navigation}) => {

    const [countryList, setCountryList] = useState('');
    const [data, setData] = useState('');    
    const [loading, setIsLoading] = useState(false);
    const [countryCount, setCountryCount] = useState(0);
    const [searchText, setSearchText] = useState('');

        // function to test using fetch
        const getCountryFetch = async () => {

            setIsLoading(true);

            try {

                const headers = { 
                    'Authorization': 'Bearer ' + ReloadlyKeys.access_token, 
                    'Accept' : 'application/com.reloadly.giftcards-v1+json'
                };
                await fetch('https://giftcards-sandbox.reloadly.com/countries/', { headers })
                .then(response => response.json())
                .then(data => {
    
                    setIsLoading(false);
    
                    setCountryList(data);
                    setCountryCount(data.length)
                    setData(data)
                });
                
            } catch (error) {

            }
        }
        // end of function

      //USE EFFECT
      useEffect(() => {

        getCountryFetch();

        if(countryList.length == 0 || countryList == '') {
                //return greetings
               
        }    
    
      }, []);

      const searchFunction = (text) => {
        
        setSearchText(text);
        text = text.toLowerCase();
        if (text == "") {
            setData(countryList);
        }
        else {
          let filteredLanguages = countryList.filter(countryList => (countryList.name.toLowerCase().startsWith(text)))
          setData(filteredLanguages);
        }
        
      }

      const renderItem = ({item}) => (
        <GiftCardList  
            image={item.flagUrl} 
            title={item.name} 
            onPress={() => navigation.navigate("BuyGiftCard")}
        />
    );
  return (
    <View
    style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <Loader loading={loading} />
    <InnerHeader onPress={() => navigation.goBack()} title="Choose Gift Card Country" />

    <View style={styles.listBox}>
        <Text style={styles.titleHdr}>Select the country you want to buy from?</Text>

        <View style={styles.searchBox}>
        <Image source={icons.search} 
            style={{
                height: wp(7), width: wp(7), resizeMode: 'contain', tintColor: COLORS.backBtnBG
            }}
        />
                <TextInput 
                style={styles.searchBar}
                placeholderTextColor={COLORS.textGray}
                placeholder="Search Countries"
                value={searchText}
                clearButtonMode='always'
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={text => searchFunction(text)}
            />
        </View>

        <Text style={styles.notice}>{countryCount} Gift Cards countries loaded!</Text>

        <FlatList
            data={data}
            showsVerticalScrollIndicator={ false }
            renderItem={ renderItem }
            keyExtractor={(item) => item.isoName}
        />

        {/**
        {countryList.length == 0 &&

            countryList.map((item) => {
                return (
                    <GiftCardList  
                        key={item.isoName}
                        image={item.flagUrl} 
                        title={item.name} 
                    />
                )
            })
        }
             */}
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
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
        borderRadius: wp(4.5),
        marginBottom: wp(5),
    },
    notice: {
        color: COLORS.orangeColor,
        fontFamily: FONTS.POPPINS_LIGHT,
        fontSize: wp(2.8),
        marginBottom: wp(3),
        marginLeft: wp(5)  
    },
    titleHdr: {
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: wp(3.5),
        color: COLORS.textGray,
        marginBottom: wp(3),
        marginLeft: wp(2.5)
    },
    listBox: {
        marginHorizontal: wp(5),
        marginTop: wp(8)
    }
})
export default GiftCardsByCountry;