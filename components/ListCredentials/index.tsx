import React, { useState, useEffect, useContext } from 'react'

import { Image, Text, TouchableOpacity, View, ScrollView, TouchableHighlight } from 'react-native'

import { useHistory } from 'react-router-native'

import AppHeader from '../AppHeader/index'
import BackButton from '../BackButton/index'
import CurrentCredential from '../CurrentCredential/index'
// import NoTicketPage from '../NoTicketPage/index'

import AgentContext from '../AgentProvider/'
import { CredentialEventType } from 'aries-framework'

import AppStyles from '../../assets/styles'
import Styles from './styles'

interface IListCredentials {}

function ListCredentials(props: IListCredentials) {
  const history = useHistory()

  //Reference to the agent context
  const agentContext = useContext(AgentContext)

  //Credential List State
  const [credentials, setCredentials] = useState([])

  //Function to get all credentials and set the state
  const getCredentials = async () => {
    const credentials = await agentContext.agent.credentials.getAll()
    console.log(credentials)

    const credentialsForDisplay = []

    for (const credential of credentials) {
      if (credential.state === 'done') {
        const credentialToDisplay = {
          ...(await agentContext.agent.credentials.getIndyCredential(credential.credentialId)),
          connectionId: credential.connectionId,
          id: credential.id,
        }
        credentialsForDisplay.push(credentialToDisplay)
      }
    }
    console.log('credentialsForDisplay', credentialsForDisplay)
    //TODO: Filter credentials for display
    setCredentials(credentialsForDisplay)
  }

  //On Component Load Fetch all Connections
  useEffect(() => {
    if (!agentContext.loading) {
      getCredentials()
    }
  }, [agentContext.loading])

  //Credential Event Callback
  const handleCredentialStateChange = async (event) => {
    console.info(`Credentials State Change, new state: "${event.credentialRecord.state}"`, event)

    getCredentials()
  }

  //Register Event Listener
  useEffect(() => {
    if (!agentContext.loading) {
      agentContext.agent.credentials.events.removeAllListeners(CredentialEventType.StateChanged)
      agentContext.agent.credentials.events.on(CredentialEventType.StateChanged, handleCredentialStateChange)
    }
  }, [agentContext.loading])

  const [viewInfo, setViewInfo] = useState('')
  const [viewCredential, setViewCredential] = useState(false)

  return (
    <>
      <BackButton backPath={'/home'} />
      <View style={AppStyles.viewFull}>
        <View style={AppStyles.header}>
          <AppHeader headerText={'Tickets'} />
        </View>
        <ScrollView>
          <View style={[Styles.credView, AppStyles.backgroundWhite]}>
            {credentials.map((credential, i) => (
              <TouchableHighlight onPress={() => {
                setViewInfo(credential)
                setViewCredential(true)
              }}>
              <View key={i} style={[AppStyles.tableItem, Styles.tableItem, AppStyles.ticketList]}>
                <View>
                  <Text style={[{ fontSize: 18}, AppStyles.textBlack, AppStyles.textBold]}>
                    {credential.attributes.name}
                  </Text>
                </View>
              </View>
              </TouchableHighlight>
            ))}
          </View>
        </ScrollView>
      </View>
      {viewCredential ? <CurrentCredential credential={viewInfo} setViewCredential={setViewCredential} /> : null}
    </>
  )
}

export default ListCredentials
