// window.localStorage.clear();

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
    //get the subtasks
        for(let k = 1; k <= i; k++){
            let a = document.getElementById(`task_sub_${k}`).value;
            if (a.trim() !== "") sub_tasks.push(a);
        }
    
    let newTask = {
        id: Date.now(),
        title: specific_task_title,
        description: specific_task_description,
        deadline_date: specific_task_date,
        deadline_time: specific_task_time,
        subtasks: sub_tasks,
        date_ceated: new Date()
    }

    tasks.push(newTask);
    save_data();
    render_tasks();
};

function render_tasks(){
    overview_content.innerHTML = "";
    tasks.forEach(element => {
        overview_content.innerHTML += `<div id="task_overview">
                                        <div id="overview_task_name">${element.title}</div>
                                        <div id="percentage_complete">% Complete</div>
                                        <div id="time_left">00:00 left</div>
                                        <div id="overview_buttons">
                                            <button id="update_task">Update Progress</button>
                                            <button id="view_task">View</button>
                                            <button id="edit_task">Edit</button>
                                            <button id="delete_task">Delete</button>
                                        </div> 
                                    </div>`;
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
console.log(localStorage.getItem("tasks"));