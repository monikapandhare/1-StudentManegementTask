import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Istudent } from '../../models/studentinterface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPostDeleteComponent } from '../confirm-post-delete/confirm-post-delete.component';
import { SudentInfoService } from '../../services/sudent-info.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  @Input()stdentData!:Array<Istudent>
  @Output()emitData : EventEmitter<Istudent>=new EventEmitter<Istudent>()
  @Output()emitStdDelete:EventEmitter<Istudent>=new EventEmitter<Istudent>()
  constructor(private _matDialog : MatDialog,
              private _stdService : SudentInfoService) { }

  ngOnInit(): void {
  }

  onEditStd(std:Istudent){
    this.emitData.emit(std)
  }

  onDeletestd(id:any){
    const dialogConf = this._matDialog.open(ConfirmPostDeleteComponent);

    dialogConf.afterClosed()
    .subscribe(getConfirmation =>{
      console.log(getConfirmation);
      if(getConfirmation){
       this._stdService.deleteStd(id)
              .subscribe(res =>{
                console.log(res);
                this.emitStdDelete.emit(id)
               
              })
  }else{
    return
  }

})
}
}