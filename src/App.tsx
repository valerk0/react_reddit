import React, { useEffect, useState } from "react";
import { hot } from "react-hot-loader/root";
import { Layout } from "./shared/Layout";
import "./main.global.css";
import { Header } from "./shared/Header";
import { Content } from "./shared/Content";
import { CardsList } from "./shared/CardsList";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./store/reducer";
import thunk from "redux-thunk";
import { getTokenAsync } from "./store/token/actions";
import { BrowserRouter, Redirect, Route, StaticRouter, Switch } from "react-router-dom";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

function AppComponent() {
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Content>
          <CardsList />
        </Content>
      </Layout>
    </Provider>
  );
}

function AppRouted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    store.dispatch<any>(getTokenAsync());
    setMounted(true);
  }, []);

  return (
    <>{mounted &&
      <BrowserRouter>
        <Switch>
          <Route path='/posts'>
            <AppComponent />
          </Route>
          <Route exact path='/'>
            <Redirect to='/posts' />
          </Route>
          <Route exact path='/auth'>
            <Redirect to='/posts' />
          </Route>
          <Route>
            <div>404 - Страница не найдена</div>
          </Route>
        </Switch>
      </BrowserRouter>
    }</>
  );
}

export const App = hot(() => <AppRouted />);
export const AppServer = hot(() => <AppComponent />);

