import React, {useEffect, useState} from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Index from "./BrowserView/Index";

function ResponsiveRouterIndex(){
    
    const isBrowser = useMediaQuery({"query":"(min-width:768px)"})
    const navigate = useNavigate()

    const CheckSession = () => {
        
    }

    useEffect(() => {
        CheckSession()
    }, [])

    return (
        <>
            {isBrowser && <Index/>}
        </>
    )

}

export default ResponsiveRouterIndex;