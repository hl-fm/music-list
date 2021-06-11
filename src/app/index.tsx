/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, useLocation } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';

export function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <React.Fragment>
      <Helmet htmlAttributes={{ lang: i18n.language }}></Helmet>

      <Switch location={location} key={location.key}>
        <Route exact path={process.env.PUBLIC_URL + '/'}>
          <HomePage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
