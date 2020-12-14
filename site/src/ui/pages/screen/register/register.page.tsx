import React, { useState } from 'react';

import { FormRegister, IconChangeTheme } from '../components';

import * as SC from './register.style';

import { useTheme } from '../../../../hooks';

const Register = () => {
  const { theme } = useTheme();
  
  const [activeTab, setActiveTab] = useState<boolean>(true);
  const [isDonator, setIsDonator] = useState<boolean>(true);
  const [isInstitution, setisInstitution] = useState<boolean>(false);

  const handleChangeTabs = (tabName: 'donator' | 'institution') => {
    if(tabName === 'donator'){
      setActiveTab(true);
      setIsDonator(true);
      setisInstitution(false);
    }else{
      setActiveTab(false);
      setIsDonator(false);
      setisInstitution(true);
    }
  }
  
  return(
    <SC.Container>
      <SC.ImgBackground/>
      <SC.Context>
      <IconChangeTheme namePage='register'/>
        <SC.AnimationContext>
        <SC.ContextLogoSideBar>
        <img 
          src={theme.logo} 
          alt='Logo Sangue Novo'
        />
          <SC.Tab>
            <SC.Tabs 
              isActive={isDonator}
              onClick={() => handleChangeTabs('donator')}
            >
              Sou Doador
            </SC.Tabs>
            <SC.Tabs 
              isActive={isInstitution}
              onClick={() => handleChangeTabs('institution')}
            >
              Sou Instituição
            </SC.Tabs>
          </SC.Tab>
          </SC.ContextLogoSideBar>
          <FormRegister donator={activeTab} />
        </SC.AnimationContext>
      </SC.Context>
    </SC.Container>
  );
}

export { Register };