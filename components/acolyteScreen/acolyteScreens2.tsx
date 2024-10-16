import React, { useContext } from 'react';
import { View } from 'react-native';
import AppContext from '../../helpers/context';
import MenuHome from './menu/MenuHome';
import MenuLab from './menu/MenuLab';
import MenuLabInside from './menu/MenuLabInside';



const AcolyteScreens = () => {

  const location = useContext(AppContext)?.location;
  const player = useContext(AppContext)?.player;

  const isInsideLab = player?.isInsideLab;

  return (
    <View 
      style={{ flex: 1 }}
    > 
      {isInsideLab ? <MenuLabInside/> : location === 'LAB' ? <MenuLab/> : <MenuHome/>}
    </View>
  );
};

export default AcolyteScreens;
