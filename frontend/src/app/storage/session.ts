import Storage from 'types/app/storage'

class SessionStorage implements Storage {
  set<T>(name: string, value: T): void {
    let _value = String(value)
    if (value instanceof Object) {
      _value = JSON.stringify(value)
    }

    sessionStorage.setItem(name, _value)
  }

  has(name: string): boolean {
    return sessionStorage.getItem(name) !== null
  }

  get<T, D>(name: string, defaultVal: D | null = null): T | D | null {
    const data = sessionStorage.getItem(name)
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
    sessionStorage.removeItem(name)
  }
}

export default SessionStorage
