import {ReactElement} from 'react';
import {useForm} from 'react-hook-form';
import {LoginForm} from '../../../types/forms';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../store';
import {login} from '../../../store/api-actions.ts';
import {AppRoute, AuthStatus, PASSWORD_LENGTH, VALIDATION_PATTERNS} from '../../../const.ts';
import {Navigate, useLocation} from 'react-router-dom';
import {getAuthStatus, getLoginError, getLoginSendingState} from '../../../store/selectors.ts';
import Spinner from '../../ui/spinner/spinner.tsx';

type LocationState = {
  from?: {
    pathname: string;
  };
};

function LoginPage(): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector(getAuthStatus);
  const location = useLocation();
  const state = location.state as LocationState | null;
  const previousPage = state?.from?.pathname || AppRoute.Catalogue;
  const error = useSelector(getLoginError);
  const isSending = useSelector(getLoginSendingState);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<LoginForm>();

  if (authStatus === AuthStatus.Unknown) {
    return <Spinner />;
  }

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={previousPage} replace />;
  }
  const handleFormSubmit = (data: LoginForm) => {
    const {email, password} = data;

    dispatch(login({email, password}));
  };

  return (
    <main className="decorated-page login">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="/img/content/maniac/maniac-size-m.webp, /img/content/maniac/maniac-size-m@2x.webp 2x"
          />
          <img
            src="/img/content/maniac/maniac-size-m.jpg" srcSet="/img/content/maniac/maniac-size-m@2x.jpg 2x"
            width="1366"
            height="768" alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="login__form">
          <form
            className="login-form"
            onSubmit={(evt) => {
              void handleSubmit(handleFormSubmit)(evt);
            }}
            noValidate
          >
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                  <input
                    type='email'
                    id='email'
                    placeholder='Адрес электронной почты'
                    {...register('email', {
                      required: 'Введите e-mail',
                      pattern: {
                        value: VALIDATION_PATTERNS.email,
                        message: 'Некорректный e-mail'
                      }
                    })}
                  />
                  {errors.email?.message && (
                    <span style={{color: 'red'}}>
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">Пароль</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    {...register('password', {
                      required: 'Введите пароль',
                      minLength: {
                        value: PASSWORD_LENGTH.MIN,
                        message: `Пароль должен содержать минимум ${PASSWORD_LENGTH.MIN} символа`
                      },
                      maxLength: {
                        value: PASSWORD_LENGTH.MAX,
                        message: `Пароль должен содержать максимум ${PASSWORD_LENGTH.MAX} символов`
                      },
                      pattern: {
                        value: VALIDATION_PATTERNS.password,
                        message: 'Пароль должен содержать буквы и цифры'
                      }
                    })}
                  />
                  {errors.password?.message && (
                    <span className="form-error" style={{color: 'red'}}>
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <button
                className="btn btn--accent btn--general login-form__submit"
                type="submit"
                disabled={isSending}
              >
                {isSending ? 'Авторизация...' : 'Войти'}
              </button>
              {error && (
                <p style={{ color: 'red' }}>
                  {error}
                </p>
              )}
            </div>
            <label className="custom-checkbox login-form__checkbox">
              <input
                type="checkbox"
                id="id-order-agreement"
                {...register('agreement', {
                  required: 'Подтвердите, что согласны с правилами'
                })}
              />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use href="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">Я&nbsp;согласен с&nbsp;
                <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
              </span>
            </label>
            {errors.agreement?.message && (
              <span style={{color: 'red'}}>
                {errors.agreement.message}
              </span>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
