import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = null;
  authCtx: Observable<any> = null;

  private userRef = null;
  private userObj = null;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {
    this.authCtx = this.auth.authState;
    this.auth.authState.subscribe(user => {
      if (user) {
        this.authState = user;

        this.userRef = this.db.object('Users/' + user.uid);
        this.userObj = this.userRef.valueChanges();

      }
    });
  }

  get isSignedIn() {
    return this.authState != null;
  }

  get userName() {
    return this.authState != null ? (this.authState.displayName || this.authState.email) : null;
  }

  public signIn(email, pass) {
    return this.auth.auth.signInWithEmailAndPassword(email, pass);
  }

  public signOut() {
    this.authState = null;
    return this.auth.auth.signOut();
  }

}
