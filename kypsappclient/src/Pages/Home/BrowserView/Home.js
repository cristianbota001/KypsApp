import React, { useEffect, useRef } from "react";
import "./CSS/Home.css"
import search from "./MEDIA/search.png"
import add from "./MEDIA/add.png"
import exit from "./MEDIA/left.png"
import delete_img from "./MEDIA/delete.png"
import adjust from "./MEDIA/adjust.png"

const Card = () => {

    var adjust_button = useRef()
    var footer_card = useRef()
    var input_div = useRef()

    useEffect(() => {
        adjust_button.current.addEventListener("click", AdjustEvent)
    }, [])

    const AdjustEvent = () => {
        footer_card.current.classList.toggle("Home__credentials_card_footer_toggle")
        input_div.current.querySelectorAll("input").forEach(ele => {
            ele.disabled = !ele.disabled
        })
    }

    return(
        <div className="Home__credentials_card">
            <div className="Home__credentials_card_navbar">
                <div className="Home__credentials_card_navbar_cont">
                    <div className="Home__credentials_card_navbar_div_button" ref={adjust_button}>
                        <img src={adjust} alt="adjust" className="Home__credentials_card_navbar_img_button" />
                    </div>
                    <div className="Home__credentials_card_navbar_div_button">
                        <img src={delete_img} alt="delete" className="Home__credentials_card_navbar_img_button" />
                    </div>
                </div>
            </div>
            <div className="Home__credentials_card_input_cont">
                <div className="Home__credentials_card_input_div" ref={input_div}>
                    <p className="Home__credentials_card_input_title">Servizio</p>
                    <input disabled type="text" className="Home__credentials_card_input_text" />
                    <p className="Home__credentials_card_input_title">Username</p>
                    <input disabled type="text" className="Home__credentials_card_input_text" />
                    <p className="Home__credentials_card_input_title">Password</p>
                    <input disabled type="password"  className="Home__credentials_card_input_text"/>
                </div>
            </div>
            <div className="Home__credentials_card_footer" ref={footer_card}>
                <div className="Home__credentials_card_footer_button">
                    Annulla
                </div>
                <div className="Home__credentials_card_footer_button">
                    Salva
                </div>
            </div>
        </div>
    )
}

const Home = () => {

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
                        <div className="Home__add_button">
                            <img src={add} alt="add" className="Home__nav_button" />
                        </div>
                        <div className="Home__exit_button">
                            <img src={exit} alt="add" className="Home__nav_button" />
                        </div>
                    </div>
               </div>
               <div className="Home__view_cont">
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
               </div>
           </div>
        </div>
    )
}

export default Home