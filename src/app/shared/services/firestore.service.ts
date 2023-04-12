import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IUserData } from 'src/app/models/user';




@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private IUserDatasCollection: AngularFirestoreCollection<IUserData>;
  private IUserDatas: Observable<IUserData[]>;

  constructor(private firestore: AngularFirestore) {
    this.IUserDatasCollection = this.firestore.collection<IUserData>('IUserDatas');
    this.IUserDatas = this.IUserDatasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IUserData;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getIUserDatas(): Observable<IUserData[]> {
    return this.IUserDatas;
  }

  getIUserData(id: string): Observable<IUserData | undefined> {
    return this.IUserDatasCollection.doc<IUserData>(id).valueChanges().pipe(
      take(1),
      map(IUserData => {
        if (IUserData) {
          IUserData.userId = id;
        }
        return IUserData;
      })
    );
  }


  addIUserData(IUserData: IUserData): Promise<DocumentReference> {
    return this.IUserDatasCollection.add(IUserData);
  }

  updateIUserData(IUserData: IUserData): Promise<void> {
    return this.IUserDatasCollection.doc(IUserData.userId).update({ email: IUserData.email });
  }

  deleteIUserData(id: string): Promise<void> {
    return this.IUserDatasCollection.doc(id).delete();
  }
}
