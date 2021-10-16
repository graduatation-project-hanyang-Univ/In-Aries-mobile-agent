import React, {useContext} from 'react'

import {Text, TouchableOpacity, View, ScrollView, Linking, Image} from 'react-native'

import {useHistory, useLocation} from 'react-router-native'

import AppHeaderLarge from '../AppHeaderLarge/index'
import AppHeader from '../AppHeader/index'
import BackButton from '../BackButton/index'

import {ErrorsContext} from '../Errors/index'
import {NotificationsContext} from '../Notifications/index'

import AppStyles from '../../assets/styles'
import Images from '../../assets/images'
import Styles from './styles'

function Home() {
  const history = useHistory()
  const location = useLocation()

  const errors = useContext(ErrorsContext)
  const notifications = useContext(NotificationsContext)

  const concert_list = ['서울숲 재즈 페스티벌 2021', '2021아트트럭기획공연 멜로디시티-용인', '여권없이 떠나는 세계음악여행 - 부산']
  const link_list = ['https://tickets.interpark.com/goods/21007874', 'https://tickets.interpark.com/goods/21007412' ,'https://tickets.interpark.com/goods/20005422']

  return (
    <>
      <BackButton backExit={true}/>
      <View style={AppStyles.viewFull}>
        <View style={AppStyles.smallHeader}>
          <Text style={[AppStyles.textWhite, AppStyles.textBold,  AppStyles.headerCenter]}>
                    Blockchain{"\n"}
                    Ticketing
          </Text>
        </View>
        <View style={[AppStyles.tab]}>
          <Text style={[{fontSize: 22, alignSelf: 'flex-start', marginLeft: 10}, AppStyles.textBold]}>현재 진행중인 이벤트</Text>
          <ScrollView>
          {concert_list.map((concert, i) => (
              <View key={i} style={[AppStyles.tableItem, Styles.tableItem, AppStyles.ticketList]}>
                <View>
                  <Text style={[{ fontSize: 15}, AppStyles.textBlack]}>
                    {concert}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => {
                  Linking.openURL(link_list[i])
                }}>
                  <Image source={Images.link} style={{ width: 22, height: 22 }} />

                </TouchableOpacity>
              </View>
          ))}
          </ScrollView>
          <View>
            <Text>{"\n"}</Text>
          </View>
          <Text style={[{fontSize: 22, alignSelf: 'flex-start', marginLeft: 10, bottom: 7}, AppStyles.textBold]}>이용방법</Text>
          <View style={[{bottom: 10},AppStyles.tableItem, Styles.tableItem, AppStyles.ticketList]}>
              <Text style={[{fontSize: 15}, AppStyles.textBlack]}>
                1. 다른 기기로 다음 사이트에 접근합니다.
              </Text>
          </View>
          <View style={[{bottom: 10},AppStyles.tableItem, Styles.tableItem, AppStyles.ticketList]}>
              <Text style={[{ fontSize: 15}, AppStyles.textBlack]}>
                2. 제시된 QR코드를 스캔하여 예약합니다.
              </Text>
          </View>
          <View style={[{bottom: 10}, AppStyles.tableItem, Styles.tableItem, AppStyles.ticketList]}>
              <Text style={[{ fontSize: 15}, AppStyles.textBlack]}>
                3. 입장 시 QR코드를 스캔하여 검증합니다.
              </Text>
          </View>

        </View>
      </View>

    </>
  )
}

export default Home
