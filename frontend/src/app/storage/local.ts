import Storage from 'types/app/storage'

class LocalStorage implements Storage {
  set<T>(name: string, value: T): void {
    let _value = String(value)
    if (value instanceof Object) {
      _value = JSON.stringify(value)
    }

    localStorage.setItem(name, _value)
  }

  has(name: string): boolean {
    return localStorage.getItem(name) !== null
  }

  get<T, D>(name: string, defaultVal: D | null = null): T | D | null {
    const data = localStorage.getItem(name)
    if (data === null) {
      return defaultVal
    }

    try {
      return JSON.parse(data)
    } catch (e) {
      return data as T
    }
  }

  remove(name: string): void {
    localStorage.removeItem(name)
  }
}

export default LocalStorage
