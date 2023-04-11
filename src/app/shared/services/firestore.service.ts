import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/models/user';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getUser(id: string): Observable<User | undefined> {
    return this.usersCollection.doc<User>(id).valueChanges().pipe(
      take(1),
      map(user => {
        if (user) {
          user.id = id;
        }
        return user;
      })
    );
  }


  addUser(user: User): Promise<DocumentReference> {
    return this.usersCollection.add(user);
  }

  updateUser(user: User): Promise<void> {
    return this.usersCollection.doc(user.id).update({ email: user.email, password: user.password });
  }

  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }
}
