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
// class AdmissionForm{
//     constructor(name:string, age:number, gender:string){
//         this.name = name
//         this.age = age
//         this.gender = gender
//     }
//     name:string;
//     age: number;
//     gender: string;
//     submit():void{
//         console.log(`${this.name} your form is submitted`)
//     }
// }
// let student1 = new AdmissionForm("Shariq", 22, "Male");
// let student2 = new AdmissionForm("Abc", 25, "Male");
// let student3 = new AdmissionForm("Abcd", 26, "Male");
// // console.log(student1 , student2)
// student2.submit();
//// Classes ////
//// Generics ////
// function myFunction<S,T>(value1: S, value2: T):[S,T]{
//     return [value1 , value2]
// }
// myFunction(32 , "Abc")
//// Generics ////
//// ENUMS ////
// enum Roles {
//     Student="student",
//     Teacher="teacher",
//     Staff= "Staff"
// }
// let student:Roles = Roles.Student
// console.log(student)
// enum CardinalDirections {
//     North = 2,
//     East,
//     South,
//     West
// }
// // logs 2
// console.log(CardinalDirections.North);
// // logs 5
// console.log(CardinalDirections.West);
//// ENUMS ////
//// Type Inference ////
// let num:any;
// num = 32;
// num = "Shariq"
// num = [2, 3, 5]
// let num2:unknown;
// num2 = 32;
// num2 = "Shariq"
// num2 = [2, 3, 5]
// let s1: number = num;       // Any is assignable to anything 
// // let s2: string = num2;
// console.log(typeof s1 , s1)
// const a = 32;
//// Type Inference ////
//// Union and Intersection Types ////
// function myFunction(a: number | string):number | string{
//     return (typeof a == "number") ? a*2 : a.toUpperCase()
// } 
// console.log(myFunction("Shariq"))
// console.log(myFunction(32))
// interface Person{
//     name: string,
//     age: number
// }
// interface Student{
//     rollNumber: number,
//     course: string
// }
// let student:Person & Student = {
//     name: "Shariq",
//     age: 22,
//     rollNumber: 123,
//     course: "Web & App"
// }
//// Union and Intersection Types ////
// interface Pupil {
//     ID: string;
// }
// interface Adult {
//     SSN: number;
// }
// interface Person {
//     name: string;
//     age: number;
// }
// let person: Pupil | Adult | Person = {
//     ID: '123',
//     age: 6
// };
// const getIdentifier = (person: Pupil | Adult | Person) => {
//     if ('name' in person) {
//         return person.name;
//     }
//     else if ('ID' in person) {
//         return person.ID
//     }
//     return person.SSN;
// }
// console.log(getIdentifier(person))
var Person = /** @class */ (function () {
    function Person(userName, userAge) {
        this.name = userName;
        this.age = userAge;
    }
    return Person;
}());
var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    return Product;
}());
var person = new Person("Shariq", 22);
var product = new Product("Mobile", 22000);
function myFunction(data) {
    if (data instanceof Person) {
        console.log("Person Data");
    }
    else {
        console.log("Product Data");
    }
    // if()
}
myFunction(person);
myFunction(product);
