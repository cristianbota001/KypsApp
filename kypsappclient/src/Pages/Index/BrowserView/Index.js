import React, { useEffect, useRef } from "react";
import Middleware from "../../../middleware";
import "./CSS/Index.css"

const Index = () => {

    var login_button = useRef()
    var registration_button = useRef()
    var change_form_button = useRef()
    var change_form_button_2 = useRef()
    var main_form_page = useRef()

    useEffect(() => {
        change_form_button.current.addEventListener("click", (e) => {ChangeFormPage(e)})
        change_form_button_2.current.addEventListener("click", (e) => {ChangeFormPage(e)})
        login_button.current.addEventListener("click", (e) => SendFormData(e, "login"))
        
    }, [])

    const SendFormData = (e, method) => {
        e.preventDefault();
        let form_data = new FormData(document.querySelector(".Index__login_form_div"))
        let json_data = Middleware.SendFormData(form_data, method)
    }

    const ChangeFormPage = (e) => {
        e.preventDefault();
        main_form_page.current.classList.toggle("Index__main_form_div_toggle")
    }

    return(
        <div className="Index__main_div">
            <div className="Index__left_div">
                <p>Keep</p>
                <p>Your</p>
                <p>Passwords</p>
                <p>Safe</p>
            </div>
            <div className="Index__right_div">
                <div className="Index__main_form_div" ref={main_form_page}>
                    <form className="Index__login_form_div">
                        <div className="Index__input_text_cont">
                            <p className="Index__input_title">Username</p>
                            <input type="text" name="username" className="Index__input_text" />
                        </div>
                        <div className="Index__input_text_cont">
                            <p className="Index__input_title">Password</p>
                            <input type="password" name="password1" className="Index__input_text" />
                        </div>
                        <div className="Index__bottom_cont">
                            <button className="Index_submit_button" ref={login_button}>
                                Accedi
                            </button>
                            <button className="Index_change_form_button" ref={change_form_button}>
                                Registrati
                            </button>
                        </div>
                    </form>
                    <form className="Index__registration_form_div">
                        <div className="Index__input_text_cont">
                            <p className="Index__input_title">Username</p>
                            <input type="text" name="username" className="Index__input_text" />
                        </div>
                        <div className="Index__input_text_cont">
                            <p className="Index__input_title">Password</p>
                            <input type="password" name="password1" className="Index__input_text" />
                        </div>
                        <div className="Index__input_text_cont">
                            <p className="Index__input_title">Riscrivi la password</p>
                            <input type="password" name="password2" className="Index__input_text" />
                        </div>
                        <div className="Index__bottom_cont">
                            <button className="Index_submit_button" ref={registration_button}>
                                Registrati
                            </button>
                            <button className="Index_change_form_button" ref={change_form_button_2}>
                                Accedi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Index;