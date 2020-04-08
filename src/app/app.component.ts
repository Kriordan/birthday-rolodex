import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppService } from './app.service';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public persons;
  public title = 'Birthday Rolodex';

  personForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
  });

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getPersons().subscribe((persons) => {
      console.log(persons);
      this.persons = persons;
    });
  }

  onSubmit() {
    this.appService.addPerson(this.personForm.value);
    console.log(this.personForm.value);
  }
}
