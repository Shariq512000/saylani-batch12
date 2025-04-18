import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header>
        <div className="logo">LOGO</div>
        <nav>
            <ul>
                <li>
                    <Link href={"#"}>Home</Link>
                </li>

                <li>
                    <Link href={"#"}>Home</Link>
                </li>

                <li>
                    <Link href={"#"}>Home</Link>
                </li>

                <li>
                    <Link href={"#"}>Home</Link>
                </li>

                <li>
                    <Link href={"#"}>Home</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header