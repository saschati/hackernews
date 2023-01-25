import LocalStorage from 'app/storage/local'
import Storage from 'types/app/storage'

export enum StorageType {
  LOCAL,
}

const storages = new Map<StorageType, Storage>([[StorageType.LOCAL, new LocalStorage()]])

const useStorage = <T extends Storage>(type: StorageType): T => {
  return storages.get(type) as T
}

export default useStorage
