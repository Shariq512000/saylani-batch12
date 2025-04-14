//// Generators ////
// function newFunc(){
//     let id = 0;
//     while(true){
//         yield id++
//     }
// }

// let generator = newFunc();

// document.getElementById("idGenerator").addEventListener("click", () => {
//     // console.log(generator.next().value)
//     document.getElementById("uniqueId").innerText = generator.next().value
// });

//// Higher Order Function ////

    /// Higher Order: Wo Function jo dusre function as a parameter accept kre ///
    /// Call Back Function: Wo function jo High Order Function mai as an argument pass ho ///

// function highOrder(userName , cb){
//     // console.log(`Hello ${userName}`)

//     setTimeout(() => {
//         cb(userName)
//     } , 2000)

// }

// const newFunc = (val) => {console.log(`Hello ${val}`)}

// highOrder("Shariq" , newFunc)


//// Higher Order Function ////


//// Promise ////

// let promise = new Promise(function(resolve , reject){
//     // fetch("url").then((res) => {
//     //     resolve(res.data);
//     // })
//     reject("Error ");
// })

// promise.then((res) => {
//     console.log("Res" , res)
// }).catch((err) => {
//     console.log(err)
// })

// console.log("promise" , promise);


//// Exponentiation Operator ////

// let a = 5;
// let b = 6;

// console.log(a ** b)

//// Exponentiation Operator ////


//// Ternary Operator ////

// let a = 5;

// (a == 5) ? console.log("A === 5") : (a > 5) ? console.log("A is greater than 5") : console.log("A is less than 5")

//// Ternary Operator ////

//// Optional Chaining ////

let student = {
    name: "Abc",
    rollNumber: 123,
    batch: "12"
}

console.log(student?.subject?.name);

//// Optional Chaining ////