import { Schema as CommonSchema } from './model/common'
import { Schema as LinkSchema } from './model/link'
import { Schema as UserSchema } from "./model/user";
import { Schema as VoteSchema } from "./model/vote";

export default [
    CommonSchema,
    LinkSchema,
    UserSchema,
    VoteSchema,
]