import { useEffect, useState, useContext  } from 'react';
import Styles from './AuthForm.module.css';
import { authorize, isResponseOk, getMe } from '@/app/api/api-utils';
import { endpoints } from '@/app/api/config';
import { useStore } from '@/app/store/app-store';

export const AuthForm = (props) => {

    const authContext = useStore()

    const [authData, setAuth] = useState({ identifier: "", password: "" });
    const [message, setMessage] = useState({ status: null, text: null }); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await authorize(endpoints.auth, authData);
        if(isResponseOk(userData)) {
          authContext.login(userData.user, userData.jwt);
          setMessage({ status: "success", text: "Вы авторизовались!" });
        } else {
          setMessage({ status: "error", text: "Неверные почта или пароль" });
        }
      }; 

    const handleInput = (e) => {
      setAuth({ ...authData, [e.target.name]: e.target.value });
    }; 

    useEffect(() => {
        let timer; 
        if(authContext.user) {
          timer = setTimeout(() => {
            setMessage({ status: null, text: null});
            props.close();
          }, 1000);
        }
        return () => clearTimeout(timer);
      }, [authContext.user]);  

  return (
    <form onSubmit={handleSubmit} className={Styles['form']}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input
            onInput={handleInput}
            className={Styles["form__field-input"]}
            name="identifier"
            type="email"
            placeholder="hello@world.com"
          /> 
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input 
            onInput={handleInput} 
            className={Styles['form__field-input']} 
            name="password"
            type="password" 
            placeholder='***********'
          />
        </label>
      </div>
        {message.status && (
            <p className={Styles["form__message"]}>{message.text}</p>
        )} 
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} type="submit">Войти</button>
      </div>
    </form>
  ) 
};
