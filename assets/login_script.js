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
function verify_user_details(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let system_users = get_users();

   let user_requesting = system_users.find(user => user.username === username && user.password === password)
   if(user_requesting){ //if you find a saved user with thesame inputed user name and password
        user_requesting.login_status = 1;
        current_user = [user_requesting];
        window.location.href = "index.html";
        save_current_logged_user(current_user);
    }
    else{
        alert("Invalid user name or password");
    }
}

function save_current_logged_user(user){
    localStorage.setItem("current_user", JSON.stringify(user));
}
const login_button = document.getElementById("login");
login_button.onclick = verify_user_details;
console.log(localStorage.getItem("current_user"));