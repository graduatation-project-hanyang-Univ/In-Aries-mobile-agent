import { VeramoAgent } from "./agent";
import {IIdentifier} from "@veramo/core";

async function getOrCreateVeramoDid() {
  const id = await VeramoAgent.didManagerGetOrCreate({
    alias: 'default',
  });

  console.log('생성 or 가져온 DID 관련 정보 :', JSON.stringify(id,null,2))

  return id;
}

async function isVeramoVC(jwt: string): Promise<boolean> {
  console.info('isVeramoVC ...')
  console.info(jwt)
  const decoded = await VeramoAgent.handleMessage({
    raw: jwt,
  });

  console.info('decoded veramo data : ', JSON.stringify(decoded, null, 2));

  if(decoded.type === 'w3c.vc') return true;
  return false;
}

async function saveVeramoVC(jwt: string): Promise<void> {
  const decoded = await VeramoAgent.handleMessage({
    raw: jwt,
  });


  for(const credential of decoded.credentials) {
    console.info('veramo VC :', JSON.stringify(credential, null, 2))
    const hash = await VeramoAgent.dataStoreSaveVerifiableCredential({
      verifiableCredential: credential,
    })

    console.info('varamo VC hash', hash);
  }
}

async function verifyVeramoVP(jwt: string): Promise<boolean> {
  const id: IIdentifier = await getOrCreateVeramoDid();

  const decoded = await VeramoAgent.handleMessage({
    raw: jwt,
  });


  const gatheredData = await VeramoAgent.getVerifiableCredentialsForSdr({
    sdr: decoded.data,
  });

  console.info('gathered veramo data : ', JSON.stringify(gatheredData, null, 2));

  const presented = await VeramoAgent.createVerifiablePresentation({
    presentation: {
      verifier: [id.did],
      holder: id.did,
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      issuanceDate: new Date().toISOString(),
      verifiableCredential: gatheredData[0].credentials.map((c) => c.verifiableCredential),
    },
    proofFormat: 'jwt',
  })

  console.info('presented veramo data :', JSON.stringify(presented, null, 2))

  const validated = await VeramoAgent.validatePresentationAgainstSdr({
    presentation: presented,
    sdr: decoded.data,
  });

  console.info('veramo vp validation result : ', validated.valid);

  return validated.valid;
}

export {
  saveVeramoVC,
  verifyVeramoVP,
  isVeramoVC,
}
