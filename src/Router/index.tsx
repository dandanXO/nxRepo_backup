import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import ExtendDetailsPage from "../pages/ExtendDetailsPage";
import LoanDetailsPage from "../pages/LoanDetailsPage";
import IndexPage from "../pages/IndexPage/IndexPage";

// NOTE:
// https://stackoverflow.com/questions/10302179/hyphen-underscore-or-camelcase-as-word-delimiter-in-uris
// https://developers.google.com/search/docs/advanced/guidelines/url-structure?hl=en&visit_id=637961283238394064-158551757&rd=1
export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage/>}></Route>
                <Route path="/extend-details" element={<ExtendDetailsPage/>}/>
                {/*/loan-details?token=xxxxxxxx&orderNo=xxxxxxxx*/}
                <Route path="/loan-details" element={<LoanDetailsPage/>}/>
                <Route path="*" element={<div>Not Found</div>}/>
            </Routes>
        </BrowserRouter>
    )
}
