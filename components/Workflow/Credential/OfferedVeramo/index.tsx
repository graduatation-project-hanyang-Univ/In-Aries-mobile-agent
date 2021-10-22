import React, { useState, useEffect} from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { useHistory } from 'react-router-native'

import BackButton from '../../../BackButton/index'
import Styles from '../styles'
import AppStyles from '../../../../assets/styles'
import { saveVeramoVC, decodeVeramoVC } from '../../../Veramo'


function CredentialOfferedVeramo(props) {
    const [name, setname] = useState('')
    const [credentials, setCredentials] = useState([])
    const history = useHistory()

    const list = async () => {
        
      const decodedData = await decodeVeramoVC(props.jwt)
      const credentials = decodedData.credentials[0].credentialSubject

      const credentialsForDisplay = []

      for(const credential in credentials){
        const credentialToDisplay = {
            key: credential,
            value: credentials[credential],
        }
        if(credential === 'name'){
            setname(credentials[credential])
        }
        credentialsForDisplay.push(credentialToDisplay)
      }
      setCredentials(credentialsForDisplay)
    }

    const acceptOffer = async () => {
        console.log('Attempting to accept offer')
        await saveVeramoVC(props.jwt)
        history.push('/workflow/issued')
    }

    useEffect(() => {
        list()
    }, []);
    

    return (
    <>
        <BackButton backPath={'/home'} />
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
                            }}
                            >
                            <View>
                                <Text style={[{ fontSize: 18, top: 15 }, AppStyles.textBlack, AppStyles.textBold]}>
                                    {name? name : 'Loading...'}
                                </Text>
                            <Text style={[{ fontSize: 14 }, AppStyles.textSecondary]}>{credentials.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {credentials.map((credential, i) => (
                            <View key={i} style={[AppStyles.tableItem, Styles.tableItem, Styles.tableSubItem]}>
                                <Text style={[{ fontSize: 15 }, AppStyles.textBlack]}>
                                    <Text style={AppStyles.textBold}>{credentials[i].key}: </Text>
                                    {credentials[i].value}
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
        </>
    </>
    )
}

export default CredentialOfferedVeramo
