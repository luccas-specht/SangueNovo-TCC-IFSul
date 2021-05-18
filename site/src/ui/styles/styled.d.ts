import "styled-components";
declare module "styled-components" {
  interface DefaultTheme {
    title: string;
    colors: {
      text: string;
      titleColor: string;
      primary: string;
      primary1: string;
      primary2: string;
      secundary: string;
      backgroundPrimary: string;
      backgroundSecudary: string;
      white: string;
      colorIconDarkLight: string;
      tabColor: string;
      errorColor: string;
      disableColor: string;
      colorHeader: string;
      colorBurguerMenu: string;
      backgroundCampaignCard: string;
      titleColorCampaignCard: string;
    };
  }
}

export { DefaultTheme };
