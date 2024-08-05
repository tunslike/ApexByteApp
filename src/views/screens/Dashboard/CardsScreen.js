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
import { COLORS, images, FONTS, icons, APIBaseUrl } from '../../../constants';
import { GiftCardList, MyCardList, InnerHeader, Loader } from '../../components';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

const CardsScreen = ({navigation}) => {

  const entry_id = useSelector((state) => state.account.entry_id);

  const [tab, setTab] = useState(1);
  const [loading, setIsLoading] = useState(null);
  const [virtualCard, setVirtualCard] = useState([]);
  const [giftCard, setGiftCard] = useState([]);
  const [countCard, setCountCard] = useState(0);
  const [cardData, setCardData] = useState([]);


  const loadVirtualCardType = (cardType) => {

      setTab(cardType)
      loadCards(cardType)
  }

  const loadCards = (cardtype) => {

    setCardData([])

    setIsLoading(true);
  
    axios.get(APIBaseUrl.developmentUrl + `product/getGiftCards/${entry_id}/${cardtype}`,{},{
        headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3331'
        }
    })
    .then(response => {
  
        setIsLoading(false)
       
        setCardData(response.data);
  
        
    })
    .catch(error => {
        setIsLoading(false)
        console.log(error);
    });
  
  }

  useFocusEffect(
    React.useCallback(() => {
      setCardData([])
        loadCards(1);
    }, [])
  );
  

  return (
    <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor: COLORS.bgColor
      }}
    >
    <Loader loading={loading} />

    <InnerHeader onPress={() => navigation.goBack()} title="My Virtual Cards" />

    <View style={styles.tabBox}>
      <TouchableOpacity onPress={() => loadVirtualCardType(1)} style={(tab == 1) ? styles.activeTab : styles.notActivetab}>
          <Text style={[styles.activeTxt, {color: (tab == 1) ? COLORS.bgColor : COLORS.White}]}>Gift Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => loadVirtualCardType(2)} style={(tab == 2) ? styles.activeTab : styles.notActivetab}>
          <Text style={[styles.notActiveTxt, {color: (tab == 2) ? COLORS.bgColor : COLORS.White}]}>Virtual Cards</Text>
      </TouchableOpacity>
    </View>
      
    {
  
      (cardData.length > 0) ?
        
        <View style={styles.cardBox}>
        <Text style={styles.notice}>{cardData.length} Gift Cards loaded!</Text>

          {
            cardData.map((item) => {
              return (
                <MyCardList 
                  onPress={() => navigation.navigate('RedeemCard', {cardId:item.CARD_ID,cardName: item.CARD_NAME, cardType: item.CARD_TYPE, 
                  cardImage: item.IMAGE_URL, amount: item.AMOUNT, quantity: item.QUANTITY, 
                  redeemInstructure: item.REDEEM_INSTRUCTION, dateCreated: item.DATE_CREATED, dateRedeemed: item.DATE_REDEEMED,
                  cardStatus: item.REDEEM_STATUS, transid: item.TRANSACTION_ID, email: item.RECIPENT_EMAIL, phone: item.RECIPENT_PHONE})}
                  key={item.CARD_ID}
                  image={(tab == 1) ? item.IMAGE_URL : images.virtualCard}
                  amount={item.AMOUNT}
                  status={(item.REDEEM_STATUS == 'Available') ? 1 : 2}
                  type={tab}
                  title={item.CARD_NAME}
                  date={moment(item.DATE_CREATED).format("DD-MMM-YYYY")}
                />
              )
            })
          }

         
        </View>
        :

        <View style={styles.tabBody}>
            {
              (tab == 1) && 
              <View>
              <Text style={styles.txtLine1}>Your gift cards will show here</Text>
              <Text style={styles.txtLine2}>No available gift card found!</Text></View>
            }

            {
              (tab == 2) && 
              <View>
              <Text style={styles.txtLine1}>Your virtual cards will show here</Text>
              <Text style={styles.txtLine2}>No available virtual card found!</Text></View>
            }
          
        </View>
    }

  
  

    </ScrollView>
  )
}

export default CardsScreen

const styles = StyleSheet.create({
  notice: {
    color: COLORS.orangeColor,
    fontFamily: FONTS.POPPINS_LIGHT,
    fontSize: wp(2.8),
    marginBottom: wp(2),
    marginTop: wp(1.5),
    marginLeft: wp(1.3)
},
  cardBox: {
    marginHorizontal: wp(4),
  },
  notActiveTxt: {
    color: COLORS.White,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3),
  },
  activeTxt: {
    color: COLORS.bgColor,
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: wp(3.3),
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
    marginTop: wp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(4)
  },
  txtLine1: {
    color: COLORS.textGray,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.5)
  },
  txtLine2: {
    marginTop: wp(2),
    color: COLORS.textBoxStrokeColor,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  txtLine1: {
    color: COLORS.textGray,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3)
  },
  titleHdr: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: wp(3.5),
    marginTop: wp(10),
    marginHorizontal: wp(4),
    color: COLORS.textGray,
    marginBottom: wp(3),
    marginLeft: wp(7)
},
  tabBody: {
    backgroundColor: COLORS.tabBGColor,
    borderRadius: wp(7),
    minHeight: wp(120),
    marginHorizontal: wp(3),
    justifyContent: 'center',
    alignItems: 'center'
  }
})