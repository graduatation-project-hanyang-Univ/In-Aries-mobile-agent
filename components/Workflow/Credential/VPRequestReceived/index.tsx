import React, { useState, useEffect, useContext } from 'react'
import { toByteArray } from 'base64-js'

import { Text, TouchableOpacity, View, ScrollView, CheckBox, Alert} from 'react-native'

import { useHistory } from 'react-router-native'

import BackButton from '../../../BackButton/index'
import AgentContext from '../../../AgentProvider/'
import Styles from '../styles'
import AppStyles from '../../../../assets/styles'
import {IContact, IProofRecord} from '../../../../types'


interface IVPRequestReceived {
    setWorkflow: any
    contact: IContact
    proofRecord: IProofRecord
}

function VPRequestReceived(props: IVPRequestReceived) {
    const history = useHistory()
    const [retrievedCredentials, setRetrievedCredentials] = useState<any>()

    //Reference to the agent context
    const agentContext = useContext(AgentContext)
      

    const getRetrievedCredentials = async () => {
        const temp = await agentContext.agent.proofs.getById(props.proofRecord.id);
        console.info('temp');
        console.info(JSON.stringify(temp, null, 2));

        console.info('proofRequest:')
        console.info(JSON.stringify(props.proofRecord.requestMessage.indyProofRequest, null, 2))


        const retrievedCreds = await agentContext.agent.proofs.getRequestedCredentialsForProofRequest(
          props.proofRecord.requestMessage.indyProofRequest,
          undefined
        )
        setRetrievedCredentials(retrievedCreds)
    }

    useEffect(() => {
        getRetrievedCredentials()
    }, [])

    const acceptProofRequest = async () => {
        console.log('Attempting to accept proof request')
        await agentContext.agent.proofs.acceptRequest(props.proofRecord.id, retrievedCredentials)

        history.push('/vp-workflow/pending')
    }

    const goAlert = async () => {
        Alert.alert(
            "Deny",
            "모든 체크박스에 체크해주세요",
            [ { text: "OK" }],
            { cancelable: false }
        )
    }

    const attribute_key_list = []
    const request_key_list = []
    const [isSelected, setSelection] = useState(false)
    const [isPredictionSelected, setPredictionSelection] = useState(false)


    for(var key in props.proofRecord.requestMessage.indyProofRequest.requestedAttributes){
        attribute_key_list.push(key)
    }
    for(var key in props.proofRecord.requestMessage.indyProofRequest.requestedPredicates){
        request_key_list.push(key)
    }

    return (
        <>
            <BackButton backPath={'/workflow/connect'} />
            <View style={AppStyles.viewFull}>
                <View style={AppStyles.smallHeader}>
                    <Text style={[AppStyles.textSecondary, AppStyles.textBold,  AppStyles.headerLeft]}>
                    Request List:
                    </Text>
                </View>
                <ScrollView >
                    {attribute_key_list.map((key_now, i) => (
                    <View key={i} style={[AppStyles.tableItem, Styles.tableItem, Styles.tableSubItem]}>
                        <View style={Styles.checkboxContainer}>
                            <Text style={[{ fontSize: 15 }, AppStyles.textBlack]}>
                                {props.proofRecord.requestMessage.indyProofRequest.requestedAttributes[key_now].name}
                            </Text>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={Styles.checkbox}
                            />
                        </View>
                    </View>
                    ))}
                    {request_key_list.map((key_now, i) => (
                    <View key={i} style={[AppStyles.tableItem, Styles.tableItem, Styles.tableSubItem]}>
                        <View style={Styles.checkboxContainer}>
                            <Text style={[{ fontSize: 15 }, AppStyles.textBlack]}>
                                {props.proofRecord.requestMessage.indyProofRequest.requestedPredicates[key_now].name}
                            </Text>
                            <CheckBox
                                value={isPredictionSelected}
                                onValueChange={setPredictionSelection}
                                style={Styles.checkbox}
                            />
                        </View>
                    </View>
                    ))}
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
                                {isSelected && isPredictionSelected ? acceptProofRequest() : goAlert()}
                            }}
                        >
                            <View style={Styles.buttonAccept}> 
                                <Text style={[AppStyles.textWhite,{fontSize: 17}]}>Accept</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

export default VPRequestReceived
