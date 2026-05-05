import {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../../const.ts';

function PageNotFound(): ReactElement {
  return (
    <div>
      <main className="page-content container quest-page">
        <div className='page-content__title-wrapper'
          style={{textAlign: 'center', marginTop: '250px', paddingBottom: '70px' ,minHeight: 'calc(100vh - 600px)'}}
        >
          <h1 className='title title--size-m title--uppercase quest-page__title'>
            Упс... Что-то пошло не так
          </h1>
          <Link
            className='title title--size-s title--uppercase'
            style={{textAlign: 'center', minHeight: 'calc(100vh - 600px)', color: '#f39425'}}
            to={AppRoute.Catalogue}
          >
            Перейти на главную
          </Link>
        </div>
      </main>
    </div>
  );
}

export default PageNotFound;
