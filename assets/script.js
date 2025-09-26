// window.localStorage.clear();
function get_users(){
    const stored_users = localStorage.getItem("todo_app_user_credentials");
    if(stored_users){
        return JSON.parse(stored_users);
    }
    else{
        return [];
    }
}
function save_current_logged_user(user){
    localStorage.setItem("current_user", JSON.stringify(user));
}
//logout
const logout_button = document.getElementById("logout_button");
logout_button.onclick = function(){
    user_requesting = [];
    save_current_logged_user(user_requesting);
    window.location.href = "login.html";
}


let user_requesting = JSON.parse(localStorage.getItem("current_user"));
let users = get_users();
if(user_requesting.length != 0){ 
    if(!users.find(user => user.username ==  user_requesting[0].username && user_requesting[0].login_status == 1)){
        window.location.href = "login.html";
        // console.log("redirect 1");
        
    }
    document.getElementById("current_user").textContent = user_requesting[0].username;
}
else{
    window.location.href = "login.html";
        // console.log("redirect 2");

}

const dashboard_button = document.getElementById("dashboard");
const overview_button = document.getElementById("overview");
const create_button = document.getElementById("create");
const priority_button = document.getElementById("priority");

const dashboard_content = document.getElementById("dashboard_content");
const overview_content = document.getElementById("overview_content");
const create_content = document.getElementById("create_content");
const priority_content = document.getElementById("priority_content");

const dash_create = document.getElementById("dash_create");
const dash_overview = document.getElementById("dash_overview");
const dash_priority = document.getElementById("dash_priority");

const add_subtask = document.getElementById("add_subtask");
const remove_subtask = document.getElementById("remove_subtask");

dashboard_button.onclick = function (){
    dashboard_content.style.display = "flex";
    overview_content.style.display = "none";
    create_content.style.display = "none";
    priority_content.style.display = "none";
}
overview_button.onclick = function (){
    dashboard_content.style.display = "none";
    overview_content.style.display = "block";
    create_content.style.display = "none";
    priority_content.style.display = "none";
}
create_button.onclick = function (){
    dashboard_content.style.display = "none";
    overview_content.style.display = "none";
    create_content.style.display = "flex";
    priority_content.style.display = "none";
}
priority_button.onclick = function (){
    dashboard_content.style.display = "none";
    overview_content.style.display = "none";
    create_content.style.display = "none";
    priority_content.style.display = "block";
}

dash_create.onclick = function() {
    dashboard_content.style.display = "none";
    overview_content.style.display = "none";
    create_content.style.display = "flex";
    priority_content.style.display = "none";
}
dash_overview.onclick = function() {
    dashboard_content.style.display = "none";
    overview_content.style.display = "block";
    create_content.style.display = "none";
    priority_content.style.display = "none";
}
dash_priority.onclick = function() {
    dashboard_content.style.display = "none";
    overview_content.style.display = "none";
    create_content.style.display = "none";
    priority_content.style.display = "block";
}

let i = 2;
add_subtask.onclick = function (){
    i++;
    if (i > 2 && i < 11){
        document.getElementById("sub_task").innerHTML += `<div>${i}:<input id="task_sub_${i}" type="text"></div>`;
    }
}
// remove_subtask.onclick = function (){
//     if (i > 2){
//         document.getElementById("sub_task").removeChild(`<div>${i}:<input id="task_sub_${i}" type="text"></div>`);
//         i--;
//     }
// }
let tasks = [];

const create_task_button = document.getElementById("create_task_button");

create_task_button.onclick = function (){
    const specific_task_title = document.getElementById("task_name").value;
    const specific_task_description = document.getElementById("task_des").value;
    const specific_task_date = document.getElementById("date_deadline").value;
    const specific_task_time = document.getElementById("time_deadline").value;

    let sub_tasks = [];
    let sub_tasks_status = [];

    //get the subtasks
        for(let k = 1; k <= i; k++){
            let a = document.getElementById(`task_sub_${k}`).value;
            if (a.trim() !== "") {
                sub_tasks.push(a);
                sub_tasks_status.push(0);
            }
        }
    
    let newTask = {
        id: Date.now(),
        title: specific_task_title,
        description: specific_task_description,
        deadline_date: specific_task_date,
        deadline_time: specific_task_time,
        subtasks: sub_tasks,
        subtasks_status: sub_tasks_status,
        date_created: new Date().toLocaleString(),
        user_id: user_requesting[0].userid
    }

    tasks.push(newTask);
    render_tasks();
    save_data();
};
function render_tasks(){
        overview_content.innerHTML = "";
        tasks.forEach(element => {
            if(element.user_id == user_requesting[0].userid){ //display only for the specific user
            overview_content.innerHTML += `<div id="task_overview">
                                            <div id="overview_task_name">${element.title}</div>
                                            <div id="percentage_complete">% Complete</div>
                                            <div id="time_left">00:00 left</div>
                                            <div id="overview_buttons">
                                                <button class="update_task" data-id="${element.id}">Update Progress</button>
                                                <button class="view_task" data-id="${element.id}">View</button>
                                                <button class="edit_task" data-id="${element.id}">Edit</button>
                                                <button class="delete_task" data-id="${element.id}">Delete</button>
                                            </div> 
                                        </div>`;
            }
        });
}

