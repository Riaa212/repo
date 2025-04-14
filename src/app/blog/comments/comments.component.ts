import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommentServiceService } from '../../services/comment-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { Comment } from '../../model/comment';
import { User } from '../../model/user';
import { BlogServiceService } from '../../services/blog-service.service';
import { Blog } from '../../model/blog';

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
  constructor(public cmtService:CommentServiceService,private route: ActivatedRoute,private userService:UserServiceService
   ,private blogservice:BlogServiceService 
  )
  {
    console.log("conhsuh")
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Blog ID:', this.id);
    this.getAllComments(this.id)
    this.getBlogData(this.id);
    // this.getAllComments(id)
    // this.getUserById()
  }

  ngOnInit(){

  }

  getBlogData(id:any)
  {
    this.blogservice.getBlogById(id).subscribe((rs)=>this.blogData=rs)
  }
  
  //get all comments
    getAllComments(blogid:any)
    {
      
      //commet data 
      this.cmtService.getAllCommentsByBlogId(blogid).subscribe((rs)=>{this.commentData=rs})


      this.cmtService.getAllCommentsByBlogId(blogid).subscribe((comments) => {
        this.commentData = comments;
      
        this.commentData.forEach(comment => {
          this.userService.getUserId(comment.userId).subscribe(user => {
            comment.user = user;
          });
        });
      });
    
    }

  //delete comment by id
  deleteComment(commentId: any) {
      this.cmtService.deleteCommentById(commentId).subscribe(rs=>alert('deleted successfully'));
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
