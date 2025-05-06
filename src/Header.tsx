import { Link } from "react-router-dom";

const links = [
    { to: "/measuring-information", text: "Измерение информации" },
    { to: "/rle", text: "RLE" },
    { to: "/huffman", text: "Хаффман" },
    { to: "/arithmetic", text: "Арифметическое" },
    { to: "/lzw", text: "LZW" },
    { to: "/rsa", text: "RSA" },
]

function Header() {
    return (
        <header>
            <div className='header-container'>
                <p><b>Основы теории информации и криптографии</b></p>
                <nav className="header-container__menu">
                    {links.map((link, index) => (
                        <LinkItem key={index} to={link.to} text={link.text} />
                    ))}
                </nav>
            </div>
        </header>
    );
}

function LinkItem({ to, text }: { to: string, text: string }) {
    return (
        <Link to={to}>{text}</Link>
    )
}

export default Header