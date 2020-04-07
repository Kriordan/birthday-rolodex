import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.warn(this.personForm.value);
    console.warn(this.personForm.status);
  }
}
