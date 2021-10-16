import React, { useState, useEffect, useContext } from 'react'

import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'

import { useHistory } from 'react-router-native'

import AppHeader from '../AppHeader/index'
import BackButton from '../BackButton/index'

import { ErrorsContext } from '../Errors/index'

import AppStyles from '../../assets/styles'
import Images from '../../assets/images'
import Styles from './styles'

function Settings() {
  const history = useHistory()

  return (
    <>
      <BackButton backPath={'/home'} />
      <View style={AppStyles.viewFull}>
        <View style={AppStyles.header}>
          <AppHeader headerText={'Information'} />
        </View>
        <View style={Styles.settingView}>

          <Text style={[AppStyles.h3, AppStyles.textBold]}>Version:</Text> 
          <Text style={{fontSize: 17}}>1.0{'\n'}</Text>

          <Text style={[AppStyles.h3, AppStyles.textBold]}>Valid blockchain:</Text>
          <Text style={{fontSize: 17}}>sovrin, ethereum{'\n'}</Text>

          <Text style={[AppStyles.h3, AppStyles.textBold]}>Connect us:</Text>
          <Text style={{fontSize: 17}}>ckk615@naver.com</Text>
          <Text style={{fontSize: 17}}>xodyd15@naver.com</Text>
        </View>
      </View>
    </>
  )
}

export default Settings
