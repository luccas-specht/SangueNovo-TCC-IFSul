import {
  OrderCampaings,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  CreateCampaign,
  PageNotFound,
  EditProfile,
  DetailsCampaign,
  ListMyCampaigns,
} from "../ui/pages";

type Paths = {
  [key: string]: () => string;
};

type Components = {
  [key: string]: () => JSX.Element;
};

type Routes = {
  [key: string]: {
    path: string;
    component: () => JSX.Element;
  };
};

export const paths: Paths = {
  default: () => "/",
  login: () => "/login",
  register: () => "/cadastro",
  forgotPassword: () => "/esqueci-minha-senha",
  resetPassowrd: () => "/redefinir-senha",
  orderCampaings: () => "/listar-campanhas",
  createCampaign: () => "/criar-campanha",
  pageNotFound: () => "*",
  editProfile: () => "/editar-perfil",
  detailsCampaign: () => "/detalhes-campanha",
  listMyCampaigns: () => "/minhas-campanhas",
};

const components: Components = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
  orderCampaings: OrderCampaings,
  resetPassword: ResetPassword,
  createCampaign: CreateCampaign,
  pageNotFound: PageNotFound,
  editProfile: EditProfile,
  detailsCampaign: DetailsCampaign,
  listMyCampaigns: ListMyCampaigns,
};

export const ROUTES: Routes = {
  /*not found*/
  pageNotFound: {
    path: paths.pageNotFound(),
    component: PageNotFound,
  },

  /*publics here*/
  default: {
    path: paths.default(),
    component: components.login,
  },
  login: {
    path: paths.login(),
    component: components.login,
  },
  register: {
    path: paths.register(),
    component: components.register,
  },
  forgotPassword: {
    path: paths.forgotPassword(),
    component: components.forgotPassword,
  },
  resetPassword: {
    path: paths.resetPassowrd(),
    component: components.resetPassword,
  },

  /*privates here*/
  orderCampaings: {
    path: paths.orderCampaings(),
    component: components.orderCampaings,
  },
  createCampaign: {
    path: paths.createCampaign(),
    component: components.createCampaign,
  },
  editProfile: {
    path: paths.editProfile(),
    component: components.editProfile,
  },
  detailsCampaign: {
    path: paths.detailsCampaign(),
    component: components.detailsCampaign,
  },
  listMyCampaigns: {
    path: paths.listMyCampaigns(),
    component: components.listMyCampaigns,
  },
};
