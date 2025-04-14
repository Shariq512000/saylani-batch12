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
var AdmissionForm = /** @class */ (function () {
    function AdmissionForm(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    AdmissionForm.prototype.submit = function () {
        console.log("".concat(this.name, " your form is submitted"));
    };
    return AdmissionForm;
}());
var student1 = new AdmissionForm("Shariq", 22, "Male");
var student2 = new AdmissionForm("Abc", 25, "Male");
// console.log(student1 , student2)
student2.submit();
