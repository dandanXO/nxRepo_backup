import { all, fork } from 'redux-saga/effects';
import GoogleAuth from './GoogleAuth/GoogleAuth';
import {combineReducers} from "redux";


const googleAuthRoutes = [
    { path: '/googleauth', component: GoogleAuth }
];



export { googleAuthRoutes }
