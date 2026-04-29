import {ReactElement} from 'react';

function Footer(): ReactElement {
  return (
    <footer className="footer">
      <div className="container container--size-l">
        <div className="socials">
          <ul className="socials__list">
            <li className="socials__item">
              <a className="socials__link" href="#" aria-label="Skype" target="_blank" rel="nofollow noopener noreferrer">
                <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                  <use href="#icon-skype-default"></use>
                </svg>
                <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                  <use href="#icon-skype-interactive"></use>
                </svg>
              </a>
            </li>
            <li className="socials__item">
              <a className="socials__link" href="#" aria-label="ВКонтакте" target="_blank" rel="nofollow noopener noreferrer">
                <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                  <use href="#icon-vk-default"></use>
                </svg>
                <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                  <use href="#icon-vk-interactive"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
