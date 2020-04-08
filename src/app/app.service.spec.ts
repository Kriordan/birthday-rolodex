import { TestBed } from '@angular/core/testing';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { AppService } from './app.service';
import { BehaviorSubject } from 'rxjs';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (d: any) => new Promise((resolve, reject) => resolve()),
    }),
  }),
};

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: FirestoreStub }],
    });
    service = TestBed.inject(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
