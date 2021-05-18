import {
  OrderCampaigns,
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

export const PATHS: Paths = {
  default: () => "/",
  login: () => "/login",
  register: () => "/cadastro",
  forgotPassword: () => "/esqueci-minha-senha",
  resetPassowrd: () => "/redefinir-senha",
  orderCampaigns: () => "/listar-campanhas",
  createCampaign: () => "/criar-campanha",
  pageNotFound: () => "*",
  editProfile: () => "/editar-perfil",
  detailsCampaign: () => "/detalhes-campanha",
  listMyCampaigns: () => "/minhas-campanhas",
};

const COMPONENTS: Components = {
  login: Login,
  register: Register,
  forgotPassword: ForgotPassword,
  orderCampaigns: OrderCampaigns,
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
    path: PATHS.pageNotFound(),
    component: PageNotFound,
  },

  /*publics here*/
  default: {
    path: PATHS.default(),
    component: COMPONENTS.login,
  },
  login: {
    path: PATHS.login(),
    component: COMPONENTS.login,
  },
  register: {
    path: PATHS.register(),
    component: COMPONENTS.register,
  },
  forgotPassword: {
    path: PATHS.forgotPassword(),
    component: COMPONENTS.forgotPassword,
  },
  resetPassword: {
    path: PATHS.resetPassowrd(),
    component: COMPONENTS.resetPassword,
  },

  /*privates here*/
  orderCampaigns: {
    path: PATHS.orderCampaigns(),
    component: COMPONENTS.orderCampaigns,
  },
  createCampaign: {
    path: PATHS.createCampaign(),
    component: COMPONENTS.createCampaign,
  },
  editProfile: {
    path: PATHS.editProfile(),
    component: COMPONENTS.editProfile,
  },
  detailsCampaign: {
    path: PATHS.detailsCampaign(),
    component: COMPONENTS.detailsCampaign,
  },
  listMyCampaigns: {
    path: PATHS.listMyCampaigns(),
    component: COMPONENTS.listMyCampaigns,
  },
};
