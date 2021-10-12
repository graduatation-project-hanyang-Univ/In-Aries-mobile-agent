import React from 'react'

import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  tabView: {
    backgroundColor: '#ddd',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: '7%',
  },
  icon: {
    fontSize: 26,
    top: 10,
  },
  button: {
    marginVertical: 7,
    width: 125,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#0d0d0d',
  },
  buttonText: {
    maxWidth: 120,
    flexWrap: 'wrap',
    textAlign: 'right',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: -10,
    top: 40,
  },
  buttonAccept: {
    backgroundColor: '#24a0ed',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    bottom: 30,
    right: '35%',
    width: '130%',
    height: 45,
  },
  buttonDeny: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0d0d0d',
    bottom: 30,
    left: '5%',
    width: '55%',
    height: 45,
  },
  buttonIcon: {
    width: 30,
    height: 43,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: "center",
    marginLeft: 10,
  },
})

export default Styles
