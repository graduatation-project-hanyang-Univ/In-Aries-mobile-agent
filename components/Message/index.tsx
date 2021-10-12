import React from 'react'

import { Text, TouchableOpacity, View } from 'react-native'

import { useHistory } from 'react-router-native'

import AppStyles from '../../assets/styles'
import Styles from './styles'

interface IMessage {
  bgColor: string
  title: string
  textLight: string
  text: string
  path: string
  children: JSX.Element[]
}

function Message(props: IMessage) {
  const history = useHistory()

  return (
    <View style={Styles.msgView}>
      <View
        style={[Styles.innerView, props.bgColor ? { backgroundColor: props.bgColor } : { backgroundColor: '#fff' }]}
      >
        {props.children}
        {props.title ? (
          <Text
            style={[
              AppStyles.h2,
              AppStyles.textBold,
              { marginTop: 25 },
              AppStyles.textBlack,
            ]}
          >
            {props.title}
            {'\n'}
          </Text>
        ) : null}
        {props.text ? (
          <Text style={AppStyles.textBlack}>
            {props.text}
            {'\n'}
          </Text>
        ) : null}
        {props.path ? (
          <TouchableOpacity
            style={[AppStyles.button, AppStyles.backgroundButton, { marginTop: 30 }]}
            onPress={() => history.push(props.path)}
          >
            <Text style={[AppStyles.h2, AppStyles.textWhite]}>Continue</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

export default Message
