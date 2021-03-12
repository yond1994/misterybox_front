import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from './services/api.service';
import {UtilsService} from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'misteryboxfrom';
  public href: any;
  altercss: any = false;
  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.href = window.location.pathname;
    if (this.href === '/stream') {
      this.altercss = true;
    }
    console.log(this.href);

  }
}
