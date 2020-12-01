import { 
    Dashboard, 
    SingIn, 
    SingUp, 
    ForgotPassword } from '../../ui/pages/index';

const paths = {
  default: () => '/',
  singIn: () => '/sing-in',
  singUp: () => '/sing-up',
  forgotPassword: ()=>'/forgot-password',
  dashboard: ()=> '/dashboard'
};

const components = {
  singIn: SingIn,
  singUp: SingUp,
  forgotPassword: ForgotPassword,
  dashboard: Dashboard
};

const routers = [
  {
    isPublic: true,
    path: paths.default(),
    component: components.singIn,
  },
  {
    isPublic: true,
    path: paths.singIn(),
    component: components.singIn,
  },
  {
    isPublic: true,
    path: paths.singUp(),
    component: components.singUp,
  },
  {
    isPublic: true,
    path: paths.forgotPassword(),
    component: components.forgotPassword,
  },
  {
    isPublic: true,
    path: paths.dashboard(),
    component: components.dashboard,
  }
];

export { routers };