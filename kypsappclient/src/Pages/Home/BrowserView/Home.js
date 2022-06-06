import React from "react";
import "./CSS/Home.css"
import search from "./MEDIA/search.png"
import add from "./MEDIA/add.png"
import exit from "./MEDIA/left.png"

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
                   <div className="Home__credentials_card">
                       <div className="Home__credentials_card_navbar">
                            <div className="Home__credentials_card_navbar_cont">
                                
                            </div>
                       </div>
                       <div className="Home__credentials_card_input_cont">
                            <div className="Home__credentials_card_input_div">
                                <p className="Home__credentials_card_input_title">Servizio</p>
                                <input type="text" />
                                <p className="Home__credentials_card_input_title">Username</p>
                                <input type="text" />
                                <p className="Home__credentials_card_input_title">Password</p>
                                <input type="password" />
                            </div>
                       </div>
                       <div className="Home__credentials_card_footer">

                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default Home