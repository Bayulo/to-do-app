//Sign Up
//get data
// window.localStorage.clear();
let users = get_users();
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
    else{
        newuser = {
            username: newuser_name.trim(),
            password: newuser_password,
            login_status: 0
        };
        users.push(newuser);
        save_signup_data();
        window.location.href = "login.html";
    }
}
console.log(localStorage.getItem("todo_app_user_credentials"));
function save_signup_data(){
    localStorage.setItem("todo_app_user_credentials", JSON.stringify(users));
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