import { 
    Dashboard, 
    Login, 
    Register, 
    ForgotPassword } from '../../ui/pages/index';

const paths = {
  default: () => '/',
  login: () => '/sign-in',
  register: () => '/sign-up',
  forgotPassword: ()=>'/forgot-password',
  dashboard: ()=> '/dashboard'
};

const components = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
  dashboard: Dashboard
};

const routers = [
  {
    isPublic: true,
    path: paths.default(),
    component: components.login
  },
  {
    isPublic: true,
    path: paths.login(),
    component: components.register
  },
  {
    isPublic: true,
    path: paths.register(),
    component: components.register
  },
  {
    isPublic: true,
    path: paths.forgotPassword(),
    component: components.forgotPassword
  },
  {
    isPublic: true,
    path: paths.dashboard(),
    component: components.dashboard
  }
];

export { routers };