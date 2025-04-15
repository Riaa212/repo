import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { FooterComponent } from './footer/footer.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { UpdateBlogComponent } from './blog/update-blog/update-blog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ManageBlogComponent } from './blog/manage-blog/manage-blog.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { Home1Component } from './home1/home1.component';
import { Home2Component } from './home2/home2.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AllBlogsComponent } from './blog/all-blogs/all-blogs.component';
import { ProfileComponent } from './User/profile/profile.component';
import { OtpComponent } from './otp/otp.component';
import { SearchBlogComponent } from './blog/search-blog/search-blog.component';
// import { ForgetPwdComponent } from './User/forget-pwd/forget-pwd.component';
// import { SearchBlogComponent } from './search-blog/search-blog.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { loggingInterceptor } from './Interceptor/interceptor';
import { CommentsComponent } from './blog/comments/comments.component';
import { NgFor, NgForOf } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    NavbarComponent,
    ViewBlogComponent,
    FooterComponent,
    CreateBlogComponent,
    UpdateBlogComponent,
    ErrorPageComponent,
    ManageBlogComponent,
    UserLoginComponent,
    Home1Component,
    Home2Component,
    ForgetPwdComponent,
    AllBlogsComponent,
    ProfileComponent,
    OtpComponent,
    SearchBlogComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterModule,
    FormsModule,
    EditorModule,
  ],
  providers: [provideNativeDateAdapter(),
    { provide: HTTP_INTERCEPTORS, useClass: loggingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
