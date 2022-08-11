import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExtendDetailsPage from "../pages/ExtendDetailsPage";
import LoanDetailsPage from "../pages/LoanDetailsPage";
import IndexPage from "../pages/IndexPage/IndexPage";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage/>}></Route>
                <Route path="/extendDetailsPage" element={<ExtendDetailsPage/>}/>
                <Route path="/loanDetailsPage" element={<LoanDetailsPage/>}/>
                <Route path="*" element={<div>Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    )
}
