import { Component, OnInit } from '@angular/core';
import { BlogServiceService } from '../../services/blog-service.service';
import { Blog } from '../../model/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Category } from './../../model/category';
import { CategoryServiceService } from '../../services/category-service.service';

@Component({
  selector: 'app-view-blog',
  standalone: false,
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.css'
})
export class ViewBlogComponent
 {

  filePickerCallback(callback: any, value: any, meta: any) {
    if (meta.filetype === 'image') {
      // Open file browser to select an image (this will trigger a file input dialog)
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.addEventListener('change', (event: any) => {
        const file = event.target.files[0];
 
        // Ensure the file is an image
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e: any) {
            callback(e.target.result, { alt: file.name });
          };
          reader.readAsDataURL(file); // Convert the file to base64
        }
      });
      input.click(); // Trigger the file input dialog
    }
  }
  
  blogForm: FormGroup;
  selectedFiles: File[] = [];
  previewImages: string[] = [];

  Blogs:any

  blogModel: Blog = new Blog();

  category:Category[]=[]

  SearchCategory:any
  showDropdown = false;
  filteredCategories: string[] = [];
  constructor(private fb: FormBuilder, private http: HttpClient,private blogCategory:CategoryServiceService) {

    // this.searchCategory();
    // console.log("category==>"+this.category.forEach(a=>a.categoryName))
    // console.log("category==>"+this.getAllcategories())
    this.blogForm = this.fb.group({


    title: [this.blogModel.title, Validators.required],
    content: [this.blogModel.content, Validators.required],
    category: [this.blogModel.category, Validators.required],
    SearchCategory:['',Validators.required]
  });

}

getAllcategories()
{
  this.blogCategory.getCategories().subscribe(res=>this.category=res)
}

onFilesSelected(event: Event): void {
  const files = (event.target as HTMLInputElement).files;
  if (files) 
    {
    this.selectedFiles = Array.from(files);
    this.previewImages = [];

    this.selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => this.previewImages.push(this.blogModel.imageUrls=e.target.result);
      reader.readAsDataURL(file);
    });
  }

  
}

submitBlog(): void {
  const formData = new FormData();
  formData.append('title', this.blogForm.get('title')?.value);
  formData.append('content', this.blogForm.get('content')?.value);

  this.selectedFiles.forEach(file => {
    formData.append('images', file);

  });


  this.http.post('http://localhost:8088/blog/blogs', formData).subscribe({
    next: (res: any) => 
      {
      console.log('Blog saved', res);
      // show success message, reset form, etc
    },
    error: err => console.error('Upload failed', err)
  });
}

allBlogsByCategory:any
// cat:any
searchCategory()
{
  const fd=new FormData();
  fd.append('SearchCategory', this.blogForm.get('SearchCategory')?.value);
  this.blogCategory.searchBlogByCategory(fd.get('SearchCategory')).subscribe(res=>this.allBlogsByCategory=res)
}

onSearch() {
  const inputValue = this.blogForm.get('SearchCategory')?.value?.toLowerCase() || '';
  this.filteredCategories = this.SearchCategory.filter((cat: string)=>
    cat.toLowerCase().includes(inputValue)
  );
  this.showDropdown = true;
}
selectCategory(cat: string) {
  this.blogForm.get('SearchCategory')?.setValue(cat);
  this.showDropdown = false;
}
}


// filtering logic

// categories = ['Technology', 'Travel', 'Food', 'Coding', 'Design'];
// filteredCategories: string[] = [...this.categories];
// selectedCategory: string = '';

// onCategoryInput(event: any) {
//   const value = event.target.value.toLowerCase();
//   this.filteredCategories = this.categories.filter(cat =>
//     cat.toLowerCase().includes(value)
//   );
// }
