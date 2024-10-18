import React, { useContext, useState } from 'react';
import { Dimensions } from 'react-native'
import styled from 'styled-components/native';
import * as CONSTANTS from "../../src/constants";
import MenuMortimer from './components/MenuMortimer';
import MortimerContext from '../../helpers/MortimerConttext';
import AppContext from '../../helpers/context';
import MenuInsideConnection from './components/MenuInsideConnections';

const {width, height} = Dimensions.get('window');

const Icon = styled.Image`
    width: ${CONSTANTS.ICON_WIDTH * width}px;
    height: ${CONSTANTS.ICON_WIDTH * width}px;
`
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
        {location === 'CONNECTION' ? <MenuInsideConnection/> : <MenuMortimer/>}
      </MenuContainer>
    </MortimerContext.Provider>
  
);
}

export default MortimerProvider;
