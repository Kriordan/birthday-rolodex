import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AppService } from './app.service';
import { Person } from './person';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private personsCollection: AngularFirestoreCollection<Person>;
  public persons;
  public title = 'Birthday Rolodex';

  personForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
  });

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.personsCollection = this.afs.collection<Person>('persons');
    this.persons = this.personsCollection.valueChanges({ idField: 'personId' });
    this.persons.subscribe((x) => console.log(x));
  }

  onSubmit() {
    this.personsCollection.add(this.personForm.value);
    console.log(this.personForm.value);
  }

  deletePerson(personId) {
    this.personsCollection.doc(personId).delete();
  }
}
