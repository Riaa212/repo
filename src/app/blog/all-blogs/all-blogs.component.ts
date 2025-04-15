import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../../services/blog-service.service';
import { PaginatedResponse } from '../../Response/paginated-response';
import { Blog } from '../../model/blog';
import { Category } from './../../model/category';
import { Rating } from '../../model/rating';

@Component({
  selector: 'app-all-blogs',
  standalone: false,
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.css'
})
export class AllBlogsComponent implements OnInit
{

  emps:PaginatedResponse[]=[];
  emp:[]=[]
  blog: Blog[] = [];  // Initialize the array to store employee data
  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = -1;

  previous:number=0
  next:number=0
  
  
  ngOnInit() {
    this.OnNext()
    console.log("get All Blogs==>"+this.getAllBlogs())
  }

  Blogs:any

  constructor(public blogService:BlogServiceService){
  }

  // count:any=0
  // previousVal:any
  // btn1(event:Event){
  //   this.count=this.count+1
  //   if(this.count>=2)
  //   {
  //     this.count-=1
  //   }
  //   console.log(this.count)
  // }


  getAllBlogs()
  {
    this.blogService.getAllBlogs(this.pageIndex,this.pageSize).subscribe(
      (rs)=>{this.Blogs=rs.content},
      (error)=>{console.log(error)}

    );
  }

  Onprevious()
  {
    this.pageIndex--
    this.previous=this.pageIndex
    console.log(this.previous)
    console.log(this.blogService.getAllBlogs(this.previous,this.pageSize).subscribe(a=>this.Blogs=a.content))
  }
  onRate(blogid:any,event:Event)
  {
    
  }
  rate:any
  setval(val:any)
  {

    this.rate=val
    console.log(val)
    this.blogService.addrating(6,this.rate,1).subscribe((rs)=>console.log(rs))
  }
  OnNext()
  {
    this.pageIndex++
    this.next=this.pageIndex
    console.log(this.blogService.getAllBlogs(this.next,this.pageSize).subscribe(a=>this.Blogs=a.content))
  }

  deleteBlogById(id:any)
  {
    console.log("delete id called..")
    console.log("id is===>"+id)

    this.blogService.deleteBlogById(id).subscribe(()=>{
      alert(id+"blog deleted sucessfully...")
    })
  }
}
