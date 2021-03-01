import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from "../Actions/actionTypes"

const initialState = {
    quiz: []
}

export function createReducer(state = initialState, action) {

    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }

        case RESET_QUIZ_CREATION:
            return {
                quiz: [] 
            }
        default:
            return state
    }

}