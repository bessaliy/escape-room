import {ReactElement} from 'react';
function Spinner(): ReactElement {
  return (
    <div>
      <main className="page-content container quest-page">
        <div className='page-content__title-wrapper' style={{textAlign: 'center', marginTop: '250px', minHeight: 'calc(100vh - 600px)' }}>
          <h1 className='title title--size-m title--uppercase quest-page__title'>
            Загружаем для вас лучшие предложения...
          </h1>
        </div>
      </main>
    </div>
  );
}

export default Spinner;
