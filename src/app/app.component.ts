import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Birthday Rolodex';
  people = [
    {
      name: 'Cian',
      birthday: new Date('March 31, 2004'),
    },
  ];
}
