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


  const loadCards = () => {
    setIsLoading(true);
  
    axios.get(APIBaseUrl.developmentUrl + 'product/getGiftCards/' + entry_id ,{},{
        headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3331'
        }
    })
    .then(response => {
  
        setIsLoading(false)
       
        setGiftCard(response.data);
        console.log(response.data)
        
    })
    .catch(error => {
        setIsLoading(false)
        console.log(error + "1");
    });
  
  }

  useFocusEffect(
    React.useCallback(() => {
        loadCards();
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
      <TouchableOpacity onPress={() => setTab(1)} style={(tab == 1) ? styles.activeTab : styles.notActivetab}>
          <Text style={[styles.activeTxt, {color: (tab == 1) ? COLORS.bgColor : COLORS.White}]}>Gift Cards</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTab(2)} style={(tab == 2) ? styles.activeTab : styles.notActivetab}>
          <Text style={[styles.notActiveTxt, {color: (tab == 2) ? COLORS.bgColor : COLORS.White}]}>Virtual Cards</Text>
      </TouchableOpacity>
    </View>
      
    {
      (tab == 1) &&

        (giftCard.length > 0) ?
        
        <View style={styles.cardBox}>
        <Text style={styles.notice}>{giftCard.length} Gift Cards countries loaded!</Text>

          {
            giftCard.map((item) => {
              return (
                <MyCardList key={item.CARD_ID}
                  image={item.IMAGE_URL}
                  amount={item.AMOUNT}
                  status={1}
                  title={item.CARD_NAME}
                  date={moment(item.DATE_CREATED).format("DD-MMM-YYYY")}
                />
              )
            })
          }

         
        </View>

        :
        <View style={styles.tabBody}>
            <Text style={styles.txtLine1}>Your virtual cards will show here</Text>
            <Text style={styles.txtLine2}>No available virtual card found!</Text>
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