/**
* @flow
* @providesModule %NativeStorage-promises
*/

import fs from 'react-native-fs'
import { Platform } from 'react-native'

const APP_BASE_PATH = Platform.OS === 'ios' ? fs.MainBundlePath : fs.DocumentDirectoryPath
const STORAGE_PATH = `${APP_BASE_PATH}/nativestorage.txt`

export class NativeStorage {
  static async setItem(key: string, value: string) {
    const tree = await NativeStorage.getFullTree()
    const nextTree = { [key]: value, ...tree }
    console.log('setting', {key, value})
    return fs.writeFile(STORAGE_PATH, JSON.stringify(nextTree))
  }

  static async getItem(key: string) {
    const tree = await NativeStorage.getFullTree()
    return tree[key]
  }

  static async removeItem(key: string) {
    const tree = await NativeStorage.getFullTree()
    const { [key]: keyToRemove, ...nextTree } = tree
    return fs.writeFile(STORAGE_PATH, JSON.stringify(nextTree))
  }

  static async getAllKeys() {
    const tree = await NativeStorage.getFullTree()
    return Object.keys(tree)
  }

  static async getFullTree() {
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

/**
 * Saving this for a posteriori testing
 * ====================================
 *
 * await NativeStorage.setItem('first', { test: 'common' })
 * await NativeStorage.setItem('nest', { of: { course: { is: 'nested' } }})
 * await NativeStorage.setItem('second', { of: { course: { is: 'nested' } }})
 * console.log({ keys: await NativeStorage.getAllKeys() })
 * NativeStorage.removeItem('second')
 * console.log({ tree: await NativeStorage.getFullTree() })
 * console.log({ first: await NativeStorage.getItem('first') })
 */
