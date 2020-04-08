import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Person } from './person';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  personsCollection: AngularFirestoreCollection<Person>;
  persons;
  // personDoc: AngularFirestoreDocument<Person>;

  constructor(public afs: AngularFirestore) {}

  getPersons() {
    this.persons = this.afs.collection('persons').valueChanges();
    return this.persons;
  }

  addPerson(person) {
    this.afs.collection('persons').add(person);
  }
}
