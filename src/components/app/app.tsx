import {ReactElement, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../private-route/private-route.tsx';
import {Navigate} from 'react-router-dom';

import Layout from '../layout/layout.tsx';

import MainPage from '../pages/main-page/main-page.tsx';
import PageNotFound from '../pages/page-not-found/page-not-found.tsx';
import BookingPage from '../pages/booking-page/booking-page.tsx';
import QuestPage from '../pages/quest-page/quest-page.tsx';
import ContactsPage from '../pages/contacts-page/contacts-page.tsx';
import LoginPage from '../pages/login-page/login-page.tsx';
import MyQuestsPage from '../pages/my-quests-page/my-quests-page.tsx';

import { AppRoute } from '../../const.ts';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../store';
import {checkAuth} from '../../store/api-actions.ts';

function App(): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Catalogue}
          element={<Layout />}
        >

          <Route
            index
            element={<MainPage />}
          />

          <Route
            path={AppRoute.Quest}
            element={<QuestPage />}
          />

          <Route
            path={AppRoute.Contacts}
            element={<ContactsPage />}
          />

          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />

          <Route
            path={AppRoute.Booking}
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.MyQuests}
            element={
              <PrivateRoute>
                <MyQuestsPage />
              </PrivateRoute>
            }
          />

          <Route
            path={AppRoute.NotFound}
            element={<PageNotFound />}
          />

          <Route
            path={AppRoute.Fallback}
            element={<Navigate to={AppRoute.NotFound} replace />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
