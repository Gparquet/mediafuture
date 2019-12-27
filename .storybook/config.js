import { configure } from '@storybook/react';

const loaderFn = () => {
  const allExports = [];
  const req = require.context('../src', true, /\.stories\.js$/);
  req.keys().forEach(fname => allExports.push(req(fname)));
  return allExports;
};

configure(loaderFn, module);