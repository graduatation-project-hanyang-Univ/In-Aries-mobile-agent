import React, { useState, useEffect, useContext } from 'react'

import { View } from 'react-native'

import { Route, useHistory, useRouteMatch } from 'react-router-native'

import AgentContext from '../AgentProvider/'
import {ProofEventType, ProofState} from 'aries-framework'

import QRCodeScanner from './QRCodeScanner/index'
import Message from '../Message/index'
import { IContact, ICredential } from '../../types'
import VPRequestReceived from "./Credential/VPRequestReceived";

interface IWorkflow {
    contacts: IContact[]
    credentials: ICredential[]
}

function VPWorkflow(props: IWorkflow) {
    const history = useHistory()
    const { url } = useRouteMatch()

    const [workflow, setWorkflow] = useState('connect')
    const [workflowInProgress, setWorkflowInProgress] = useState(true)
    const [firstRender, setFirstRender] = useState(false)

    const [connection, setConnection] = useState(undefined)
    const [proofRecord, setProofRecord] = useState(undefined)

    //Reference to the agent context
    const agentContext = useContext(AgentContext)

    const handleProofStateChange = async (event) => {
        console.info(`Verification State Change, new state: "${event.proofRecord.state}"`)
        console.info(JSON.stringify(event, null, 2))

        if(event.proofRecord.state === ProofState.RequestReceived) {
            const connectionRecord = await agentContext.agent.connections.getById(event.proofRecord.connectionId)
            setConnection(connectionRecord);

            setProofRecord(event.proofRecord);


            setWorkflow('requested')
        } else if(event.proofRecord.state === ProofState.Done) {
            setWorkflow('verified');
        }
    }

    //Register Event Listener
    useEffect(() => {
        if (!agentContext.loading) {
            agentContext.agent.proofs.events.removeAllListeners(ProofEventType.StateChanged)
            agentContext.agent.proofs.events.on(ProofEventType.StateChanged, handleProofStateChange)
        }
    }, [agentContext.loading])


    useEffect(() => {
        setWorkflowInProgress(true)

        //Don't re-push the first workflow screen for back-up functionality
        //TODO: Refactor
        if (firstRender) {
            history.push(`${url}/${workflow}`)
        } else {
            setFirstRender(true)
        }
    }, [workflow])

    return (
        <View>
            <Route
                path={`${url}/connect`}
                render={() => <QRCodeScanner setWorkflow={setWorkflow} setWorkflowInProgress={setWorkflowInProgress} />}
            />
            <Route
                path={`${url}/connecting`}
                render={() => {
                    return (
                        <Message title={'Connecting...'} bgColor={'#FFFFFF'} textLight={true}>
                        </Message>
                    )
                }}
            />
            <Route
                path={`${url}/requested`}
                render={() => <VPRequestReceived setWorkflow={setWorkflow} contact={connection} proofRecord={proofRecord} />}
            />
            <Route
                path={`${url}/pending`}
                render={() => {
                    return (
                        <Message title={'Pending Issuance...'} bgColor={'#FFFFFF'} textLight={true}>
                        </Message>
                    )
                }}
            />
            <Route
                path={`${url}/verified`}
                render={() => {
                    return (
                        <Message title={'Verified'} path={'/home'} bgColor={'#FFFFFF'} textLight={true}>
                        </Message>
                    )
                }}
            />
          <Route
            path={`${url}/rejected`}
            render={() => {
              return (
                <Message title={'Rejected'} path={'/home'} bgColor={'#FFFFFF'} textLight={true}>
                </Message>
              )
            }}
          />
        </View>
    )
}
export default VPWorkflow
