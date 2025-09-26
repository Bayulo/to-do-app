// window.localStorage.clear("current_user");
function get_users(){ //get saved users
    const stored_users = localStorage.getItem("todo_app_user_credentials");
    if(stored_users){
        return JSON.parse(stored_users);
    }
    else{
        return [];
    }
}
let current_user = [];
let users = get_users();
function verify_user_details(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    // let users = get_users();

   let user_requesting = users.find(user => user.username === username && user.password === password);
   if(user_requesting){ //if you can find a saved user with thesame inputed user name and password
        //change the log in status of any previosly logged in user
        let prev_logged_in = users.find(user => user.login_status == 1);
        if(prev_logged_in){
            prev_logged_in.login_status = 0;
        }
        user_requesting.login_status = 1;
        save_signup_data();
        current_user = [user_requesting];
        window.location.href = "index.html";
        save_current_logged_user(current_user);
    }
    else{
        document.getElementById("errors").innerHTML = "Invalid user name or password";
        // alert("Invalid user name or password");
    }
}
function save_signup_data(){
    localStorage.setItem("todo_app_user_credentials", JSON.stringify(users));
}

function save_current_logged_user(user){
    localStorage.setItem("current_user", JSON.stringify(user));
}
const login_button = document.getElementById("login");
login_button.onclick = verify_user_details;
console.log(localStorage.getItem("current_user"));