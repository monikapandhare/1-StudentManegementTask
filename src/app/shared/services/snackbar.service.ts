import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar : MatSnackBar) {} 
    openSnackBr(msg:string, action:string){
      this._snackBar.open(msg,action,{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'center'
      })
    }
  
}


