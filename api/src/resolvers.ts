import merge from 'lodash/merge'
import { Resolver as LinkResolver } from './model/link'
import { Resolver as UserResolver } from './model/user'

export default merge(
    LinkResolver,
    UserResolver,
)