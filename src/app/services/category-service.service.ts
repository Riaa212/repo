import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  baseUrl="http://localhost:8088/category"
  
  constructor(public http:HttpClient) {
    
   }

   //get all categories
   getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl+"/getAllCategory");

  }

  searchBlogByCategory(category:any):Observable<Blog[]>
  {
    return this.http.get<Blog[]>(this.baseUrl+"/searchBlogByCategory/"+category)
  }
}
