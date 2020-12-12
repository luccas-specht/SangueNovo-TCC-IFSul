import { 
    Dashboard, 
    Login, 
    Register, 
    ForgotPassword,
   } from '../../ui/pages/index';

const paths = {
  default: () => '/',
  login: () => '/sign-in',
  register: () => '/sign-up',
  forgotPassword: ()=>'/forgot-password',
  resetPassowrd: ()=> '/reset-password',
  dashboard: ()=> '/dashboard'
};

const components = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
  dashboard: Dashboard
};

const ROUTERS = {
  /*publics here*/
 default: {
    path: paths.default(),
    component: components.login
  },
 login: {
    path: paths.login(),
    component: components.login
  },
 register: {
    path: paths.register(),
    component: components.register
  },
  forgotPassword: {
    path: paths.forgotPassword(),
    component: components.forgotPassword
  },
  resetPassword: {
      path: paths.resetPassowrd(),
      // colocar isso:
      // component: components.resetPassword,
  },
  /*privates here*/
  dashboard: {
    path: paths.dashboard(),
    component: components.dashboard
  }
};

export { ROUTERS };