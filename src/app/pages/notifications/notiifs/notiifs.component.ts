import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';

@Component({
  selector: 'app-notiifs',
  templateUrl: './notiifs.component.html',
  styleUrls: ['./notiifs.component.css']
})
export class NotiifsComponent implements OnInit {
  invitations: any[] = [];
  id: any;
  private baseUrl = 'http://localhost:3000/api/v1/invitation';
  constructor(private invitationService: InvitationService,private http:HttpClient, private auth:AuthUserService) { }

  ngOnInit(): void {
    let token = {
      token: this.auth.getToken()
    };

    console.log(token);

    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`, token).subscribe(
        (res: any) => {
        

          
          this.id = res.customer._id;
          console.log(this.id);
          
        }, (err: any) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
    this.getAllInvitations();
  }

  getAllInvitations(): void {
    this.invitationService.getAllInvitations().subscribe(
      (invitations: any[]) => {
        console.log(invitations)
        this.invitations = invitations.filter((user:any)=>user.sender != this.id && user.status=="pending");
        console.log(this.invitations)
      },
      (error: any) => {
        console.error('Error fetching invitations:', error);
      }
    );
  }

  acceptInvitation(id: any) {
    return this.http.put(`${this.baseUrl}/${id}/accept`, {}).subscribe((res)=>{
      console.log(res);
      this.getAllInvitations();
    },(err:any)=>{
      console.log(err)
    });
  }

  rejectInvitation(id: any) {
    return this.http.put(`${this.baseUrl}/${id}/reject`, {}).subscribe((res:any)=>{
      console.log(res);
      this.getAllInvitations();
    },(err:any)=>{
      console.log(err);
      
    });
  }

  public  formatReadableDate(dateString:any) {

    const options:any = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }


}
