import React from 'react'

import { Text, View } from 'react-native'

import { useHistory } from 'react-router-native'

import AppStyles from '../../assets/styles'


function NoTicketPage() {
  const history = useHistory()


  return (
    <View style={AppStyles.viewOverlay}>
      <View style={[AppStyles.credView, AppStyles.backgroundWhite]}>
        
        <Text> No Ticket</Text>
      </View>
    </View>
  )
}

export default NoTicketPage
