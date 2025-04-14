import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  baseUrl="/blog"
  constructor(public http:HttpClient) { 

  }

  getAllCommentsByBlogId(blogId:any):Observable<any[]> 
  {
    return this.http.get<any[]>(this.baseUrl+"/getCommentsByBlogId/"+blogId)
  }

  deleteCommentById(id:any):Observable<any>
  {
    return this.http.delete<any>(this.baseUrl+"/deleteCommentById/"+id)
  }
}
