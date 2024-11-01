function setUser(){
    let userName = document.getElementById("userName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;

    let userData = {name: userName, email: userEmail, password: userPassword};

    let users = JSON.parse(localStorage.getItem("users"))

    if(users){
        for(let i=0; i<users.length; i++){
            if(users[i].email == userEmail){
                alert("Email Already Exist");
                return;
            }
        }
    }

    console.log(users);

    if(users){
        users.push(userData);
        localStorage.setItem("users" , JSON.stringify(users))
    }else{
        localStorage.setItem("users" , JSON.stringify([userData]))
    }
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("userPassword").value = "";
}

document.getElementById("signUpForm").addEventListener("submit", function(event){
    event.preventDefault();
    setUser();
});

function checkUser(){
    let userEmail = document.getElementById("inputEmail").value;
    let userPass = document.getElementById("inputPass").value;
    let allUsers = JSON.parse(localStorage.getItem("users"));

    let notMached = true;

    for(let i=0; i < allUsers.length; i++){
        if(allUsers[i].email == userEmail){
            notMached = false;
            if(userPass == allUsers[i].password){
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
