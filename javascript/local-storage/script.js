function setUser(){
    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;

    let userData = {name: userName, email: userEmail, password: userPassword};

    let users = JSON.parse(localStorage.getItem("users"))

    console.log(users);

    if(users){
        users.push(userData);
        localStorage.setItem("users" , JSON.stringify(users))
    }else{
        localStorage.setItem("users" , JSON.stringify([userData]))
    }

    // let users = [
    //     {name: "user1", rollNumber: "1"},
    //     {name: "user2", rollNumber: "2"},
    //     {name: "user3", rollNumber: "3"},
    //     {name: "user4", rollNumber: "4"},
    //     {name: "user5", rollNumber: "5"},
    //     {name: "user6", rollNumber: "6"},
    //     {name: "user7", rollNumber: "7"},
    // ]

    // localStorage.setItem("users" , JSON.stringify(userData))
    // localStorage.setItem("allUsers" , JSON.stringify(users))
}

function checkUser(){
    let userEmail = document.getElementById("inputEmail").value;
    let userPass = document.getElementById("inputPass").value;
    let allUsers = JSON.parse(localStorage.getItem("users"));

    let notMached = true;

    for(let i=0; i < allUsers.length; i++){
        if(allUsers[0].email == userEmail){
            notMached = false;
            if(userPass == allUsers[0].password){
                alert("Success")
                window.location.href = "./dashboard.html"
            }else{
                alert("Invalid Password")
            }
            break;
        }
    }

    if(notMached){
        alert("Email Did not Matched");
    }

    // console.log(userEmail, userPass, userData);

    // if(userData){
    //     if(userEmail == userData.email){
    //         if(userPass == userData.password){
    //             // alert("Success")
    //             window.location.href = "./dashboard.html"
    //         }else{
    //             alert("Invalid Password")
    //         }
    //     }else{
    //         alert("Invalid Email")
    //     }
    // }else{
    //     alert("Please Register User First")
    // }

}

// console.log();
