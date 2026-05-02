import {ReactElement} from 'react';
import {Link, NavLink, useLocation} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const.ts';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthStatus} from '../../store/selectors.ts';
import {AppDispatch} from '../../store';
import {logout} from '../../store/api-actions.ts';

function Header(): ReactElement {
  const authStatus = useSelector(getAuthStatus);
  const location = useLocation();
  const isLoginPage = location.pathname.includes(AppRoute.Login);
  const isLoggedIn = authStatus === AuthStatus.Auth;
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container container--size-l">
        <span className="logo header__logo">
          <svg width="134" height="52" aria-hidden="true">
            <use href="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink
                to={AppRoute.Catalogue}
                className={({ isActive }) => isActive ? 'link active' : 'link'}
              >
                Квесты
              </NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink
                to={AppRoute.Contacts}
                className={({ isActive }) => isActive ? 'link active' : 'link'}
              >
                Контакты
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className="main-nav__item">
                <NavLink
                  to={AppRoute.MyQuests}
                  className={({ isActive }) => isActive ? 'link active' : 'link'}
                >
                  Мои бронирования
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="header__side-nav">
          {!isLoginPage && (
            isLoggedIn ? (
              <button
                className="btn btn--accent header__side-item"
                onClick={handleLogout}
              >Выйти
              </button>
            ) : (
              <Link
                className="btn header__side-item header__login-btn"
                to={AppRoute.Login}
              >
              Вход
              </Link>
            )
          )}

          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
