import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import AppContext from '../../helpers/context';
import VillainContext from '../../helpers/VillainContext';
import MenuVillain from './components/MenuVillain';
import MenuVillainInsideLab from './components/MenuVillainInsideLab';


const MenuContainer = styled.View`
    flex: 1;
`;


const VillainProvider = () => {

    const appContext = useContext(AppContext);
    const location = appContext?.location;

    const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
    const [isMenuLabLoaded, setIsMenuLabLoaded] = useState<boolean>(false);

    

    return (
        <VillainContext.Provider
            value={{isMenuLoaded, setIsMenuLoaded, isMenuLabLoaded, setIsMenuLabLoaded}}>
                <MenuContainer>
                    {location === 'INSIDE_LAB' ? <MenuVillainInsideLab/> : <MenuVillain/>  }
                </MenuContainer>  
        </VillainContext.Provider>
    );
}

export default VillainProvider;
