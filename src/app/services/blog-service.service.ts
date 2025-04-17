import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from '../model/blog';
import { PaginatedResponse } from '../Response/paginated-response';
import { Observable } from 'rxjs';
import { Rating } from '../model/rating';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService
 {

  constructor(public http:HttpClient) {
    console.log("Base url===>"+this.baseUrl)
   }

    baseUrl="/blog"

      //get all blogs passing argument with page number and page size
   getAllBlogsPagination(pageNumber:number,pagesize:number):Observable<PaginatedResponse> {
    const params = new HttpParams()

    .set('page', pageNumber.toString())
    .set('size', pagesize.toString())
    return this.http.get<PaginatedResponse>(this.baseUrl+"/getAllBlogs",{params});
  }

  //get all blogs without passing page number and page size
   getAllBlogs():Observable<PaginatedResponse>{
    const params = new HttpParams()
     console.log("getAll Api call...")
     return this.http.get<PaginatedResponse>(this.baseUrl+"/getAllBlogs",{params})
   }

   getBlogById(id:any):Observable<Blog[]>
   {
    return this.http.get<Blog[]>(this.baseUrl+"/getBlogById/"+id);
   }

   getRatingByBlogId(blogid:any):Observable<any>
   {
    return this.http.get<any>(this.baseUrl+"/getRatingByBlogId/"+blogid)
   }

   //delete blog by id
   deleteBlogById(id:any)
   {
      return this.http.delete(this.baseUrl+"/delete/"+id);
   }

   //update blog by id
   updateBlogById(id:any,blog:Blog):Observable<Blog>
   {
    return this.http.put<Blog>(this.baseUrl+"/update/"+id,blog,

    )
   }

   //add rating to post
   addrating(blogid:any,ratingData:any):Observable<string>
   {
      return this.http.post<string>(this.baseUrl+"/addrating/"+blogid,ratingData,
        // { observe: 'response' }
        //  {
        //         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        //  }
      )
   }

   
   
   getBlogRatingId(blogId:any)
   {
    return this.http.get(this.baseUrl+"/getRatingByBlogId/"+blogId)
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
