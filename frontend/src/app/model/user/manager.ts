import { User } from 'types/model/user'

export class UserManager {
  constructor(private _user: User | null = null) {
    this._user = _user
  }

  public get<K extends keyof User>(name: K): User[K] {
    if (this._user === null) {
      throw new Error('User is empty.')
    }

    return this._user[name]
  }

  public isGuest(): boolean {
    return this._user === null
  }
}
