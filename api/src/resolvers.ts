import merge from 'lodash/merge'
import { Resolver as LinkResolver } from './model/link'
import { Resolver as UserResolver } from './model/user'
import { Resolver as VoteResolver } from './model/vote'

export default merge(
    LinkResolver,
    UserResolver,
    VoteResolver
);