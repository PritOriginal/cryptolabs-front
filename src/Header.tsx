import { Link } from "react-router-dom";

const links = [
    {to: "/measuring-information", text:"Измерение информации"},
    {to: "/compression", text:"Сжатие без потерь"},
]

function Header() {
    return(
        <header>
            <div className='header-container'>
                <p><b>Основы теории информации и криптографии</b></p>
                <nav className="header-container__menu">
                    {links.map((link, index) => (
                        <LinkItem key={index} to={link.to} text={link.text}/>
                    ))}
                </nav>
            </div>
        </header>
    );
}

function LinkItem({ to, text }: { to: string, text: string }) {
    return(
        <Link to={to}>{text}</Link>
    )
}

export default Header