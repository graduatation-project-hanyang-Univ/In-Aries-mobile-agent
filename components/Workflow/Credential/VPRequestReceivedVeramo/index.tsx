import React, { useState, useEffect, useContext } from 'react'
import { Text, TouchableOpacity, View, ScrollView, CheckBox, Alert} from 'react-native'
import { useHistory } from 'react-router-native'

import BackButton from '../../../BackButton/index'
import AgentContext from '../../../AgentProvider/'
import Styles from '../styles'
import AppStyles from '../../../../assets/styles'
import { decodeVeramoVC, verifyVeramoVP } from '../../../Veramo'


function VPRequestReceivedVeramo(props) {
    const history = useHistory()
    const [requestsList, setRequestList] = useState([])
    const [isSelected, setSelection] = useState(false)

    //Reference to the agent context
    const agentContext = useContext(AgentContext)

    const list = async () => {
        const decodedData = await decodeVeramoVC(props.jwt)
        const required_list = decodedData.data.claims
        const requestForDisplay = []

        for(const required in required_list){
            requestForDisplay.push(required_list[required].claimType)
        }
        setRequestList(requestForDisplay)
    }

    useEffect(() => {
        list()
    }, [])

    const acceptProofRequest = async () => {
        const verified = await verifyVeramoVP(props.jwt)
        if(verified){
            history.push('/vp-workflow/verified')
        } else {
            history.push('/vp-workflow/rejected')
        }
    }

    const goAlert = async () => {
        Alert.alert(
            "Deny",
            "모든 체크박스에 체크해주세요",
            [ { text: "OK" }],
            { cancelable: false }
        )
    }

    return (
        <>
            <BackButton backPath={'/vp-workflow/connect'} />
            <View style={AppStyles.viewFull}>
                <View style={AppStyles.smallHeader}>
                    <Text style={[AppStyles.textSecondary, AppStyles.textBold,  AppStyles.headerLeft]}>
                    Request List:
                    </Text>
                </View>
                <ScrollView >
                    {requestsList.map((request_now, i) => (
                    <View key={i} style={[AppStyles.tableItem, Styles.tableItem, Styles.tableSubItem]}>
                        <View style={Styles.checkboxContainer}>
                            <Text style={[{ fontSize: 15 }, AppStyles.textBlack]}>
                                {request_now}
                            </Text>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
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
                                {isSelected ? acceptProofRequest() : goAlert()}
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

export default VPRequestReceivedVeramo
