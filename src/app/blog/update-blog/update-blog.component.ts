import { Component } from '@angular/core';
import { BlogServiceService } from '../../services/blog-service.service';
import { Blog } from '../../model/blog';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryServiceService } from '../../services/category-service.service';
import { Category } from '../../model/category';

@Component({
  selector: 'app-update-blog',
  standalone: false,
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.css'
})
export class UpdateBlogComponent {

  blogData:any
  id:any
  updateBlogData:any
  allCategory:any
  constructor(public blogservice:BlogServiceService,private route: ActivatedRoute,private fb:FormBuilder,private categoryservice:CategoryServiceService){

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Blog ID:', this.id);
    this.getBlogById(this.id)

    this.updateBlogData=fb.group({
      // imgurls:['',Validators.required],
      title:['',Validators.required],
      content:['',Validators.required],
      category:['',Validators.required]
    })
    this.getAllCategories()
  }

  getBlogById(blogId:any)
  {
    this.blogservice.getBlogById(blogId).subscribe((rs)=>{
      this.blogData=rs
    })
  }

  updateBlogById()
  {
      this.blogservice.updateBlogById(this.id,this.updateBlogData).subscribe((rs)=>rs)
  }

  getAllCategories()
  {
    this.categoryservice.getCategories().subscribe(
    (rs)=>{
      this.allCategory=rs
    }
    )
  }
}
