import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

// 合并子状态到主状态树上
const todoApp = combineReducers({
    todos,
    visibilityFilter    
})

export default todoApp