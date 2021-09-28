import { Dimensions, StyleSheet } from 'react-native'

let screenWidth = Dimensions.get('window').width

const primaryColor = '#343f40'
const secondaryColor = '#1b2624'
const white = '#ffffff'
const gray = '#a6a39f'
const black = '#0d0d0d'

const Styles = StyleSheet.create({
  mainView: {
    alignSelf: 'stretch',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    backgroundColor: white,
  },
  viewFull: {
    height: '100%',
    backgroundColor: white,
  },
  viewOverlay: {
    height: '75%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  messageBox: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  h1: {
    fontSize: 36,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 22,
    textAlign: 'center',
  },
  textUpper: {
    textTransform: 'uppercase',
  },
  textPrimary: {
    color: primaryColor,
  },
  textSecondary: {
    color: secondaryColor,
  },
  textWhite: {
    color: '#eee',
  },
  textGray: {
    color: gray,
  },
  textBlack: {
    color: black,
  },
  textGreen: {
    color: '#388e48',
  },
  textBlueDark: {
    color: '#0A1C40',
  },
  textRedDark: {
    color: '#5c0e0e',
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  backgroundPrimary: {
    backgroundColor: primaryColor,
  },
  backgroundSecondary: {
    backgroundColor: secondaryColor,
  },
  backgroundWhite: {
    backgroundColor: white,
  },
  backgroundGray: {
    backgroundColor: gray,
  },
  backgroundBlack: {
    backgroundColor: black,
  },
  backgroundButton: {
    backgroundColor: '#24a0ed',
  },
  header: {
    height: '28%',
    justifyContent: 'center',
  },
  smallHeader:{
    height: '23%',
    justifyContent: 'center',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  pinTab: {
    alignItems: 'center',
    backgroundColor: '#f4c257',
    height: '100%',
  },
  formLabel: {
    height: 46,
    width: 0.5 * screenWidth,
    marginBottom: 10,
    borderBottomWidth: 1.5,
    borderRadius: 1,
    textAlign: 'center',
    letterSpacing: 16,
    borderColor: gray,
    fontSize: 22,
    color: '#000',
  },
  formLabelFocused: {
    borderColor: secondaryColor,
    borderBottomWidth: 2,
  },
  button: {
    marginVertical: 7,
    minWidth: 150,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonGreen: {
    backgroundColor: '#388e48',
  },
  buttonRed: {
    backgroundColor: '#5c0e0e',
  },
  buttonBlue: {
    backgroundColor: '#0A1C40',
  },
  whiteTab: {
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tableItem: {
    borderBottomWidth: 1.2,
    borderColor: '#0A1C40',
    height: 70,
    width: '115%',
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tableItemScroll:{
    borderBottomWidth: 1.2,
    borderColor: '#0A1C40',
    height: 80,
    width: '115%',
  },
  arrow: {
    height: 26,
    width: 48,
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
  backbutton: {
    marginBottom: 15,
    alignSelf: 'flex-end',
  },
  tableListItem: {
    paddingLeft: 30,
    display: 'flex',
    alignItems: 'center',
  },
  tableSubItem: {
    height: 50,
  },
  credView: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 12,
    borderTopColor: black,
    height: '100%',
  },
  ticketList: {
    width: Dimensions.get('screen').width * 0.90,
    backgroundColor: white,
    borderColor: black,
    borderRadius: 5,
  },
  headerLeft:{
    alignSelf: 'flex-start',
    marginStart: 10,
    fontSize: 20,
    textAlign: 'center',
  }
})

export default Styles
