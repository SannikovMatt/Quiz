import axios from '../../Axios/Axious-quiz'
import {
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE,
    QUIZ_RETRY
} from './actionTypes';



export function fetchQuizes() {



    return async dispatch => {

        dispatch(fetchQuizesStart())

        try {

            const response = await axios.get('/quizes.json')
            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test №${index + 1}`
                })
            })


            dispatch(fetchQuizesSuccess(quizes))

        } catch (e) {
            console.log(e);
            dispatch(fetchQuizesError(e))
        }
    }

}
export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}
export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}


export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())


        try {

            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz))


        } catch (e) {
            dispatch(fetchQuizesError(e))
        }

    }

}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }

}

export function quizSetState(results, answerState) {

    return {
        type: QUIZ_SET_STATE,
        answerState,
        results

    }
}

export function finishQuiz(params) {

    return {
        type: FINISH_QUIZ,
        isFinished: true
    }

}

export function quizNextQuestion(number) {

    return {

        type: QUIZ_NEXT_QUESTION,
        number
    }
}

function isQuizFinished(state) {

    return state.activeQuestion + 1 === state.quiz.length

}

export function retryQuiz() {

    return {
        type: QUIZ_RETRY
    }
}

export function quizAnswerClick(answerId) {




    return (dispatch, getState) => {

        const state = getState().quiz
        console.log(state, 'RECIEVED STATE');


        if (state.answerState) {

            console.log('ZAWEL');
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState(results, { [answerId]: 'success' }))



            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {

                    dispatch(finishQuiz())

                } else {

                    dispatch(quizNextQuestion(state.activeQuestion + 1))

                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'

            dispatch(quizSetState(results, { [answerId]: 'error' }))

        }

    }

}