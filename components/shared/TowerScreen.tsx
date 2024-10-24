import React, { useContext} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import InsideLab from './InsideLab';
import OutsideLab from './OutsideLab';
import AcolyteContext from '../../helpers/AcolyteContext';

const LabScreen = () => {
    const acolyteContext = useContext(AcolyteContext);
    const isInsideLab = acolyteContext?.isInsideLab;

    return (
        <View style={styles.container}>
            {isInsideLab ? (
                <InsideLab/>
            ) : (
                <OutsideLab/>
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

export default LabScreen;
