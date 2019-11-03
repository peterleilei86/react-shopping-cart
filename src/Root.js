import React from 'react';
import AppProviders from './contexts';

const Root = ({ children }) => <AppProviders>{children}</AppProviders>;

export default Root;
