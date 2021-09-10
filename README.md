# In-Aries-mobile-agent

[hyperledger/aries-mobile-agent-react-native](https://github.com/hyperledger/aries-mobile-agent-react-native) 사용

해당 repo의 README.md를 보며 실행했으나 mediator에 문제가 있어 mediator는 [AFJ 0.0.60버전](https://github.com/hyperledger/aries-framework-javascript/releases/tag/0.0.60-unstable.0) 사용

> [관련이슈](https://github.com/hyperledger/aries-mobile-agent-react-native/issues/53#issuecomment-892500638)

## 버전
- react-native-cli : 2.0.1
- react-antive : 0.61.5
- node : 12.22.1

## Mediator 설정
- 위 AFJ 다운로드 후 해당 repo에서 ```npm install```
- 동일 repo에서 ```docker-compose -f docker/docker-compose-mediators.yml -f docker/docker-compose-mediators-ngrok.yml up --build```
( [mediation 참고](https://github.com/hyperledger/aries-mobile-agent-react-native/blob/main/docs/MEDIATION.md) )
- 실행 시 mediator 주소를 얻을 수 있다. (bob-mediator의 endpoint)

## local에서 App 실행
- 해당 repo를 clone
- 해당 repo로 이동 후 ```npm install```
- .env MEDIATOR_URL에 위에서 알아낸 ngrok 주소를 작성
- ```npm run start```으로 앱 서버 실행
- ```npm run android```으로 앱 실행
