function Result(props) {

    //getting correct answers count
    function getCorrectAnswers(results) {
        let count = 0;
        for(let i = 0; i < results.length; i++) {
            if(results[i].correctAnswer === results[i].userAnswer){
                count++;
            }
         }
         return count;
    }
    
  
    let results = props.result;
    console.log(results);
    return (
       <section className="pb-20">
           {/* Display result in table */}
           <h2 className="text-center text-4xl font-bold mb-6 text-red-500">Result of the Quiz</h2>
            <h2 className="text-center font-bold text-2xl mb-6 text-red-500">Your Score: {getCorrectAnswers(results)}/10</h2>
            <div>
                <table className="border-collapse border border-gray-900 w-9/12 mx-auto">
                    <thead>
                        <tr className="">
                            <th className="border border-gray-900 py-2 px-3 text-left text-2xl">Question</th>
                            <th className="border border-gray-900 py-2 px-3 text-left text-2xl">Correct Answers</th>
                            <th className="border border-gray-900 py-2 px-3 text-left text-2xl">You Selected</th>
                            <th className="border border-gray-900 py-2 px-3 text-left text-2xl">Right Or Wrong</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map(r => {
                                return (
                                    <tr key={r.question}>
                                        <td className="border border-gray-900 py-3 px-3 text-xl">{r.question}</td>
                                        <td className="border border-gray-900 py-3 px-3 text-xl">{r.correctAnswer}</td>
                                        <td className="border border-gray-900 py-3 px-3 text-xl">{r.userAnswer}</td>
                                        <td className="border border-gray-900 py-3 px-3 text-xl text-center">
                                            {
                                                r.correctAnswer === r.userAnswer ? <i className="far fa-check-circle text-green-600"></i> :
                                                <i className="far fa-times-circle text-red-600"></i>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
       </section>
    )
}

export default Result;