

export interface Istudent{
    FirstName:string,
    LastName:string,
    Email:string,
    Contact:number,
    RollNo:number,
    Gender : Igenders,
    id:string
}

export type Igenders = 'Male' | 'Female'