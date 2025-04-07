import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../../services/blog-service.service';
import { PaginatedResponse } from '../../Response/paginated-response';
import { Blog } from '../../model/blog';

@Component({
  selector: 'app-manage-blog',
  standalone: false,
  templateUrl: './manage-blog.component.html',
  styleUrl: './manage-blog.component.css'
})
export class ManageBlogComponent implements OnInit
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
  constructor(public blogService:BlogServiceService){}

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
      //getAllEmployees(this.previous,this.pageSize).subscribe(a=>this.blog=a.content))
  }
  
  OnNext()
  {
    // console.log("page Index==>"+this.pageIndex)
    this.pageIndex++
    this.next=this.pageIndex
    // this.next=pa
    console.log(this.blogService.getAllBlogs(this.next,this.pageSize).subscribe(a=>this.Blogs=a.content))
      //getAllEmployees(this.next,this.pageSize).subscribe(a=>this.blog=a.content))
  }

  deleteBlogById(id:any)
  {
    console.log("delete id called..")
    console.log("id is===>"+id)

    this.blogService.deleteBlogById(id).subscribe((response)=>{
      alert(id+"blog deleted sucessfully...")
    })
  // (error)=>{
  //   console.log(error)
  // })

  }
}
