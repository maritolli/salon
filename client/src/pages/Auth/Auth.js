import React, {useContext, useState} from 'react';

import './Auth.css'
import '../ImportantStyles/colors.css'
import '../ImportantStyles/font.css'
import '../ImportantStyles/common.css'
import '../ImportantStyles/reset.css'

import MainLogoComponent from "../../components/pagesComponents/MainLogoComponent/MainLogoComponent";
import ExitButtonComponent from "../../components/pagesComponents/ExitButtonComponent/ExitButtonComponent";
import {useLocation, useNavigate} from "react-router-dom";
import {AUTH_ROUTE, HISTORY_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {registration, login} from "../../http/clientAPI";
import {employeeLogin} from "../../http/employeeAPI";
import {Context} from "../../index";

const Auth = observer(() => {
    const {user} = useContext(Context)

    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === AUTH_ROUTE;

    const[isEmployee, setIsEmployee] = useState(false);
    const[Fname, setFname] = useState("");
    const[Login, setLogin] = useState("");
    const[Password, setPassword] = useState("");

    const handleEmployeeEnter = (event)=>{
        event.preventDefault()
        if(event.target.checked){setIsEmployee(true)}
        else {setIsEmployee(false)}
    }

    const handleSubmitRegistration = async (event)=>{
        event.preventDefault();
        navigate(LOGIN_ROUTE);
    }

    const handleEnterAccount = async(event)=>{
        try{
            event.preventDefault();
            let data
            if(isLogin){
                if(isEmployee){
                    data = await employeeLogin(Login, Password)
                }
                else{
                    data  = await login(Login, Password)
                }

            }
            else{
                data = await registration(Fname, Login, Password)
            }
            localStorage.setItem('auth', 'true')
            user.setUser(data);
            user.setIsAuth(true)
            console.log(user.isAuth)
            navigate(HISTORY_ROUTE + '/' + data.id);
        }catch(error){
            alert(error.response.data.message)
        }

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
                        <div className="enter-input"><input
                            placeholder="логин"
                            value={Login}
                            onChange={event => setLogin(event.target.value)}
                        /></div>
                        <div className="enter-input"><input
                            placeholder="пароль"
                            value={Password}
                            onChange={event=>setPassword(event.target.value)}
                            type="password"
                        /></div>
                    </div>
                    <label className="is-employee-enter-label">
                        <input className="is-employee-enter-checkbox" type="checkbox" onChange={handleEmployeeEnter}/>
                        <span className="fake-is-employee-enter-label">Сотрудник?</span>

                    </label>
                    <button type="submit" className="enter-button"
                            onClick={handleEnterAccount}>войти
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
                            <div className="registration-input"><input
                                placeholder="ваша фамилия и имя"
                                value={Fname}
                                onChange={event=>setFname(event.target.value)}
                            /></div>
                            <div className="registration-input"><input
                                placeholder="логин"
                                value={Login}
                                onChange={event=>setLogin(event.target.value)}
                            /></div>
                            <div className="registration-input"><input
                                placeholder="пароль"
                                value={Password}
                                onChange={event=>setPassword(event.target.value)}
                                type="password"
                            /></div>
                        </div>

                        <button type="submit" className="registration-button"
                                onClick={handleEnterAccount}>зарегистрироваться
                        </button>
                    </div>
                </div>
            }

        </div>
    );
});

export default Auth;