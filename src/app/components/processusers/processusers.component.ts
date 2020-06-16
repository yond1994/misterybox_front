import {Component, Input, OnInit} from '@angular/core';
import {UsersComponent} from '../../pages/users/users.component';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-processusers',
  templateUrl: './processusers.component.html',
  styleUrls: ['./processusers.component.css']
})
export class ProcessusersComponent implements OnInit {
  users: any = [];
  constructor(private rest: ApiService) {

  }

  async ngOnInit() {
    const paramsno = {
      limit: 1000,
      page: 1,
      sort: 'name',
      order: 1
    };
    this.users = [];
    await this.rest.get('/clients', paramsno).then((r: any) => {
      const res = r.docs;
      res.forEach(element => {
        this.users.push(element.name ? element.name : '--');
      });
    });
    console.log(this.users);
    // let words = ["Hamdi", "One", "Graphics", "Design", "Social", "Ibrahim", "Sarah","Amna","Salah", "UX/UI", "Web","Salma", "Heba", "Mohammed", "Azma", "Ahmed", "Saleem"];
    // window.addEventListener('load', () => {
    //
    // }, false);
    const randoms = window.document.getElementsByClassName('randoms');
    for (let  i = 0; i < randoms.length; i++)
      this.changeWord(randoms[i]);

  }

  changeWord(a) {
    a.style.opacity = '0.1';
    a.innerHTML = this.users[this.getRandomInt(0, this.users.length - 1)];
    setTimeout(() => {
      a.style.opacity = '1';
    }, 425);
    setTimeout(() => {
      this.changeWord(a);
    }, this.getRandomInt(500, 800));
  }


  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
