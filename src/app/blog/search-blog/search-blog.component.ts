import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
@Component({
  selector: 'app-search-blog',
  standalone: false,
  templateUrl: './search-blog.component.html',
  styleUrl: './search-blog.component.css'
})
export class SearchBlogComponent {
  searchControl = new FormControl('');
  categoryControl = new FormControl(''); // For category selection

  blogs = [
    { title: "AI in 2025: What's Changing the Game?", category: 'Technology' },
    { title: 'Flavors of Gujarat: A Culinary Journey', category: 'Food' },
    // { title: 'JavaScript Live Search', category: 'Culture' },
    { title: 'Exploring the Hidden Gems of Italy', category: 'Travelling' },
    { title: "A Foodie's Guide to Bangkok", category: 'Travelling' },
    { title: "Winter Wonderland in Iceland", category: 'Travelling' },
    { title: 'The Rise of Indie Music in 2025', category: 'Music' }
  ];

  filteredBlog=this.blogs; // all blogs are visible

  constructor() {
    // Combine both search & category filter
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait 300ms before filtering (better performance)
      map(query => (query ?? '').toLowerCase()) // Ensure query is not null & Convert query to lowercase
    ).subscribe(query => {
      this.filterBlogs(query, this.categoryControl.value); // Call filter function
    });

     // Listen to category dropdown changes
    this.categoryControl.valueChanges.subscribe(category => {
      this.filterBlogs(this.searchControl.value, category);  // Call filter function
    });
  }
  filterBlogs(query: string | null, category: string | null) {
    query = (query ?? '').toLowerCase();
    category = category ?? ''; // Handle null category

    this.filteredBlog = this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(query) &&
      (category === '' || blog.category === category) // Match category if selected
    );
  }
  getUniqueCategories(): string[] {
    return [...new Set(this.blogs.map(blog => blog.category))]; // Extract unique categories
  }

}
