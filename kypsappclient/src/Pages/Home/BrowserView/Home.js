import React, { useCallback, useEffect, useRef, useState } from "react";
import "./CSS/Home.css"
import search from "./MEDIA/search.png"
import add from "./MEDIA/add.png"
import exit from "./MEDIA/left.png"
import delete_img from "./MEDIA/delete.png"
import adjust from "./MEDIA/adjust.png"
import Middleware from "../../../middleware";

const Card = (props) => {

    var adjust_button = useRef()
    var delete_button = useRef()
    var save_button = useRef()
    var undo_button = useRef()
    var footer_card = useRef()
    var input_div = useRef()
    const [newMode, setNewMode] = useState(props.infos.newmode)

    useEffect(() => {

        if (newMode == true){
            AdjustToggle()
        }else{
            SetInputValues()
        }

    }, [])

    useEffect(() => {
        
        undo_button.current.addEventListener("click", UndoEvent)
        adjust_button.current.addEventListener("click", AdjustEvent)
        save_button.current.addEventListener("click", SaveNewCred)

        console.log("newmode")

        return(() => {
            if (undo_button.current !== null && adjust_button.current !== null && save_button.current !== null){
                undo_button.current.removeEventListener("click", UndoEvent)
                adjust_button.current.removeEventListener("click", AdjustEvent)
                save_button.current.removeEventListener("click", SaveNewCred)
            }
        })
        
    }, [newMode])

    const SetInputValues = () => {
        let elems = input_div.current.querySelectorAll("input")
        elems[0].value = props.infos.service
        elems[1].value = props.infos.username
        elems[2].value = props.infos.password
    }

    const AdjustEvent = () => {
        if (newMode == false){
            AdjustToggle()
        }
    }

    const AdjustToggle = () => {
        footer_card.current.classList.toggle("Home__credentials_card_footer_toggle")
        input_div.current.querySelectorAll("input").forEach(ele => {
            ele.disabled = !ele.disabled
        })
    }

    const UndoEvent = () => {
        if (newMode == true){
            props.PopCred()
        }else{
            AdjustToggle()
        }
    }

    const SaveNewCred = () => {
        let form_data = new FormData(input_div.current)
        form_data.append("user_auth_id", sessionStorage.getItem("user_auth_id"))
        Middleware.SendRequest(form_data, "POST", "post_credentials").then(json_data => {
            if (json_data.response === "ok"){
                setNewMode(false)
                AdjustToggle()
            }
        })
    }

    return(
        <div className="Home__credentials_card">
            <div className="Home__credentials_card_navbar">
                <div className="Home__credentials_card_navbar_cont">
                    <div className="Home__credentials_card_navbar_div_button" ref={adjust_button}>
                        <img src={adjust} alt="adjust" className="Home__credentials_card_navbar_img_button" />
                    </div>
                    <div className="Home__credentials_card_navbar_div_button" ref={delete_button}>
                        <img src={delete_img} alt="delete" className="Home__credentials_card_navbar_img_button" />
                    </div>
                </div>
            </div>
            <div className="Home__credentials_card_input_cont">
                <form className="Home__credentials_card_input_div" ref={input_div}>
                    <p className="Home__credentials_card_input_title">Servizio</p>
                    <input disabled type="text" className="Home__credentials_card_input_text" name="service"  />
                    <p className="Home__credentials_card_input_title">Username</p>
                    <input disabled type="text" className="Home__credentials_card_input_text" name="username" />
                    <p className="Home__credentials_card_input_title">Password</p>
                    <input disabled type="password"  className="Home__credentials_card_input_text" name="password" />
                </form>
            </div>
            <div className="Home__credentials_card_footer" ref={footer_card}>
                <div className="Home__credentials_card_footer_button" ref={undo_button}>
                    Annulla
                </div>
                <div className="Home__credentials_card_footer_button" ref={save_button}>
                    Salva
                </div>
            </div>
        </div>
    )
}

const Home = () => {

    //const [cred, setCred] = useState([{newmode:true, cred:{"servizio":"Gmail", "username":"bob@gmail.com", "password":"123456"}}])
    const [cred, setCred] = useState([])
    const [saving, setSaving] = useState(false)
    var add_button = useRef()

    const AddNewCred = () => {
        if (saving == false){
            setCred([...cred, {newmode:true}])
            setSaving(true)
        }   
    }

    const PopCred = () => {
        let lista = [...cred]
        lista.pop()
        setCred([...lista])
        setSaving(false)
    }

    useEffect(() => {
        console.log(cred)
        add_button.current.addEventListener("click", AddNewCred)
        return(() => {
            add_button.current.removeEventListener("click", AddNewCred)
        })
       
    }, [cred])

    useEffect(() => {
        GetCreds()
    }, [])

    const GetCreds = () => {
        Middleware.SendRequest(null, "GET", "get_credentials/" + sessionStorage.getItem("user_auth_id")).then(json_data => {
            json_data.response.forEach(ele => {
                ele["newmode"] = false
            })
            setCred([...json_data.response])
        })
    }

    return(
        <div className="Home__main_div">
           <div className="Home__search_bar_cont">
                <div className="Home__search_bar_div">
                    <img src={search} alt="search" className="Home__search_img" />
                    <input type="text" className="Home__search_text_input" spellCheck="false" />
                </div>
           </div>
           <div className="Home__core_cont">
               <div className="Home__options_cont">
                    <div className="Home__options_second_cont">
                        <div className="Home__add_button" ref={add_button}>
                            <img src={add} alt="add" className="Home__nav_button" />
                        </div>
                        <div className="Home__exit_button">
                            <img src={exit} alt="add" className="Home__nav_button" />
                        </div>
                    </div>
               </div>
               <div className="Home__view_cont">
                    {
                        cred.map((ele, index) => {
                            return <Card key={index} infos = {ele} PopCred = {PopCred} />
                        })
                    }
               </div>
           </div>
        </div>
    )
}

export default Home