import { supabase } from './supabase.js'
console.log('app.js is working')

const addBtn = document.getElementById('addBtn')
const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')

// LOAD tasks from database when page opens
async function loadTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')

  if (error) {
    console.log('error loading tasks:', error)
    return
  }

  taskList.innerHTML = ''
  data.forEach(task => {
    const li = document.createElement('li')
    li.textContent = task.text
    taskList.appendChild(li)
  })
}

// SAVE task to database when user clicks add
addBtn.addEventListener('click', async function() {
  const taskText = taskInput.value

  if (taskText === '') {
    alert('please add a task!')
    return
  }

  const { error } = await supabase
    .from('tasks')
    .insert([{ text: taskText }])

  if (error) {
    console.log('error saving task:', error)
    return
  }

  taskInput.value = ''
  loadTasks()
})

loadTasks()