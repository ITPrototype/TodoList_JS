let numid = 1
let today = new Date()
let todoList = []

class Task {
    constructor(options){
        this.taskName = options.taskName
        this.data = options.data
        this.isCompleted = options.isCompleted
    }
}
// Generate Table
function generateHtml(task){
    return `
    <tr>
        <td class="taskname">${task.taskName}</td>
        <td class="taskdata">${task.data}</td>
        <td class="edit-delete">
            <a class="waves-effect waves-light btn red" onclick="deleteTask()"><i class="fa-solid fa-trash"></i></a>
        </td>
    </tr>
    `
}
// <a class="waves-effect waves-light btn yellow"><i class="fa-solid fa-pen-to-square"></i></a>

// Local Storage
function syncToLoc(){
    localStorage.setItem('todoList',JSON.stringify(todoList))
}
function syncFromLoc(){
    const todoFromLoc = localStorage.getItem('todoList')
    if (todoFromLoc) {
        todoList = [...JSON.parse(todoFromLoc)]
    }
}

// Check if no todo
function checkNone(){
    if(todoList.length == 0){
        document.getElementById('warning-message').innerHTML = '<h7 class="warning">No todos</h7>'
    }else{
        document.getElementById('warning-message').innerHTML =''
    }
}
checkNone()
// Clear form
function clearForm(){
    document.getElementById('icon_prefix2').value = ''
}

// Add task
function addTask(){
    const task = document.getElementById('icon_prefix2')
    const labels = document.getElementById('lab')
    if(task.value.length == 0){
        task.style.border = '1px solid red'
        labels.innerHTML = 'Write smth'
        alert('Write something than press Button bitch!')
    }else{
        labels.innerHTML = 'Task'
        task.style.border = 'none'
        task.style.borderBottom = '1px solid gray'
        todoList.push({
            taskName:task.value,
            data: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            isCompleted:false,
            id:numid++
        })
        syncToLoc()
        reload()
        checkNone()
        clearForm()
    }
}
// Reload tasks
function reload(){
    const footer = document.getElementById('footer')
    let todoDiv = document.getElementById('todoDiv')
    let htmlList = ''
    todoList.forEach(element => {
        htmlList += generateHtml(element)
    });
    todoDiv.innerHTML = htmlList
    if(todoList.length == 0){
        console.log('No todo');
    }else{
        footer.innerHTML = `<span class="numberTask">Number of Tasks ${todoList.length}</span>`
    }
    syncFromLoc()
}
syncFromLoc()
reload()
checkNone()
// Delete Task
function deleteTask(id){
    const isConfirmed = confirm('Delete?')
    if(isConfirmed){
        const index = todoList.findIndex(a=>a.id===id)
        const deletedTask = todoList.splice(index,1)
        console.log(deletedTask);
        syncToLoc()
        reload()
        checkNone()
    }
    reload()
}