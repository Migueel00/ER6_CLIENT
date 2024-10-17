import React, { useContext, useState, ReactNode} from 'react' ;
import AppContext from '../../helpers/context';
import MenuHome from './menu/MenuHome';
import MenuLab from './menu/MenuLab';
import MenuLabInside from './menu/MenuLabInside';
import styled from 'styled-components/native';
import AcolyteContext from '../../helpers/AcolyteContext';

const MenuContainer = styled.View`
  flex: 1;
`
const AcolyteProvider: React.FC<{children: ReactNode}> = ({children}) => {

  const appContext = useContext(AppContext);
  const location = appContext?.location;
  const player = appContext?.player;
  const isInsideLab = player?.isInsideLab;
  const [isMenuLoaded, setIsMenuLoaded] = useState<boolean>(false);
  const [isMenuLabLoaded, setIsMenuLabLoaded] = useState<boolean>(false);
  const [isMenuInsideLabLoaded, setIsMenuInsideLabLoaded] = useState<boolean>(false);

  return (
    <AcolyteContext.Provider value={{ 
        isMenuLoaded, 
        setIsMenuLoaded,
        isMenuLabLoaded,
        setIsMenuLabLoaded,
        isMenuInsideLabLoaded,
        setIsMenuInsideLabLoaded
      }}>
      <MenuContainer>
          {isInsideLab ? <MenuLabInside/> : location === 'LAB' ? <MenuLab/> : <MenuHome />}
      </MenuContainer>
      {children}
    </AcolyteContext.Provider>
  
  );
};

export default AcolyteProvider

