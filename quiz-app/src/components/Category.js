import React from "react";
import {Link} from "react-router-dom";

class Category extends React.Component {
    constructor(props){
        super();
        this.state = {
            categories: null,
            categoryId: null,
            difficultyLevel: null,
            questions: null
        }
    }

    componentDidMount = () => {
        fetch("https://opentdb.com/api_category.php")
        .then((res) => res.json())
        .then((data) => {
           this.setState({categories: data.trivia_categories});
        })
    }

    handleClick = ({target}) => {
        let {id, type} = target.dataset;
        if(type === "category") {
            this.setState({categorySelected: id}, () => this.fetchData());
        }else {
            this.setState({difficultyLevel: id}, () => this.fetchData());
        }
    }

    fetchData = () => {
        let {categorySelected, difficultyLevel} = this.state;
        if(difficultyLevel && categorySelected) {
            categorySelected = Number(categorySelected);

            fetch(`https://opentdb.com/api.php?amount=10&category=${categorySelected}&difficulty=${difficultyLevel}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.results);
                this.setState({questions: data.results});
            });
        }
    }

    render() {
       let {categorySelected, difficultyLevel} = this.state;
        return (
            < main>
                <h2 className="text-center font-bold text-4xl">Categories</h2>
                {
                    !this.state.categories && <h2 className="text-center font-bold py-4">Loading...</h2>
                }
                
                <section>
                    <div className="flex flex-wrap px-12 py-12">
                    {
                        this.state.categories ? this.state.categories.map(c => {
                        return <span key={c.id} className={categorySelected === String(c.id) ? "bg-red-500 py-2 px-3 my-2 mx-2 cursor-pointer text-white rounded-lg": "bg-blue-800 py-2 px-3 my-2 mx-2 cursor-pointer text-white rounded-lg hover:bg-blue-600"} data-type="category" data-id={c.id} onClick={(e) => this.handleClick(e)}>{c.name}</span>
                        }): ""
                    }             
                                
                    </div>
                    {
                        this.state.categories ? (
                        <>
                            <h3 className="text-center font-bold text-2xl mb-6">Select Difficulty Level</h3>
                            <div className="flex justify-center">
                                <span className={difficultyLevel === "easy" ? "bg-red-500 text-white py-2 px-3 rounded-lg mx-3 cursor-pointer": "bg-blue-800 text-white py-2 px-3 rounded-lg mx-3 hover:bg-blue-600 cursor-pointer"} data-type="difficultyLevel" data-id="easy" onClick={(e) => this.handleClick(e)}>Easy</span>

                                <span className={difficultyLevel === "medium" ? "bg-red-500 text-white py-2 px-3 rounded-lg mx-3 cursor-pointer": "bg-blue-800 text-white py-2 px-3 rounded-lg mx-3 hover:bg-blue-600 cursor-pointer"} data-type="difficultyLevel" data-id="medium" onClick={(e) => this.handleClick(e)}>Medium</span>

                                <span className={difficultyLevel === "hard" ? "bg-red-500 text-white py-2 px-3 rounded-lg mx-3 cursor-pointer": "bg-blue-800 text-white py-2 px-3 rounded-lg mx-3 hover:bg-blue-600 cursor-pointer"} data-type="difficultyLevel" data-id="hard" onClick={(e) => this.handleClick(e)}>Hard</span>
                            </div>
                        </>
                        ) : ""
                    }

                    <div className="text-center py-8">
                        
                        <Link to={{
                            pathname: `/questions/${categorySelected}/${difficultyLevel}`,
                            state: {questions: this.state.questions}
                        }}>
                            <button className={categorySelected && difficultyLevel ? "visible bg-black text-white py-2 px-3 rounded-lg font-bold": "hidden"}>Start Quiz</button>
                        </Link>
                        
                    </div>
                </section>
               
            </main>
        )
    }
}

export default Category;