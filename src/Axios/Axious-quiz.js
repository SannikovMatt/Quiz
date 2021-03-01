import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-8e0e8-default-rtdb.firebaseio.com/'
})