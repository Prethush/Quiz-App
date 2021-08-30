import React from "react";
import Result from "./Result";


class Questions extends React.Component {

    constructor(props) {
        super();
        this.state = {
            currentStep: 0,
            selectedAnswer: null,
            result: []
        }
    }

    componentDidMount = () => {
        if(localStorage.results || localStorage.currentStep){
            if(localStorage.currentStep === 10) {
                this.setState({currentStep: null, result: []});
            }else {
                this.setState({currentStep: JSON.parse(localStorage.currentStep), result: JSON.parse(localStorage.results)});
            }
           
        }
        
    }

    componentWillUnmount = () => {
        localStorage.clear();
    }

    nextStep = () => {
        let {currentStep, selectedAnswer} = this.state;
        if(!selectedAnswer){
            return alert("Select an option");
        }
        currentStep = currentStep + 1;
        this.setState({currentStep, selectedAnswer: null}, () => this.handleLocalStorage());
    }

    selectOption = (event, arr, index) => {
        console.log(index);
        let {useranswer} = event.target.dataset;
        let result = this.state.result;
        result[index] = {question: arr.question, userAnswer: useranswer, correctAnswer: arr.correct_answer};
        this.setState({selectedAnswer: useranswer, result}, () => this.handleLocalStorage());
    }

    handleLocalStorage = () => {
        let {result, currentStep} = this.state; 
        localStorage.setItem("results", JSON.stringify(result));
        localStorage.setItem("currentStep", JSON.stringify(currentStep));
    }

    render() {
        let {currentStep, selectedAnswer} = this.state;
       if(currentStep <= 9) {
           
            let questions = this.props.location.state.questions;
            
            let options = questions.length !== 0 ? questions[currentStep].incorrect_answers.reduce((acc, curr) => {
            if(!acc.includes(curr)){
                acc.push(curr);
            }
            return acc;
            }, []): [];

            questions.length !== 0 && options.push(questions[currentStep].correct_answer);
            options.sort();
            return (
                <>
                {
                    questions.length !== 0 ? (<section className="flex flex-col items-center py-4">
                    <div className="text-gray-800 w-1/2">
                        <h2 className="text-xl">Question {currentStep + 1}/10</h2>
                            < fieldset className="bg-white py-8">
                            <meter className="w-full h-8" value={currentStep + 1} max="10"> {currentStep + 1} out of 10</meter>
                            </fieldset>
                        <h2 className="text-3xl bg-blue-200 py-4 px-4 rounded-lg mb-10">{questions[currentStep].question}</h2>
                            {
                                options.map((o, i) => {
                                return  <h3 key={o} className={selectedAnswer === o ? "text-center my-4 bg-blue-400 py-3 rounded-lg text-xl cursor-pointer text-white": "text-center my-4 bg-gray-200 py-3 rounded-lg text-xl cursor-pointer"} data-useranswer={o} onClick={(e) => this.selectOption(e, questions[currentStep], currentStep)}>{o}</h3>
                                })
                            }
                            <button className={currentStep <= 9 ? "bg-green-400 text-white w-full py-3 rounded-lg block my-6": "hidden"} onClick={() => this.nextStep()}>Next</button>
                            
                    </div>
                </section>) : <h2 className="text-center text-3xl font-bold">No Results for the search</h2>
                }
                </>
            )
        }else {
           return  < Result {...this.state}/>
        }
    }
}

export default Questions;