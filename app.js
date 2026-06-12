import { supabase } from './supabase.js'

const addBtn = document.getElementById('addBtn')
const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')

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

    // delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = '✕'
    deleteBtn.onclick = async () => {
      await supabase
        .from('tasks')
        .delete()
        .eq('id', task.id)
      loadTasks()
    }

    li.appendChild(deleteBtn)
    taskList.appendChild(li)
  })
}

addBtn.addEventListener('click', async function() {
  const taskText = taskInput.value

  if (taskText === '') {
    alert('please add a task!')
    return
  }

  addBtn.disabled = true

  const { error } = await supabase
    .from('tasks')
    .insert([{ text: taskText }])

  if (error) {
    console.log('error saving task:', error)
    addBtn.disabled = false
    return
  }

  taskInput.value = ''
  addBtn.disabled = false
  loadTasks()
})

loadTasks()