# redux-persist-react-native-fs

[![npm version](https://img.shields.io/npm/v/redux-persist-react-native-fs.svg?style=flat-square)](https://www.npmjs.com/package/redux-persist-react-native-fs)
[![npm downloads](https://img.shields.io/npm/dt/redux-persist-react-native-fs.svg?style=flat-square)](https://www.npmjs.com/package/redux-persist-react-native-fs)



React Native File System adapter for redux-persist storage.
[Learn more](https://github.com/rt2zz/redux-persist).

## Installation
1. Install [react-native-fs and link it](https://github.com/itinance/react-native-fs) to native android, ios, etc.
```
npm i --save react-native-fs
react-native link react-native-fs
```
2. Install this library
```
npm i --save redux-persist
```

## Usage
```javascript
import { NativeStorage } from 'redux-persist-react-native-fs'

/**
* For redux-persist
*/
const persistConfig = {
  storage: NativeStorage,
  // ...other config
}

export const persistor = persistStore(store, persistConfig)

/**
* Stand alone or for testing
*/
await NativeStorage.setItem('first', { test: 'common' })
await NativeStorage.setItem('nest', { of: { course: { is: 'nested' } }})
await NativeStorage.setItem('second', { of: { course: { is: 'nested' } }})
console.log({ keys: await NativeStorage.getAllKeys() })
NativeStorage.removeItem('second')
console.log({ tree: await NativeStorage.getFullTree() })
console.log({ first: await NativeStorage.getItem('first') })
```
