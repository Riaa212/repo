import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommentServiceService } from '../../services/comment-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Comment } from '../../model/comment';
import { User } from '../../model/user';
import { BlogServiceService } from '../../services/blog-service.service';
import { Blog } from '../../model/blog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginStorageService } from '../../login-storage.service';

@Component({
  selector: 'app-comments',
  standalone: false,
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit
 {

  commentData:Comment[]=[]
  blogData:any
  userData:any
  id:any
  uid:any
 commentInputData:any
 cUser:any
  constructor(public cmtService:CommentServiceService,private route: ActivatedRoute,
    private userService:UserServiceService,
    private blogservice:BlogServiceService ,
    private fb:FormBuilder,
    private storage:LoginStorageService
  )
  {
    this.getUserById();
    this.getUserByEmail();
    // console.log(this.cUser.id)
    // console.log("conhsuh")
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log("USER ID: "+this.id)
    // console.log('Blog ID:', this.id);
    this.getAllComments(this.id)
    this.getBlogData(this.id);
    // this.getAllComments(id)
    // this.getUserById()
    this.commentInputData=fb.group({
      comment_content:['',Validators.required],
      userId:['',Validators.required]
    })
  }
  blogRating={
    'userId':3,
    'rating':0
  }

  ngOnInit(){

  }

  getBlogData(id:any)
  {
    // console.log("blog id==>"+id)
    this.blogservice.getBlogById(id).subscribe((rs)=>this.blogData=rs)
    
  }
  
  //add rating
  rate:any
  setval(val:any)
  {
    this.rate=val
    this.blogRating.rating=this.rate
    // console.log("rating...."+this.rate)
    // console.log("blog rating===>"+thi.blogRating.rating)
    this.blogservice.addrating(this.id,this.blogRating).subscribe((rs)=>console.log(rs))
    alert('ratings added successfully...')
  }
  //get all comments
    getAllComments(blogid:any)
    {
      //commet data 
      this.cmtService.getAllCommentsByBlogId(blogid).subscribe((rs)=>{this.commentData=rs})


      this.cmtService.getAllCommentsByBlogId(blogid).subscribe((comments) => {
        this.commentData = comments;
        this.useremail=this.storage.getLoginData("uname")

        this.commentData.forEach(comment => {
          // console.log("comment userid:"+comment.userId)
          this.userService.getUserByUserId(comment.userId).subscribe(user => {
            comment.user = user;
          });
        });
      });
    
    }

    userId:any
    useremail:any
    getUserById()
    {
      // getUserByEmail
        this.userService.getUserByUserId(1).subscribe((rs)=>this.userId=rs)
      // return null;
    }

    currrentUserId:any
    getUserByEmail()
    {
      // console.log("get user by email called...")
      this.useremail=this.storage.getLoginData("uname")
      // console.log("current user====>"+this.useremail)
      this.userService.getUserByEmail(this.useremail).subscribe((rs)=>{
        this.currrentUserId=rs.id
        // console.log(rs.id)
      },
    )
    }
  //delete comment by id
  deleteComment(commentId: any) {
      this.cmtService.deleteCommentById(commentId).subscribe(rs=>alert('deleted successfully'));
      // this.blogData.filter((a:any)=>a!=commentId)
      // this.commentData.filter((a:any)=>a.id!=commentId)
      location.reload()
  }
  
  addComment(){
    // console.log(this.blogData.user_id+"blog id:"+this.id)
    this.cmtService.addComment(this.id,this.commentInputData.value).subscribe()
    location.reload()
  }

  comments = [
    {
      username: 'john',
      text: 'Wah kya blog hai! Kaafi informative.',
      showReply: false,
      replyText: '',
      replies: [
        { username: 'Admin', text: 'Shukriya Hamza!' }
      ]
    },
    {
      username: 'Sara',
      text: 'Loved the writing style! 💯',
      showReply: false,
      replyText: '',
      replies: []
    }
  ];

  toggleReply(comment: any) {
    console.log(comment.showReply)
    comment.showReply = !comment.showReply;
  }

  submitReply(comment: any) {
    if (comment.replyText.trim()) {
      comment.replies = comment.replies || [];
      comment.replies.push({ username: 'You', text: comment.replyText });
      comment.replyText = '';
      comment.showReply = false;
    }
  }


  deleteReply(comment: any, reply: any) {
    comment.replies = comment.replies.filter((r: any) => r !== reply);
  }


}
