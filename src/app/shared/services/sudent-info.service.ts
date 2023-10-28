import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Istudent } from '../models/studentinterface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';


@Injectable({
  providedIn: 'root'
})
export class SudentInfoService {
  stdUrl=`${environment.baseUrl}/students.json`;
  private stdSub$ : Subject<Istudent> = new Subject<Istudent>();
  public stdSubObs$=this.stdSub$.asObservable()

  private stdUpdateSub$ :Subject<Istudent> = new Subject<Istudent>();
  public  stdUpdateObs$=this.stdUpdateSub$.asObservable()
  constructor(private _httpClient : HttpClient,
              private _snackBar : SnackbarService
              
              ) { }
  

  getAllStd():Observable<Array<Istudent>>{
    return this._httpClient.get<Array<Istudent>>(this.stdUrl)
          .pipe(
            map((res : any) => {
              console.log(res);
              let stdArray:Array<Istudent>=[];
              for (const key in res) {
               stdArray.push({...res[key],id:key})
              }
              return stdArray
            })
          )
  }

  createStdform(std:Istudent){
    return this._httpClient.post(this.stdUrl,std)
    this._snackBar.openSnackBr(`Student is added suuccessfully`, `close`)
  }

  sendStdForm(stdInfo:Istudent){
    this.stdSub$.next(stdInfo)
  }
  getUpdateStd(student:Istudent):Observable<Istudent>{
    let updateUrl=`${environment.baseUrl}/students/${student.id}.json`
    return this._httpClient.patch<Istudent>(updateUrl,student)
  }

  sendUpdateStdForm(UpdateStd:Istudent){
    this.stdUpdateSub$.next(UpdateStd)
  }

  deleteStd(deleteId:any):Observable<null>{
    let deleteUrl = `${environment.baseUrl}/students/${deleteId}.json`
    return this._httpClient.delete<null>(deleteUrl)
  }
}
