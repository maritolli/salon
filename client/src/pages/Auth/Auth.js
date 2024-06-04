import React from 'react';

import './Auth.css'
import '../ImportantStyles/colors.css'
import '../ImportantStyles/font.css'
import '../ImportantStyles/common.css'
import '../ImportantStyles/reset.css'

import MainLogoComponent from "../../components/pagesComponents/MainLogoComponent/MainLogoComponent";
import ExitButtonComponent from "../../components/pagesComponents/ExitButtonComponent/ExitButtonComponent";
import {useLocation, useNavigate} from "react-router-dom";
import {AUTH_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === AUTH_ROUTE;

    const handleSubmitRegistration = async (event)=>{
        event.preventDefault();
        navigate(LOGIN_ROUTE);
    }
    return (
        <div className="main-container">
            <ExitButtonComponent/>
            <MainLogoComponent/>
            { isLogin ?
            <div>
                <div className="enter-extra">
                    <p className="enter-extra-words">вход</p>
                </div>

                <div className="enter-container">
                    <div className="inputs-container">
                        <div className="enter-input"><input placeholder="логин"/></div>
                        <div className="enter-input"><input placeholder="пароль"/></div>
                    </div>
                    <button type="submit" className="enter-button"
                            onClick="location.href = '../main_page/index.html'">войти
                    </button>
                </div>
                <form onSubmit={handleSubmitRegistration}>
                    <div className="enter-words">
                        <p className="enter-words-enter">нет аккаунта? не беда! <span
                            style={{color: "var(--enter-registr-button-color)"}}> <button type="submit" className="regist-button"
                                                                              > регистрируйся </button> </span> и
                            присоединяйся к нам
                        </p>
                </div>
                </form>
            </div>
                :
                <div>
                    <div className="registration-extra">
                        <p className="registration-extra-words">регистрация</p>
                    </div>

                    <div className="registration-container">
                        <div className="inputs-container">
                            <div className="registration-input"><input placeholder="ваша фамилия и имя"/></div>
                            <div className="registration-input"><input placeholder="логин"/></div>
                            <div className="registration-input"><input placeholder="пароль"/></div>
                        </div>

                        <button type="submit" className="registration-button"
                                onClick="location.href ='../main_page/index.html'">зарегистрироваться
                        </button>
                    </div>
                </div>
            }

        </div>
    );
});

export default Auth;