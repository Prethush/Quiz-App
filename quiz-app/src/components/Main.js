import Header from "./Header"
import Category from "./Category";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Questions from "./Questions";

function Main(props) {
    return (
       < Router >
            < Header />
            < Route path="/" exact >
                < Category />
            </Route>
            < Route path="/questions/:id/:id" component={Questions} >    
            </Route>
       </Router>
    )
}

export default Main;