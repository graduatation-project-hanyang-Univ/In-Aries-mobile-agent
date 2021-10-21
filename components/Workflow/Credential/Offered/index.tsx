import React, { useState, useEffect, useContext } from 'react'

import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native'

import { useHistory } from 'react-router-native'

import AppHeader from '../../../AppHeader/index'
import BackButton from '../../../BackButton/index'
import CurrentContact from '../../../CurrentContact/index'
import CurrentCredential from '../../../CurrentCredential/index'

import AgentContext from '../../../AgentProvider/'

import Images from '../../../../assets/images'
import Styles from '../styles'
import AppStyles from '../../../../assets/styles'
import { IContact, ICredential } from '../../../../types'
import styles from '../../../CurrentContact/styles'

interface ICredentialOffered {
  contact: IContact
  credential: ICredential
}

function CredentialOffered(props: ICredentialOffered) {
  const history = useHistory()

  //Reference to the agent context
  const agentContext = useContext(AgentContext)

  useEffect(() => {
    console.log(props.credential)
  }, [])

  const [viewInfo, setViewInfo] = useState('')
  const [viewContact, setViewContact] = useState(false)
  const [viewCredential, setViewCredential] = useState(false)

  const acceptOffer = async () => {
    console.log('Attempting to accept offer')
    await agentContext.agent.credentials.acceptOffer(props.credential.id)

    //TODO:
    //Push to pending issuance screen
    history.push('/workflow/pending')
  }

  const key_list = []
  
  for(var key in props.credential.attributes){
    key_list.push(key)
  }

  return (
    <>
      <BackButton backPath={'/workflow/connect'} />
      <>
        <View style={AppStyles.viewFull}>
          <View style={AppStyles.smallHeader}>
            <Text style={[AppStyles.textSecondary, AppStyles.textBold,  AppStyles.headerLeft]}>
              Credential From:
            </Text>
          </View>
          <ScrollView >
            <View style={AppStyles.tableItem}>
              <TouchableOpacity
                  onPress={() => {
                    setViewInfo(props.contact)
                    setViewContact(true)
                  }}
                >
                <View>
                  <Text style={[{ fontSize: 18, top: 15 }, AppStyles.textBlack, AppStyles.textBold]}>
                    {props.credential.attributes['name']}
                  </Text>
                  <Text style={[{ fontSize: 14 }, AppStyles.textSecondary]}>{props.contact.sublabel}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
                {key_list.map((key_now, i) => (
                  <View key={i} style={[AppStyles.tableItem, Styles.tableItem, Styles.tableSubItem]}>
                    <Text style={[{ fontSize: 15 }, AppStyles.textBlack]}>
                        <Text style={AppStyles.textBold}>{key_now}: </Text>
                        {props.credential.attributes[key_now]}
                    </Text>
                  </View>
                ))}
            </View>
            </ScrollView>
            <View style={{flexDirection: "row"}}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    history.push('/home')
                  }}
                >
                  <View style={Styles.buttonDeny}>
                    <Text style={[AppStyles.textBlack,{fontSize: 17}]}>Deny</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() => {
                    acceptOffer()
                  }}
                >
                  <View style={Styles.buttonAccept}> 
                    <Text style={[AppStyles.textWhite,{fontSize: 17}]}>Accept</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        </View>
        {viewCredential ? <CurrentCredential credential={viewInfo} setViewCredential={setViewCredential} /> : null}
        {viewContact ? <CurrentContact contact={viewInfo} setViewContact={setViewContact} /> : null}
      </>
    </>
  )
}

export default CredentialOffered
