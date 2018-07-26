import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Post } from '../Post';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit() {
  }

  displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  dataSource = new PostDataSource(this.dataService);

  openDialog(): void {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
      data: 'Add Post'
    });

    dialogRef.componentInstance.event.subscribe(result => {
      this.dataService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dataService);
    });
  }

  deletePost(id) {
    if (this.authService.isAuthenticated()) {
      this.dataService.deletePost(id);
      this.dataSource = new PostDataSource(this.dataService);
    } else {
      alert('Login in Before');
    }
  }
}

export class PostDataSource extends DataSource<any> {
  constructor(private dataService: DataService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.dataService.getData();
  }

  disconnect() {
  }
}
