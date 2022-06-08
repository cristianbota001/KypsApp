import React, {  useEffect, useRef, useState } from "react";
import "./CSS/Home.css"
import search from "./MEDIA/search.png"
import add from "./MEDIA/add.png"
import exit from "./MEDIA/left.png"
import delete_img from "./MEDIA/delete.png"
import adjust from "./MEDIA/adjust.png"
import Middleware from "../../../middleware";
import { v4 } from 'uuid';
import {useNavigate} from "react-router-dom"

const Card = (props) => {

    var adjust_button = useRef()
    var delete_button = useRef()
    var save_button = useRef()
    var undo_button = useRef()
    var footer_card = useRef()
    var input_div = useRef()

    const [newmode, setNewMode] = useState(props.infos.newmode)
    const [id_cred, setIdCred] = useState(props.infos.id_cred)

    useEffect(() => {
        if (newmode == true){
            AdjustToggle()
        }else{
            SetInputValues()
        }
    }, [])

    useEffect(() => {

        undo_button.current.addEventListener("click", UndoEvent)
        adjust_button.current.addEventListener("click", AdjustEvent)
        save_button.current.addEventListener("click", SaveEvent)
        delete_button.current.addEventListener("click", DeleteCard)

        return(() => {
            if (undo_button.current !== null && adjust_button.current !== null && save_button.current !== null && delete_button.current !== null){
                undo_button.current.removeEventListener("click", UndoEvent)
                adjust_button.current.removeEventListener("click", AdjustEvent)
                save_button.current.removeEventListener("click", SaveEvent)
                delete_button.current.removeEventListener("click", DeleteCard)
            }
        })
        
    }, [newmode, props.cred])

    const SetInputValues = () => {
        let elems = input_div.current.querySelectorAll("input")
        elems[0].value = props.infos.service
        elems[1].value = props.infos.username
        elems[2].value = props.infos.password
    }

    const AdjustEvent = () => {
        if (newmode == false){
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
        if (newmode == true){
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
                setIdCred(json_data.id_cred)
                AdjustToggle()
                setNewMode(false)
                props.Save()
            }
        })
    }

    const UpdateCard = () => {
        let form_data = new FormData(input_div.current)
        form_data = JSON.stringify(Object.fromEntries(form_data))
        Middleware.SendRequest(form_data, "PUT", "put_credentials/" + id_cred + "/" + sessionStorage.getItem("user_auth_id") + "/" + form_data).then(json_data => {
            if (json_data.response === "ok"){
                AdjustToggle()
            }
        })
    }

    const SaveEvent = () => {
        if (newmode == true){
            SaveNewCred()
        }else{
            UpdateCard()
        }
    }

    const DeleteCard = () => {
        if (newmode == false){
            Middleware.SendRequest(null, "DELETE", "delete_credentials/" + id_cred + "/" + sessionStorage.getItem("user_auth_id")).then(json_data => {
                if (json_data.response === "ok"){
                   //
                }
            })
            props.PopCred(props.index_card)
        }
    }

    return(
        <div className="Home__credentials_card">
            <div className="Home__credentials_card_navbar">
                <div className="Home__credentials_card_navbar_cont">
                    <button className="Home__credentials_card_navbar_div_button" ref={adjust_button}>
                        <img src={adjust} alt="adjust" className="Home__credentials_card_navbar_img_button" />
                    </button>
                    <button className="Home__credentials_card_navbar_div_button" ref={delete_button}>
                        <img src={delete_img} alt="delete" className="Home__credentials_card_navbar_img_button" />
                    </button>
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
                <button className="Home__credentials_card_footer_button" ref={undo_button}>
                    Annulla
                </button>
                <button className="Home__credentials_card_footer_button" ref={save_button}>
                    Salva
                </button>
            </div>
        </div>
    )
}

const Home = () => {

    const [cred, setCred] = useState([])
    const [saving, setSaving] = useState(false)
    const navigate = useNavigate()
    var add_button = useRef()
    var exit_button = useRef()

    const AddNewCred = () => {
        if (saving == false){
            setCred([...cred, {newmode:true, id_comp:v4()}])
            setSaving(true)
        }   
    }

    const ExitEvent = () => {
        sessionStorage.setItem("session", "false")
        sessionStorage.setItem("user_auth_id", "none")
        navigate("/")
    }

    const PopCred = (index) => {
        let lista = [...cred]
        index === undefined ? lista.pop() : lista.splice(index, 1)
        setCred([...lista])
        setSaving(false)
    }

    const Save = () => {
        setSaving(false)
        cred[cred.length - 1].newmode = false // si potrebbe togliere perche se l'id del componente non cambia, non viene re-renderizzato
    }

    useEffect(() => {
        add_button.current.addEventListener("click", AddNewCred)
        exit_button.current.addEventListener("click", ExitEvent)
        return(() => {
            if (add_button.current !== null && exit_button.current !== null){
                add_button.current.removeEventListener("click", AddNewCred)
                exit_button.current.removeEventListener("click", ExitEvent)
            }
        })
       
    }, [cred, saving])

    useEffect(() => {
        GetCreds()
    }, [])

    const GetCreds = () => {
        Middleware.SendRequest(null, "GET", "get_credentials/" + sessionStorage.getItem("user_auth_id")).then(json_data => {
            json_data.response.forEach(ele => {
                ele["newmode"] = false
                ele["id_comp"] = v4()
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
                        <button className="Home__add_button" ref={add_button}>
                            <img src={add} alt="add" className="Home__nav_button" />
                        </button>
                        <button className="Home__exit_button" ref={exit_button}>
                            <img src={exit} alt="add" className="Home__nav_button" />
                        </button>
                    </div>
               </div>
               <div className="Home__view_cont">
                    {
                        cred.map((ele, index) => {
                            return <Card key={ele.id_comp} index_card = {index} infos = {ele} PopCred = {PopCred} Save = {Save} cred = {cred} />
                        })
                    }
               </div>
           </div>
        </div>
    )
}

export default Home