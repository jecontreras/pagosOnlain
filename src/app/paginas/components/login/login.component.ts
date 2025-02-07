import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserAction } from 'src/app/redux/app.actions';
import { USER } from 'src/app/interfaces/user';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public data:any = {};
  constructor(  
    private _login: LoginService,
    private _store: Store<USER>,
    private router: Router,
    private _authSrvice: AuthService,
  ) { 
    this._store.select("name")
    .subscribe((store:any)=>{
      //console.log(store);
    });
    if (this._authSrvice.isLoggedIn()) {
      this.router.navigate(['dashboard/home']);
    }
  }

  ngOnInit() {
  }
  login(){
    this._login.login(this.data).subscribe(rta=>this.llenarStore(rta), (error)=>console.error(error));
  }
  llenarStore(res:any){
    if( !res.success ) return false;
    let accion = new UserAction(res.data, 'post');
    this._store.dispatch(accion);
    console.log(this.router)
    this.router.navigate(['dashboard']);
  }

}
