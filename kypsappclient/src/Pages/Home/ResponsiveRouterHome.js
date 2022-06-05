import React, {useEffect, useState} from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Home from "./BrowserView/Home";

function ResponsiveRouterHome(){
    
    const isBrowser = useMediaQuery({"query":"(min-width:768px)"})
    const navigate = useNavigate()

    const CheckSession = () => {
        
    }

    useEffect(() => {
        CheckSession()
    }, [])

    return (
        <>
            {isBrowser && <Home/>}
        </>
    )

}

export default ResponsiveRouterHome;