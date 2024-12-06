import './header.css';
import logo from "./logo192.png"
import NavBar from './NavBar';
const Header = () => {
    return(
        <header style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div className="logo">
                <img src={logo} alt="" style={{width: 100, height: 100}} />
            </div>
            <NavBar />
        </header>
    )
}

export default Header