// let arr = [5, 8, 9, 20, 65];
///// Array Destructuring

            /// Rest Operator
// let [a, b, ...rest] = arr
// let a = arr[0]
// let b = arr[1]
// let c = arr[2]

// console.log("rest" , rest)

/// Object Destructuring

// let student = {
//     name: "Shariq",
//     rollNumber: "123",
//     address: "Karachi",
//     course: "Web & App",
//     batch: "12"
// }

// let {name , rollNumber, course, batch} = student;

// console.log(name)
// console.log(rollNumber)
// console.log(course)
// console.log(batch)
// console.log(rollNumber)
// console.log(rollNumber)

//// Default Parameter ////

// const newFunc = (num = 5) => {
//     console.log(num + 10);
// }

// newFunc(55);

//// Rest Parameter ////

// const newFunc = (...nums) => {
//     // console.log(nums)
//     let totalNumber = 0;
//     for(let i=0; i < nums?.length; i++){
//         totalNumber = totalNumber + nums[i]
//     }
//     return totalNumber;
// }

// let sumOfAllNumbers = newFunc(5 , 10, 50, 55, 20, 30, 33);
// console.log(sumOfAllNumbers)

//// Spread Operator ////

// let arr1 = ["abc", "def", "ghi"];
// let arr2 = ["jkl", "mno", "pqr"];

// let arr3 = [...arr1 , ...arr2];

// console.log(arr3);

//// Arrow Function ////

// function myFunction(userName){
//     console.log(`Hello ${userName}`)
// }

// const myFunction = userName => console.log(`Hello ${userName}`)

// myFunction("Shariq");

// let obj = {
//     name: "Shariq",
//     greeting: function(){
//         console.log(`Hello ${this.name} 1`)
//         setTimeout(() => {
//             console.log(`Hello ${this.name} 2`)
//         } , 1000)
//     }
// }

// obj.greeting();

//// Enhanced object literals ////

// let name = "Shariq";
// let rollNumber = "123";
// let course = "Web & App";
// let batch = "12";

// let obj = {
//     name,
//     rollNumber,
//     course,
//     batch,
//     greeting(){
//         console.log(`Hello ${this.name} 1`)
//     }
// }

// // console.log(obj)
// obj.greeting()


//// Iterators & For..of ////

const newFunc = (...nums) => {
    let totalNumber = 0;
    // for(let i=0; i < nums?.length; i++){
    //     totalNumber = totalNumber + nums[i]
    // }
    
    for (let num of nums){
        totalNumber = totalNumber + num
    }
    return totalNumber;
}

let sumOfAllNumbers = newFunc(5 , 10, 50, 55, 20, 30, 33);
console.log(sumOfAllNumbers)