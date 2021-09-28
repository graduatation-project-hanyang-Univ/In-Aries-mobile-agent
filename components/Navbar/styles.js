import React from 'react'

import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  navView: {
    width: '101%',
    top: -8,
    marginLeft: '-0.5%',
    height: '100%',
    padding: 20,
    paddingTop: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 0,
    borderTopWidth: 1,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
    borderColor: '#A7A6A6',
    borderBottomWidth: 0,
  },
  navButton: {
    alignItems: 'center',
    width: '20%',
  },
  textSmall: {
    fontSize: 10,
  },
})

export default styles
