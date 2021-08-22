import Question from './Question'
import './style.css'
import quizz_data from '../data/db.json'
import Option from './Option'
import BtnSubmit from './BtnSubmit'
import {useState} from 'react'
import Error from './Error'

const Quizz_container = () => {

    let [currentQuestion,setCurrentQuestion] = useState(0)
    let [quizz,setQuizz] = useState(
        {
            question:quizz_data[currentQuestion].question,
            a:quizz_data[currentQuestion].a,
            b:quizz_data[currentQuestion].b,
            c:quizz_data[currentQuestion].c,
            d:quizz_data[currentQuestion].d,
            correct:quizz_data[currentQuestion].correct
        }
    )
    let [error,setError] = useState(false)
    let [score,setScore] = useState(0)
    let [quizzFinished,setQuizzFinished] = useState(false)
    let [title,setTitle] = useState(quizz.question)

    function loadQuiz(){
        cleanOptions()
        quizz = quizz_data[currentQuestion]
        setQuizz(quizz)
        setTitle(quizz.question)
    }

    function cleanOptions(){
        let answers = document.querySelectorAll('.answer');
        answers.forEach(answer => {
            answer.checked = false;
        });
    }

    function ValidateAnswer(){
        let options = Array.from(document.querySelectorAll('.answer'))
        let anwser_checked = options.filter((e) => e.checked)[0]
        setError(false)

        if (anwser_checked !== undefined) {
            score += anwser_checked.id === quizz_data[currentQuestion].correct ? 1 : 0
            setScore(score)
            nextQuestion()
        } else {
            setError(true)
        }
    }

    function nextQuestion(){
        currentQuestion++
        if (currentQuestion < quizz_data.length) {
            setCurrentQuestion(currentQuestion)
            loadQuiz()
        } else {
            setTitle(`Su calificación es ${score}/${quizz_data.length}`)
            setQuizzFinished(true)
        }
    }

    function reloadPage(){
        window.location.reload()
    }


    return (
        <div>
            <div className="container">
                <Question question_name={title}/>
                <ul>
                    { error && <Error/>}
                    { !quizzFinished &&
                        <>
                        <Option option_text={quizz.a} id="a" key="a" />
                        <Option option_text={quizz.b} id="b" key="b" />
                        <Option option_text={quizz.c} id="c" key="c" />
                        <Option option_text={quizz.d} id="d" key="d" />
                        </>
                    }
                </ul>
            </div>
            <BtnSubmit fnNext={!quizzFinished ? ValidateAnswer : reloadPage } text={!quizzFinished ? 'Siguiente' : 'Recargar' } />
        </div>
    )
}

export default Quizz_container