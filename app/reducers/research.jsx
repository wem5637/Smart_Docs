import { SET_INITIAL_RESEARCH_RESULTS, SAVE_BOOKMARK, REMOVE_BOOKMARK } from '../constants'

const initialState = {
  bookmarks: []
}

export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch(action.type){
    case SET_INITIAL_RESEARCH_RESULTS:
      newState.researchResults = action.research
      break
    case SAVE_BOOKMARK:
      newState.bookmarks = newState.bookmarks.concat(action.savedBookmark)
      break
    case REMOVE_BOOKMARK:
      newState.bookmarks = newState.bookmarks.slice(0, action.bookmarkToRemove).concat(newState.bookmarks.slice(action.bookmarkToRemove+1))
      break
    default:
      return state
  }
  return newState
}
