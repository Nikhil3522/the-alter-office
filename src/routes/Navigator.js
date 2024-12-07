import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import InfiniteScrollPosts from "../components/InfiniteScrollPosts";
import Profile from "../components/Profile";


const Navigator = () => {

    // Route component
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/login" element={ <Login /> }/>
                <Route path="/posts" element={ <InfiniteScrollPosts /> }/>
                <Route path="/profile" element={ <Profile /> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default Navigator;