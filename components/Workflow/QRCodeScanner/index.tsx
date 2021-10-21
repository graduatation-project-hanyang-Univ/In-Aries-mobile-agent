import React, { useState, useContext } from 'react'

import { View } from 'react-native'

import { useHistory } from 'react-router-native'

import { RNCamera } from 'react-native-camera'

import AppHeader from '../../AppHeader/index'
import BackButton from '../../BackButton/index'
import LoadingOverlay from '../../LoadingOverlay/index'

import { decodeInvitationFromUrl } from 'aries-framework'
import AgentContext from '../../AgentProvider/'

import Styles from './styles'
import AppStyles from '../../../assets/styles'
import {isVeramoVC, saveVeramoVC, verifyVeramoVP} from "../../Veramo"
import CredentialOfferedVeramo from '../Credential/OfferedVeramo/index'
import VPRequestReceivedVeramo from '../Credential/VPRequestReceivedVeramo/index'

//  TODO - Add props interface
function QRCodeScanner(props) {
  const history = useHistory()

  //Reference to the agent context
  const agentContext = useContext(AgentContext)

  props.setWorkflowInProgress(false)

  //State to determine if we should show the camera any longer
  const [cameraActive, setCameraActive] = useState(true)

  const [credentialVeramo, setCredentialVeramo] = useState('')
  const [VPVeramo, setVPVeramo] = useState('')

  const barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(async (barcode) => {
      console.log(`Scanned QR Code`)
      console.log('BARCODE: ', barcode)

      //Turn off camera so that we don't scan again
      setCameraActive(false)

      // indy쪽 QR Code
      if(barcode.data.startsWith('http')) {
        console.info('indy qr code data')
        const decodedInvitation = await decodeInvitationFromUrl(barcode.data)

        console.log('New Invitation:', decodedInvitation)

        const connectionRecord = await agentContext.agent.connections.receiveInvitation(decodedInvitation, {
          autoAcceptConnection: true,
        })

        console.log('New Connection Record', connectionRecord)
        props.setWorkflow('connecting')
        return;
      }

      // veramo쪽 QR Code
      const jwt = barcode.data;

      if(await isVeramoVC(jwt)) {
        console.info('veramo VC qr code data')
        setCredentialVeramo(jwt)
        CredentialOfferedVeramo(jwt)
      } else {
        console.info('veramo VP qr code data')
        setVPVeramo(jwt)
        VPRequestReceivedVeramo(jwt)
        return;
      }
    });
  }

  if (cameraActive) {
    return (
      <>
        <BackButton backPath={'/home'} />
        <View style={AppStyles.viewFull}>
          <View style={AppStyles.header}>
            <AppHeader headerText={'SCAN CODE'} />
          </View>
          <View style={AppStyles.tab}>
            <RNCamera
              style={Styles.camera}
              type={RNCamera.Constants.Type.back}
              captureAudio={false}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                barcodeRecognized({ barcodes })
              }}
            ></RNCamera>
          </View>
        </View>
      </>
    )
  } 
  else if(credentialVeramo != ''){
    return <CredentialOfferedVeramo jwt={credentialVeramo}/>
  }
  else if(VPVeramo != ''){
    return <VPRequestReceivedVeramo jwt={VPVeramo}/>

  }
  else {
    return <LoadingOverlay />
  }
}

export default QRCodeScanner
