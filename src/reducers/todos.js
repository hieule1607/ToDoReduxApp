
const initialState = [
  {
    text: 'Demo Use Redux',
    completed: false,
    id: 0
  }
]

const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state, {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          text: action.text,
          completed: false
        }
      ]
    case 'DELETE_TODO':
      return state.filter(todo =>
        todo.id !== action.id
      )
    default:
      return state
  }
}

export default todos