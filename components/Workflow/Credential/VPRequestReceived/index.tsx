import React, { useState, useEffect, useContext } from 'react'
import { toByteArray } from 'base64-js'

import { Image, Text, TouchableOpacity, View } from 'react-native'

import { useHistory } from 'react-router-native'

import AppHeader from '../../../AppHeader/index'
import BackButton from '../../../BackButton/index'
import CurrentContact from '../../../CurrentContact/index'
import CurrentCredential from '../../../CurrentCredential/index'

import AgentContext from '../../../AgentProvider/'

import Images from '../../../../assets/images'
import Styles from '../styles'
import AppStyles from '../../../../assets/styles'
import {IContact, IProofRecord} from '../../../../types'
import {toArray} from "react-native-svg/lib/typescript/lib/Matrix2D";

interface IVPRequestReceived {
    setWorkflow: any
    contact: IContact
    proofRecord: IProofRecord
}

function VPRequestReceived(props: IVPRequestReceived) {
    const history = useHistory()
    const [retrievedCredentials, setRetrievedCredentials] = useState<any>()
    const [retrievedCredentialsDisplay, setRetrievedCredentialsDisplay] = useState<any>()

    const [viewInfo, setViewInfo] = useState('')
    const [viewContact, setViewContact] = useState(false)
    const [viewCredential, setViewCredential] = useState(false)

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
        console.log('retrievedCreds: ', retrievedCreds)

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

    return (
        <>
            <BackButton backPath={'/workflow/connect'} />
            <>
                <View style={Styles.buttonWrap}>
                    <Text
                        style={[
                            { fontSize: 18 },
                            AppStyles.textSecondary,
                            AppStyles.textUpper,
                            Styles.buttonText,
                            AppStyles.textBold,
                        ]}
                    >
                        Claim Credentials
                    </Text>
                    <TouchableOpacity
                        style={[Styles.button, AppStyles.backgroundPrimary]}
                        onPress={() => {
                            acceptProofRequest()
                        }}
                    >
                        <Image source={Images.receive} style={Styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
            </>
        </>
    )
}

export default VPRequestReceived
