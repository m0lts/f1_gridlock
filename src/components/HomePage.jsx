import { Outlet } from "react-router-dom";
import Header from "./sections/Header";
import './home_page.css'

export default function HomePage() {
    return (
        <>
        <Header />
        <main className="app_body">
            <Outlet />
        </main>
        </>
    )
}