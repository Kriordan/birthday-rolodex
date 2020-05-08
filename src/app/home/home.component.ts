import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { Person } from '../person';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private personsCollection: AngularFirestoreCollection<Person>;
  public persons;
  public title = 'Birthday Rolodex';

  personForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
  });

  constructor(private afs: AngularFirestore, public auth: AuthService) {}

  ngOnInit() {
    this.personsCollection = this.afs.collection<Person>('persons', (ref) =>
      ref.orderBy('birthdate')
    );
    this.persons = this.personsCollection
      .valueChanges({
        idField: 'personId',
      })
      .pipe(
        map((data: any) => {
          return data
            .map((person) => {
              const jsDateObj = person.birthdate.toDate();
              const currentYear = new Date().getFullYear();
              const currentYearBirthday = new Date(
                currentYear,
                jsDateObj.getMonth(),
                jsDateObj.getDay()
              );
              const now = new Date().valueOf();
              if (currentYearBirthday.valueOf() < now) {
                currentYearBirthday.setFullYear(currentYear + 1);
              }
              person.nextBirthday = currentYearBirthday.valueOf() - now;
              return person;
            })
            .sort((a, b) => {
              return a.nextBirthday < b.nextBirthday
                ? -1
                : a.nextBirthday > b.nextBirthday
                ? 1
                : 0;
            });
        })
      );

    // this.persons.subscribe((x) => console.log(x));
  }

  onSubmit() {
    this.personsCollection.add(this.personForm.value);
    console.log(this.personForm.value);
  }

  deletePerson(personId) {
    this.personsCollection.doc(personId).delete();
  }
}
