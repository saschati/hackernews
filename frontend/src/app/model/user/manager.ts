export class UserManager<U extends object> {
  constructor(private _user: U | null = null) {
    this._user = _user
  }

  public get<K extends keyof U>(name: K): U[K] {
    if (this._user === null) {
      throw new Error('User is empty.')
    }

    return this._user[name]
  }

  public isGuest(): boolean {
    return this._user === null
  }
}
