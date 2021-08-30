import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="relative">
            < Link to="/">
                <h1 className="z-10 absolute left-16 top-12 text-4xl font-bold text-white">Quiz App</h1>
            </Link>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill="#0099ff" fillOpacity="1" d="M0,160L40,149.3C80,139,160,117,240,122.7C320,128,400,160,480,170.7C560,181,640,171,720,160C800,149,880,139,960,117.3C1040,96,1120,64,1200,58.7C1280,53,1360,75,1400,85.3L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
            </div>
        </header>
    )
}


export default Header;