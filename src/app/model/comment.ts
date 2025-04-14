import { User } from "./user";

export class Comment {
    constructor(public id?:any,public comment_content?:any,public userId?:any,
        public user?:User
    ){}
}
