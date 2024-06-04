import React, { useState, useEffect } from 'react'
import './App.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { differenceInDays } from 'date-fns'

function App() {
  const [newItem, setNewItem] = useState("")
  const [dueDate, setDueDate] = useState(null)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      todos.forEach(todo => {
        if (todo.dueDate) {
          const daysLeft = differenceInDays(new Date(todo.dueDate), now)
          if (daysLeft === 1 && !todo.reminded) {
            alert(`Reminder: Your todo "${todo.title}" is due tomorrow!`)
            setTodos(currentTodos =>
              currentTodos.map(t =>
                t.id === todo.id ? { ...t, reminded: true } : t
              )
            )
          }
        }
      })
    }
    const interval = setInterval(checkReminders, 3600000) // Check every hour
    return () => clearInterval(interval)
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title: newItem,
        completed: false,
        dueDate: dueDate,
        reminded: false
      }
    ])
    setNewItem("")
    setDueDate(null)
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    )
  }

  function deleteTodo(id) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id))
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit} className="new-item-form">
          <div className="form-row">
            <label className="item">New item</label>
            <input
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              type="text"
              id="item"
            />
          </div>
          <div className="form-row">
            <label className="item">Due date</label>
            <DatePicker
              selected={dueDate}
              onChange={date => setDueDate(date)}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              isClearable
              placeholderText="Select a due date"
            />
          </div>
          <button className="btn">Add</button>
        </form>
        <h1 className="header">Todo list</h1>
        <ul className="list">
          {todos.length === 0 && "No Todos"}
          {todos.map(todo => (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title} {todo.dueDate && `(Due: ${new Date(todo.dueDate).toLocaleDateString()})`}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
