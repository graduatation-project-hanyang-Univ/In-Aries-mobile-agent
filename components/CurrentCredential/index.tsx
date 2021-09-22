import React from 'react'

import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native'

import { useHistory } from 'react-router-native'

import AppStyles from '../../assets/styles'
import Images from '../../assets/images'
import Styles from './styles'
import { ICredential } from '../../types'

interface ICurrentCredential {
  credential: ICredential
}

function CurrentCredential(props) {
  const history = useHistory()
  const key_list = []
  
  for(var key in props.credential.attributes){
    key_list.push(key)
  }

  return (
    <View style={AppStyles.viewOverlay}>
      <View style={[AppStyles.credView, AppStyles.backgroundWhite]}>
        <TouchableOpacity
          style={AppStyles.backbutton}
          onPress={() => props.setViewCredential(false)}
        >
          <Text style={[{fontSize: 20}]}>  close </Text>
        </TouchableOpacity>
        <ScrollView style={[AppStyles.tableItemScroll]}>
          {props.credential ? (
            <>
              <View style={[AppStyles.tableItem, AppStyles.tableListItem, AppStyles.backgroundBlack]}>
                <View>
                  <Text style={[{ fontSize: 20}, AppStyles.textWhite, AppStyles.textBold]}>
                  {props.credential.attributes['name']}
                  </Text>
                </View>
              </View>
              <ScrollView>
                {key_list.map((key_now, i) => (
                  <View key={i} style={[AppStyles.tableItem, Styles.tableItem, Styles.tableSubItem]}>
                    <Text style={[{ fontSize: 18 }, AppStyles.textBlack]}>
                        <Text style={AppStyles.textBold}>{key_now}: </Text>
                        {props.credential.attributes[key_now]}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </>
          ) : null}
        </ScrollView>
      </View>
    </View>
  )
}

export default CurrentCredential