function save_data(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function show_data(){
    const stored  = localStorage.getItem("tasks");
    if(stored){
        tasks = JSON.parse(stored);
    }
}
window.onload = function(){
    show_data();
    render_tasks();
}
// console.log(localStorage.getItem("tasks"));

function get_task_by_id(id){
    return tasks.find(task => task.id == id);
}

overview_content.onclick = function (e){
    //delete
    if(e.target.classList.contains("delete_task")){ //does what you clicked on from the parent element contain class; delete_task?
        const but_id = parseInt(e.target.dataset.id); //parseInt converts your data-id value (gotten using dataset.id), which is a string to an int
        let a_task = get_task_by_id(but_id);
        if(a_task){
            tasks = tasks.filter(task => task.id !== but_id);
            save_data();
            render_tasks();
        }
    }

    //view task
    if(e.target.classList.contains("view_task")){ //does what you clicked on from the parent element contain class; delete_task?
        const but_id = parseInt(e.target.dataset.id); //parseInt converts your data-id value (gotten using dataset.id), which is a string to an int
        let a_task = get_task_by_id(but_id);
        if(a_task){
           const this_task_name = document.getElementById("this_task_name");
           const this_task_description = document.getElementById("this_task_description");
           const this_task_subtasks = document.getElementById("this_task_subtasks");
           const this_task_deadline_date = document.getElementById("this_task_deadline_date");
           const this_task_deadline_time = document.getElementById("this_task_deadline_time");
           const this_task_date_created = document.getElementById("this_task_date_created");

           this_task_name.textContent = a_task.title;
           this_task_description.textContent = a_task.description;
           this_task_subtasks.innerHTML = "";
           a_task.subtasks.forEach(item => {this_task_subtasks.innerHTML += `<div>${item}</div>`});
           this_task_deadline_date.textContent = a_task.deadline_date;
           this_task_deadline_time.textContent = a_task.deadline_time;
           this_task_date_created.textContent = a_task.date_created;

           dark_background.style.display = "block";
           view_task_window.style.display = "flex";
        }
    }

    //update task
    if(e.target.classList.contains("update_task")){ //does what you clicked on from the parent element contain class; update task?
        const but_id = parseInt(e.target.dataset.id); //parseInt converts your data-id value (gotten using dataset.id), which is a string to an int
        let a_task = get_task_by_id(but_id);
        if(a_task){
            const update_subtasks = document.getElementById("update_subtasks");
            const completed_subtasks = document.getElementById("completed_subtasks");
            update_subtasks.innerHTML = "";
            completed_subtasks.innerHTML = "Completed:";

            console.log(a_task);
            let count = 0;
            a_task.subtasks.forEach(item => {
                if (a_task.subtasks_status[count] != 1){
                    update_subtasks.innerHTML += `<div>
                                                    <div>${item}</div>
                                                    <div class="done" data-id="${count}">Done</div>
                                                </div>`
                }
                else{
                    completed_subtasks.innerHTML += `<div>
                                                        <div>${item}</div>
                                                        <div class="undo" data-id="${count}">Undo</div>
                                                    </div>`
                }
                count++;
            });

            //done button function
            const done_buttons = document.querySelectorAll(".done");
            done_buttons.forEach(item =>
                item.onclick = function(e){
                    let completed_subtask_index = e.target.dataset.id;
                    a_task.subtasks_status[completed_subtask_index] = 1;
                    save_data();
                    //console.log(a_task.subtasks_status)
            });
            //undo button function
            const undo_buttons = document.querySelectorAll(".undo");
            undo_buttons.forEach(item =>
                item.onclick = function(e){
                    let completed_subtask_index = e.target.dataset.id;
                    a_task.subtasks_status[completed_subtask_index] = 0;
                    save_data();
                    //console.log(a_task.subtasks_status)
            });

            dark_background.style.display = "block";
            update_task_window.style.display = "flex";
        }
    }


    if(e.target.classList.contains("edit_task")){ //does what you clicked on from the parent element contain class; edit_task?
        const but_id = parseInt(e.target.dataset.id); //parseInt converts your data-id value (gotten using dataset.id), which is a string to an int
        let a_task = get_task_by_id(but_id);
        if(a_task){
           
        //    dark_background.style.display = "block";
        //    edit_task_window.style.display = "flex";
        }
    }

}

const dark_background = document.getElementById("dark_background");
const update_task_window = document.getElementById("update_task_window");
const edit_task_window = document.getElementById("edit_task_window");
const view_task_window = document.getElementById("view_task_window");

dark_background.addEventListener("click", function(){
    dark_background.style.display = "none";
    update_task_window.style.display = "none";
    edit_task_window.style.display = "none";
    view_task_window.style.display = "none";
});

// update_task_window.onclick = function() {
//     dark_background.style.display = "block";
//     update_task_window.style.display = "";
// }
// edit_task_window.onclick = function() {
//     dark_background.style.display = "block";
//     update_task_window.style.display = "";
// }

