import React, {useEffect} from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import Index from "./BrowserView/Index";

function ResponsiveRouterIndex(){
    
    const isBrowser = useMediaQuery({"query":"(min-width:768px)"})
    const navigate = useNavigate()

    const CheckSession = () => {
        if (sessionStorage.getItem("session") === null){
            sessionStorage.setItem("session", "false")
            sessionStorage.setItem("user_auth_id", "none")
        }else if (sessionStorage.getItem("session") === "true"){
            navigate("/home")
        }
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