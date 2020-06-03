import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  list: any;
  countpage: any;
  hasNextPage: any;
  hasPrevPage: any;
  limit: any =  15;
  page: any =  1;
  order: any =  -1;
  totalPages: any;
  constructor(private rest: ApiService,  private utils: UtilsService) { }

  ngOnInit(): void {
    const params = {
      limit: this.limit,
      page: this.page,
      order: this.order
    }
    this.rest.get('/clients', params).then((response: any) => {
      this.list = response.docs;
      this.countpage = response.totalDocs;
      this.hasNextPage = response.hasNextPage;
      this.hasPrevPage = response.hasPrevPage;
      this.totalPages = response.totalPages;
    }).catch(e => {
      this.utils.openSnackBar('Error', 'error', 2000);
    });

  }
  pagintate(type) {
    console.log(type);
    if (type === 'next') {
      this.page = this.page + 1;
      this.ngOnInit();
    } else {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

}
