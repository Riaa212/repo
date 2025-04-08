import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';
import { UpdateBlogComponent } from './blog/update-blog/update-blog.component';
import { CreateBlogComponent } from './blog/create-blog/create-blog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SearchBlogComponent } from './blog/search-blog/search-blog.component';
import { Home1Component } from './home1/home1.component';
import { Home2Component } from './home2/home2.component';
import { ForgetPwdComponent } from './forget-pwd/forget-pwd.component';
import { AllBlogsComponent } from './blog/all-blogs/all-blogs.component';
import { ProfileComponent } from './User/profile/profile.component';
import { OtpComponent } from './otp/otp.component';
import { authGraudGuard } from './auth-graud.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home1',component:Home1Component},
  {path:'home2',component:Home2Component},
  {path:'profile',
    component:ProfileComponent,
    canActivate:[authGraudGuard]
  },
  {path:'registration',component:RegistrationComponent},
  {path:'login',component:UserLoginComponent},
  {path:'forgetPassword',component:ForgetPwdComponent},
  {path:'search',component:SearchBlogComponent},
  {path:'otp',component:OtpComponent},
  {path:'Blogs',component:ViewBlogComponent},
  {path:'createBlog',component:CreateBlogComponent},
  {path:'allBlogs',component:AllBlogsComponent,
    canActivate:[authGraudGuard],
    children:[
      {path:'viewBlog',component:ViewBlogComponent},
      {path:'createBlog',component:CreateBlogComponent},
      {path:'updateBlog',component:UpdateBlogComponent}
    ]
  },
  // {path: '', redirectTo: 'home', pathMatch: 'full' },
  // {path:'blogs',component:ManageBlogComponent},
  // {path:'blog',component:ManageBlogComponent,
  //   children:[
  //     // {path: '', redirectTo: 'allBlogs', pathMatch: 'full' },
  //     {path:'viewBlog',component:ViewBlogComponent},
  //     {path:'createBlog',component:CreateBlogComponent},
  //     {path:'updateBlog',component:UpdateBlogComponent}
  //   ]
  // },
  {path:'**',component:ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
