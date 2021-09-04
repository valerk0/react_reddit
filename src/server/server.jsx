import express from 'express';
import ReactDOM from 'react-dom/server';
import { AppServer } from '../App';
import { indexTemplate } from './indexTemplate';
import React from 'react';
import { StaticRouter } from 'react-router-dom';

const app = express();
const context = {};

app.use('/static', express.static('./dist/client'));

app.get('/auth', (req, res) => {
  res.send(
    indexTemplate(ReactDOM.renderToString(
      <StaticRouter location={req.url}>
        <AppServer />
      </StaticRouter>
    )),
  );
});

app.get('*', (req, res) => {
  res.send(
    indexTemplate(ReactDOM.renderToString(
      <StaticRouter location={req.url}>
        <AppServer />
      </StaticRouter>
    )),
  );
});

app.listen(3000, () => {
  console.log('Server started:3000');
});
