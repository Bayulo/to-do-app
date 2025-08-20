function get_users(){ //get saved users
    const stored_users = localStorage.getItem("todo_app_user_credentials");
    if(stored_users){
        return JSON.parse(stored_users);
    }
    else{
        return [];
    }
}

function verify_user_details(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let system_users = get_users();

    if(system_users.find(user => user.username === username && user.password === password)){ //if you find a saved user with thesame inputed user name and password
        window.location.href = "index.html";
    }
    else{
        alert("Invalid user name or password");
    }
}

const login_button = document.getElementById("login");
login_button.onclick = verify_user_details;