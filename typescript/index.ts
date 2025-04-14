// interface userType{
//     name:string,
//     age?:number,
// }

// interface Student extends userType{
//     roll_number:number
// }

// let obj:userType = {
//     name: "Shariq",
//     age: 16
// }

// let obj2:userType = {
//     name: "Abc",
//     age: 32
// }

// let stu1:Student = {
//     name: "Shariq",
//     age:2,
//     roll_number: 123
// } 

// let stu2:Student = {
//     name: "Shariq",
//     roll_number: 123
// }

//// Function ////

// function myFunction(a:string):string{
//     // console.log("Hello World");
//     return a
// }

// myFunction("32")

//// Function ////

//// Classes ////

class AdmissionForm{
    constructor(name:string, age:number, gender:string){
        this.name = name
        this.age = age
        this.gender = gender
    }
    name:string;
    age: number;
    gender: string;
    submit():void{
        console.log(`${this.name} your form is submitted`)
    }
}

let student1 = new AdmissionForm("Shariq", 22, "Male");
let student2 = new AdmissionForm("Abc", 25, "Male");
let student3 = new AdmissionForm("Abcd", 26, "Male");

// console.log(student1 , student2)
student2.submit();
