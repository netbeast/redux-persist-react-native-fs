/**
* @flow
*/

import fs from 'react-native-fs'
import {Platform} from 'react-native'

const APP_BASE_PATH =
  Platform.OS === 'ios' ? fs.MainBundlePath : fs.CachesDirectoryPath
const STORAGE_PATH = `${APP_BASE_PATH}/nativestorage.txt`

export class NativeStorage {
  static async setItem (
    key: string,
    value: Object,
    callback?: ?(error: ?Error) => void
  ) {
    try {
      const tree = await NativeStorage.getFullTree()
      const nextTree = {...tree, [key]: value}
      await fs.writeFile(STORAGE_PATH, JSON.stringify(nextTree))
      if (callback) callback()
    } catch (err) {
      if (callback) callback(err)
      throw err
    }
  }

  static async getItem (
    key: string,
    callback?: ?(error: ?Error, result: ?string) => void
  ) {
    try {
      const tree = await NativeStorage.getFullTree()
      if (callback) callback(null, tree[key])
      return tree[key]
    } catch (err) {
      if (callback) return callback(err)
      throw err
    }
  }

  static async removeItem (key: string, callback?: ?(error: ?Error) => void) {
    try {
      const tree = await NativeStorage.getFullTree()
      const {[key]: keyToRemove, ...nextTree} = tree
      await fs.writeFile(STORAGE_PATH, JSON.stringify(nextTree))
      if (callback) callback()
    } catch (err) {
      if (callback) return callback(err)
      throw err
    }
  }

  static async getAllKeys (callback?: ?(error: ?Error) => void) {
    try {
      const tree = await NativeStorage.getFullTree()
      const keys = Object.keys(tree)
      if (callback) callback(null, keys)
      return keys
    } catch (err) {
      if (callback) return callback(err)
      throw err
    }
  }

  static async getFullTree () {
    let result = {}

    try {
      const text = await fs.readFile(STORAGE_PATH)
      result = JSON.parse(text)
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(STORAGE_PATH, JSON.stringify({}))
        return result
      }

      throw err
    }

    return result
  }
}
