import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  personForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthdate: new FormControl(''),
  });

  onSubmit() {
    console.warn(this.personForm.value);
  }
}
