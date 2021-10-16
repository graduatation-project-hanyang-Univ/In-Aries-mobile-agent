import { VeramoAgent } from "./agent";
import {IIdentifier} from "@veramo/core";
import {UniqueVerifiableCredential} from "@veramo/data-store/src/data-store-orm";

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
  await getOrCreateVeramoDid();

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

/**
 * 아래와 같은 형태를 배열로 반환하며, 실제 정보는 verifiableCredential.credentialSubject 필드에 들어가 있다.
 {
    "hash": "472ce1f9135d3dc5d2af42de2e8ece035d54ce7c59268c67d59f4786387af8f855348dc1e5cd1c38b71fd0d3dddfe7c0efbc0d88f046b2a85fb51172a12f416c",
    "verifiableCredential": {
      "credentialSubject": {
        "seat": "r7"
      },
      "issuer": {
        "id": "did:ethr:rinkeby:0x024d1c79a8570b8018738e5aa7928b19fcfb2f48d804bacb7d61c471b1268dae83"
      },
      "type": [
        "VerifiableCredential"
      ],
      "@context": [
        "https://www.w3.org/2018/credentials/v1"
      ],
      "issuanceDate": "2021-10-11T02:21:46.000Z",
      "proof": {
        "type": "JwtProof2020",
        "jwt": "eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InNlYXQiOiJyNyJ9fSwibmJm
IjoxNjMzOTE4OTA2LCJpc3MiOiJkaWQ6ZXRocjpyaW5rZWJ5OjB4MDI0ZDFjNzlhODU3MGI4MDE4NzM4ZTVhYTc5MjhiMTlmY2ZiMmY0OGQ4MDRiYWNiN2Q2MWM0NzFiMTI2OGRhZTgzIn0.q8CAr0A5tb__XCB1no8WVqu3DOqKEkLSkXUdY2V8ZIcQ68yBog1ZetY3JoxT9c2GTVTNZYHbuf-9ORstcIQYeA"
      }
    }
  },
 */
async function getAllVeramoVCs(): Promise<UniqueVerifiableCredential[]> {
  const res: UniqueVerifiableCredential[] = await VeramoAgent.dataStoreORMGetVerifiableCredentials()

  console.info('저장된 Veramo VCs:', JSON.stringify(res, null, 2));
  return res;
}


export {
  saveVeramoVC,
  verifyVeramoVP,
  isVeramoVC,
  getAllVeramoVCs,
}
