import React, { useState } from 'react';

import { FormRegister, IconChangeTheme } from '../components';

import * as SC from './register.style';

import { useTheme } from '../../../../hooks';

export const Register = () => {
  const { theme } = useTheme();
  
  const [isDonator, setIsDonator] = useState<boolean>(true);
  const [isInstitution, setIsInstitution] = useState<boolean>(false);

  const handleChangeTabs = (tabName: 'donator' | 'institution') => {
    if(tabName === 'donator'){
      setIsDonator(true);
      setIsInstitution(false);
    } else {
      setIsDonator(false);
      setIsInstitution(true);
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
          <FormRegister isDonator={isDonator} />
        </SC.AnimationContext>
      </SC.Context>
    </SC.Container>
  );
};