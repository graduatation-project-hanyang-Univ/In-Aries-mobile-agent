import React from 'react'
import {Text, TouchableOpacity, View, ScrollView } from 'react-native'

import AppStyles from '../../assets/styles'
import Styles from './styles'


function CurrentCredentialVeramo(props) {

    const now_data = props.data[props.index]
    const key_list = []

    for(var key in now_data){
        key_list.push(key)
    }

    return (
        <View style={AppStyles.viewOverlay}>
        <View style={[AppStyles.credView, AppStyles.backgroundWhite]}>
            <TouchableOpacity
            style={AppStyles.backbutton}
            onPress={() => props.setViewVeramoCredential(false)}
            >
            <Text style={[{fontSize: 20}]}>  close </Text>
            </TouchableOpacity>
            <ScrollView style={[AppStyles.tableItemScroll]}>
            {props.data ? (
                <>
                <View style={[AppStyles.tableItem, AppStyles.tableListItem, AppStyles.backgroundBlack]}>
                    <View>
                    <Text style={[{ fontSize: 20}, AppStyles.textWhite, AppStyles.textBold]}>
                    {now_data.name}
                    </Text>
                    </View>
                </View>
                <ScrollView>
                    {key_list.map((key_now, i) => (
                    <View key={i} style={[AppStyles.tableItem, Styles.tableItem, Styles.tableSubItem]}>
                        <Text style={[{ fontSize: 18 }, AppStyles.textBlack]}>
                            <Text style={AppStyles.textBold}>{key_now}: </Text>
                            {now_data[key_now]}
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

export default CurrentCredentialVeramo
