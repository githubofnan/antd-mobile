import React, { lazy, Suspense } from 'react';

const HomeComponent = lazy(() => import('../pages/Home'))
const Home = props => (
  <Suspense fallback={null}>
    <HomeComponent {...props}></HomeComponent>
  </Suspense>
)

const LoginComponent = lazy(() => import('../pages/Login'))
const Login = props => (
  <Suspense fallback={null}>
    <LoginComponent {...props}></LoginComponent>
  </Suspense>
)

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/login',
    exact: true,
    component: Login
  }
]