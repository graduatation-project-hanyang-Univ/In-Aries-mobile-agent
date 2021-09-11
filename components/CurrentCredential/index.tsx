import React from 'react'

import { Image, Text, TouchableOpacity, View } from 'react-native'

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
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => props.setViewCredential(false)}
        >
          <Image source={Images.arrowDown} style={AppStyles.arrow} />
        </TouchableOpacity>
        {props.credential ? (
          <>
            <View style={[AppStyles.tableItem, AppStyles.tableListItem, AppStyles.backgroundSecondary]}>
              <View>
                <Text style={[{ fontSize: 20, top: 8 }, AppStyles.textWhite, AppStyles.textBold]}>
                {props.credential.attributes['name']}
                </Text>
              </View>
            </View>
            {key_list.map((key_now, i) => (
              <View key={i} style={[AppStyles.tableItem, Styles.tableItem, Styles.tableSubItem]}>
                <Text style={[{ fontSize: 18 }, AppStyles.textBlack]}>
                    <Text style={AppStyles.textBold}>{key_now}: </Text>
                    {props.credential.attributes[key_now]}
                </Text>
              </View>
            ))}
          </>
        ) : null}
      </View>
    </View>
  )
}

export default CurrentCredential
