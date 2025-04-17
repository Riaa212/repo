import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  baseUrl="/blog"
  constructor(public http:HttpClient) { 

  }

  addComment(blogId:any,commentData:any):Observable<any>
  {
    return this.http.post<any>(this.baseUrl+"/AddComment/"+blogId,commentData)
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
