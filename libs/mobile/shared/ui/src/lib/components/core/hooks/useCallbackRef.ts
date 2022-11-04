import {useState} from "react";

export default function useCallbackRef() {
    return useState(null);
}
