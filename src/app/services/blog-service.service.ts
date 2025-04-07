import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../model/blog';
import { PaginatedResponse } from '../Response/paginated-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService
 {

  constructor(public http:HttpClient) {
    console.log("Base url===>"+this.baseUrl)
   }

    baseUrl="/blog"

   getAllBlogs(pageNumber:number,pagesize:number):Observable<PaginatedResponse> {
    const params = new HttpParams()

    .set('page', pageNumber.toString())
    .set('size', pagesize.toString())
    return this.http.get<PaginatedResponse>(this.baseUrl+"/getAllBlogs",{params});
  }
  //  getAllBlogs(){
  
  //    console.log("getAll Api call...")
  //  return this.http.get(this.baseUrl+"/getAllBlogs")
  //  }

   getBlogById(id:any)
   {

   }


   //delete blog by id
   deleteBlogById(id:any)
   {
      return this.http.delete(this.baseUrl+"/delete/"+id);
   }

   //update blog by id
   updateBlogById(id:any,blog:Blog)
   {

   }

   //search blog by title
   searchBlogByTitle(title:any)
   {
    
   }

   //get blog by user
   getBlogUserId(userId:any)
  {

  }

  //remaining api to call
  // 1.add comment
  //2.getCommentsByBlogId

}
