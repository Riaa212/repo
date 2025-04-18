import { Category } from "./category";
import { Rating } from "./rating";

export class Blog {
// category: any;
  // imageUrls: String[] = [];
// imageUrls:any;
    constructor(public id?:any,public title?:any,public content?:any,public user_id?:any,public category?:Category[],
     public  comments?:any,
     public createdAt?:any,
     public lastUpdated?:any,
     public imageUrls?:String[],
     public totalComments?:any,
     public rating?:Rating,
     public totalview?:number
    ){}
}
// string[];
