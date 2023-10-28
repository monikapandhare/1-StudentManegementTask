import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SudentInfoService } from '../../services/sudent-info.service';
import { Istudent } from '../../models/studentinterface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomRegex } from '../../validators/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.scss']
})
export class StudentformComponent implements OnInit {
  public stdForm !:FormGroup
  public editstdId!: Istudent;
  public genderArray = ['Male','Female']
  public editMode : boolean = false;
  constructor(private _stdService : SudentInfoService,
              private _dialogRef : MatDialogRef<StudentformComponent>,
              @Inject(MAT_DIALOG_DATA)getStd : Istudent,
              private _snackBar : SnackbarService) {
                console.log(getStd);
                this.createStdForm()
                this.editstdId = getStd;
                if(getStd){
                  this.stdForm.patchValue(getStd);
                  this.editMode = true;
                  this._stdService.getUpdateStd(getStd)
                }
               }

  ngOnInit(): void {
  

  
    
  }
  get f(){
    return this.stdForm.controls
    console.log(this.stdForm);
    
  }
  createStdForm(){
    this.stdForm = new FormGroup({
      FirstName :new FormControl(null, [Validators.required]),
      LastName :new FormControl(null, [Validators.required]),
      Email :new FormControl(null, [Validators.required,Validators.pattern(CustomRegex.email)]),
      Contact :new FormControl(null, [Validators.required,Validators.pattern(CustomRegex.contact)]),
      Gender :new FormControl(null, [Validators.required]),
      RollNo :new FormControl(null, [Validators.required]),
    })
  }
  onstdAdd(){
    if(this.stdForm.valid){
      let data = this.stdForm.value;
      this._stdService.createStdform(data)
          .subscribe(res => {
            console.log(res);
            this._stdService.sendStdForm(data)
          this._snackBar.openSnackBr(`std Added Successfully`,`close`)
            this._dialogRef.close()
           
          })
          this.stdForm.reset()
    }
  }
  onCancel(){
    this._dialogRef.close()
  }

  onUpdateStd(){
    let updatedStd:Istudent={...this.stdForm.value,id:this.editstdId.id}
    this._stdService.getUpdateStd(updatedStd)   
        .subscribe(res=>{
          this._stdService.sendUpdateStdForm(res)
          this._snackBar.openSnackBr(`std ${res.FirstName} is updateted successfully`,`close`)
          this._dialogRef.close()

        })
  }

}
