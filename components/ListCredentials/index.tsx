import React, { useState, useEffect, useContext } from 'react'
import { Image, Text, TouchableOpacity, View, ScrollView, TouchableHighlight } from 'react-native'
import { useHistory } from 'react-router-native'

import AppHeader from '../AppHeader/index'
import BackButton from '../BackButton/index'
import CurrentCredential from '../CurrentCredential/index'
import CurrentCredentialVeramo from '../CurrentCredentialVeramo/index'
import { getAllVeramoVCs } from '../Veramo/index'
// import NoTicketPage from '../NoTicketPage/index'
import AgentContext from '../AgentProvider/'
import AppStyles from '../../assets/styles'
import Styles from './styles'

import { CredentialEventType } from 'aries-framework'
import { ConnectionsModule } from 'aries-framework/build/src/modules/connections/ConnectionsModule'

interface IListCredentials {}

function ListCredentials(props: IListCredentials) {
  const history = useHistory()

  //Reference to the agent context
  const agentContext = useContext(AgentContext)

  //Credential List State
  const [credentials, setCredentials] = useState([])
  const [veramoCredentials, setVeramoCredentials] = useState([])
  const [veramoCredentialDatas, setVeramoCredentialDatas] = useState([])

  //Function to get all credentials and set the state
  const getCredentials = async () => {
    const credentials = await agentContext.agent.credentials.getAll()
    const veramoCredentials = await getAllVeramoVCs()
    
    console.log(credentials)

    // Indy credential
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

    // Veramo credential
    const veramoCredentialsForDisplay = []
    const veramoCredentialData = []

    for( const veramoCredential of veramoCredentials){
      veramoCredentialsForDisplay.push(veramoCredential.verifiableCredential.credentialSubject.name)
      veramoCredentialData.push(veramoCredential.verifiableCredential.credentialSubject)
    }
    setVeramoCredentials(veramoCredentialsForDisplay)
    setVeramoCredentialDatas(veramoCredentialData)

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
  const [viewIndex, setViewIndex] = useState(0)
  const [viewCredential, setViewCredential] = useState(false)
  const [viewVeramoCredential, setViewVeramoCredential] = useState(false)


  return (
    <>
      <BackButton backPath={'/home'} />
      <View style={AppStyles.viewFull}>
        <View style={AppStyles.header}>
          <AppHeader headerText={'Tickets'} />
        </View>
        <ScrollView>
          <View style={Styles.credView}>
            <View style={[AppStyles.backgroundWhite]}>
              {credentials.map((credential, i) => (
                <TouchableHighlight onPress={() => {
                  setViewInfo(credential)
                  setViewCredential(true)
                }}>
                <View key={i} style={[AppStyles.tableItem, Styles.tableItem, AppStyles.ticketListIndy]}>
                  <View>
                    <Text style={[{ fontSize: 18}, AppStyles.textBlack, AppStyles.textBold]}>
                      {credential.attributes.name}
                    </Text>
                  </View>
                </View>
                </TouchableHighlight>
              ))}
            </View>
            <View style={[AppStyles.backgroundWhite]}>
              {veramoCredentials.map((veramoCredential, i) => (
                <TouchableHighlight onPress={() => {
                  setViewIndex(i)
                  setViewVeramoCredential(true)
                }}>
                <View key={i} style={[AppStyles.tableItem, Styles.tableItem, AppStyles.ticketListVeramo]}>
                  <View>
                    <Text style={[{ fontSize: 18}, AppStyles.textBlack, AppStyles.textBold]}>
                      {veramoCredential}
                    </Text>
                  </View>
                </View>
                </TouchableHighlight>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      {viewCredential ? <CurrentCredential credential={viewInfo} setViewCredential={setViewCredential} /> : null}
      {viewVeramoCredential ? <CurrentCredentialVeramo index={viewIndex} data={veramoCredentialDatas} setViewVeramoCredential={setViewVeramoCredential} /> : null}
    </>
  )
}

export default ListCredentials
