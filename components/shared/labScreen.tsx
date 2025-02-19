import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import AcolyteContext from '../../helpers/AcolyteContext';
import InsideLab from './InsideLab';
import OutsideLab from './OutsideLab';

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
