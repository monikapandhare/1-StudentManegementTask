import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentformComponent } from '../studentform/studentform.component';
import { DialogRef } from '@angular/cdk/dialog';
import { SudentInfoService } from '../../services/sudent-info.service';
import { Istudent } from '../../models/studentinterface';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public stdInfoArray :Array<Istudent> = []
  constructor(
    private _matDialogRef : MatDialog,
    private _studentSer : SudentInfoService,
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
    this._studentSer.getAllStd()
        .subscribe(res =>{
          console.log(res);
          this.stdInfoArray=(res)
          
        })

    this._studentSer.stdSubObs$
        .subscribe(res =>{
          this.stdInfoArray.push(res)
        })

    this._studentSer.stdUpdateObs$
        .subscribe(res =>{
          this.stdInfoArray.forEach(s =>{
            if(s.id === res.id){
              s.FirstName = res.FirstName,
              s.LastName = res.LastName,
              s.Contact=res.Contact,
              s.Email=res.Email,
              s.Gender=res.Gender,
              s.RollNo=res.RollNo
            }
          })
        })    
  }

  onstdAdd(){
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    const dialogRef = this._matDialogRef.open(StudentformComponent,dialogConf)
  }

  onSendData(data:Istudent){
    const dialogConf = new MatDialogConfig();
    dialogConf.disableClose = true;
    dialogConf.autoFocus=true;
    dialogConf.data=data
    const dialogRef = this._matDialogRef.open(StudentformComponent,dialogConf)
  }

  onstdDelete(id:any){
    let getIndex = this.stdInfoArray.findIndex(std =>std.id === id)
    this.stdInfoArray.splice(getIndex, 1)
  }

}
