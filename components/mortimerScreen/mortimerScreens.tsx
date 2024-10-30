import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import MenuMortimer from './components/MenuMortimer';
import MortimerContext from '../../helpers/MortimerContext';
import AppContext from '../../helpers/context';
import MenuInsideConnection from './components/MenuInsideConnections';
import MenuMortimerTower from './components/MenuMortimerTower';

const MenuContainer = styled.View`
  flex: 1;
`;


const MortimerProvider = () => {

  const appContext = useContext(AppContext);
  const location   = appContext?.location;

  const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
  const [isMenuConnectionLoaded, setIsMenuConnectionLoaded] = useState<boolean>(false);
  return (
    <MortimerContext.Provider value={{
      isMenuLoaded,
      setIsMenuLoaded,
      isMenuConnectionLoaded,
      setIsMenuConnectionLoaded
    }}>
      <MenuContainer>
        {location === 'CONNECTION' ? <MenuInsideConnection/> 
        : location === 'TOWER' ? <MenuMortimerTower/>
        : <MenuMortimer/>}
      </MenuContainer>
    </MortimerContext.Provider>
  
);
}

export default MortimerProvider;
