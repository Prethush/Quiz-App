import Header from "./Header"
import Category from "./Category";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Questions from "./Questions";
import Result from "./Result";
import Noresult from "../Noresutl";

function Main(props) {
    return (
       < Router >
            < Header />
            < Switch >
                < Route path="/" exact >
                    < Category />
                </Route>
                < Route path="/questions/:id/:id" component={Questions}> 
                </Route>
                < Route path="/results" component={Result}>
                </Route>
                < Route path="*">
                    < Noresult />
                </Route>
            </Switch>
       </Router>
    )
}

export default Main;