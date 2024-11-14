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
  const mortimerLocation   = appContext?.location;

  const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
  const [isMenuConnectionLoaded, setIsMenuConnectionLoaded] = useState<boolean>(false);
  const [isMenuTowerLoaded, setIsMenuTowerLoaded] = useState<boolean>(false);
  const [isMenuSwampLoaded, setIsMenuSwampLoaded] = useState<boolean>(false);
  const [isMenuOldSchoolLoaded, setIsMenuOldSchoolLoaded] = useState<boolean>(false);
  const [isMenuHallOfSagesLoaded, setIsMenuHallOfSagesLoaded] = useState<boolean>(false);

  return (
    <MortimerContext.Provider value={{
      isMenuLoaded,
      setIsMenuLoaded,
      isMenuConnectionLoaded,
      setIsMenuConnectionLoaded,
      isMenuTowerLoaded,
      setIsMenuTowerLoaded,
      isMenuSwampLoaded,
      setIsMenuSwampLoaded,
      isMenuOldSchoolLoaded,
      setIsMenuOldSchoolLoaded,
      isMenuHallOfSagesLoaded,
      setIsMenuHallOfSagesLoaded
    }}>
      <MenuContainer>
        {mortimerLocation === 'LAB' ? <MenuInsideConnection/> 
        : mortimerLocation === 'TOWER' ? <MenuMortimerTower/>
        : <MenuMortimer/>}
      </MenuContainer>
    </MortimerContext.Provider>
  
);
}

export default MortimerProvider;
