import axios from '../../Axios/Axious-quiz'
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes'



export function createQuizQuestion(item) {


    return {
        type: CREATE_QUIZ_QUESTION,
        item
    }

}

export function resetQuizCreation(params) {
    return {
        type: RESET_QUIZ_CREATION
    }

}
export function finishCreateQuiz() {

    return async (dispatch, getState) => {
        const state = getState().create;
        await axios.post('/quizes.json', state.quiz)

        dispatch(resetQuizCreation())

    }


}