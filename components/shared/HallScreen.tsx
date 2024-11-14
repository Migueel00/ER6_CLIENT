import React, { useContext} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import AcolyteContext from '../../helpers/AcolyteContext';
import InsideHall from './InsideHall';
import OutsideHall from './OutsideHall';

const HallScreen = () => {
    const acolyteContext = useContext(AcolyteContext);
    const isInsideHall = acolyteContext?.isInsideHall;

    return (
        <View style={styles.container}>
            {isInsideHall ? (
                <InsideHall/>
            ) : (
                <OutsideHall/>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

export default HallScreen;
