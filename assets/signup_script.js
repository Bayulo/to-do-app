//Sign Up
//get data
// window.localStorage.clear();

const signup_button = document.getElementById("signup_button");
signup_button.onclick = function (e){
    e.preventDefault();
    const newuser_name = document.getElementById("username").value;
    const newuser_password = document.getElementById("password").value;

    //check if we have an old user with these credentials
    let system_users = get_users();
    if(system_users.find(a_user => a_user.username === newuser_name)){
        alert("choose another username");
    }
    else if(newuser_name.length < 5){
        document.getElementById("errors").innerHTML = "User name must be greater than 5 characters";
    }
    else if(newuser_password.length < 7){
        document.getElementById("errors").innerHTML = "Password must be greater than 7 characters";
    }
    else{
        newuser = {
            userid: Math.round((Date.now())/1000),
            username: newuser_name.trim(),
            password: newuser_password,
            login_status: 0
        };
        system_users.push(newuser);
        save_signup_data(system_users);
        window.location.href = "login.html";
    }
}

console.log(localStorage.getItem("todo_app_user_credentials"));
function save_signup_data(all_users){
    localStorage.setItem("todo_app_user_credentials", JSON.stringify(all_users));
}

function get_users(){
    const stored_users = localStorage.getItem("todo_app_user_credentials");
    if(stored_users){
        return JSON.parse(stored_users);
    }
    else{
        return [];
    }
}