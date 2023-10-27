import { Link, Outlet } from "react-router-dom";

const Layout = ()=>(
    <>
        <nav>
            <Link to="/homeStart">Home</Link>
            <Link to="/traineeRegistration">Trainee</Link>
            <Link to="/trainerRegistration">Trainer</Link>
            <Link to="/login">Login</Link>
        </nav>
        <Outlet />
    </>
)

export default Layout;