import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, Text, View } from 'react-native';
import AppContext from '../../helpers/context';
import styled from 'styled-components/native';

interface updateTowerEvent {
    playerId: string;
    isInsideTower: boolean;
}

const { height, width } = Dimensions.get('window');
const radius = width * 0.3;

const calculatePlayerPositions = (activePlayers: any[]) => {
    return activePlayers.map((_: any, index: any) => {
        if (activePlayers.length === 1) {
            return { x: 0, y: 0 };
        } else {
            const angle = ((2 * Math.PI) / activePlayers.length) * index + Math.PI / 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            return { x, y };
        }
    });
};

const MortimerTowerScreen = () => {
    const socket = useContext(AppContext)?.socket;
    const players = useContext(AppContext)?.players!;
    const setPlayers = useContext(AppContext)?.setPlayers;
    const [activePlayers, setActivePlayers] = useState(
        players.filter(player => player.isInsideTower && player.role === 'ACOLYTE')
    );
    const [playerPositions, setPlayerPositions] = useState(calculatePlayerPositions(activePlayers));

    useEffect(() => {
        socket.on('updateTower', ({ playerId, isInsideTower }: updateTowerEvent) => {
            const updatedPlayers = players.map(player =>
                player.id === playerId ? { ...player, isInsideTower } : player
            );
            setPlayers(updatedPlayers);

            const newActivePlayers = updatedPlayers.filter(player => player.isInsideTower);
            setActivePlayers(newActivePlayers);
        });

        return () => {
            socket.off('updateTower');
        };
    }, [socket, players, setPlayers]);

    useEffect(() => {
        setPlayerPositions(calculatePlayerPositions(activePlayers));
    }, [activePlayers]);

    return (
        <Container>
            <BackgroundImage source={require('../../assets/png/insideTower.png')}>
                <Content>
                <TowerTitle>THE TOWER</TowerTitle>
                <KaotikaFontHeads>Below you have displayed who's{' '}
                    <ColoredText color="green">INSIDE</ColoredText> the Tower
                </KaotikaFontHeads>
                    <PlayerContainer>
                        {activePlayers.map((player, index) => {
                            const position = playerPositions[index];
                            if (!position) return null;

                            return (
                                <AvatarWrapper
                                    key={player.id}
                                    style={{
                                        transform: [
                                            { translateX: position.x },
                                            { translateY: position.y }
                                        ]
                                    }}
                                >
                                    <Avatar source={{ uri: player.avatar }} />
                                </AvatarWrapper>
                            );
                        })}
                    </PlayerContainer>
                </Content>
            </BackgroundImage>
        </Container>
    );
};

// Styled components
const Container = styled.View`
    flex: 1;
`;

const ColoredText = styled.Text<{ color: string }>`
    font-family: KochAltschrift;
    color: ${(props) => props.color};
    font-size: ${width * 0.08}px;
`;

const BackgroundImage = styled.ImageBackground`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Content = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
`;

const TowerTitle = styled.Text`
    font-family: KochAltschrift;
    font-size: ${width * 0.1}px;
    color: white;
    text-decoration-line: underline;
    margin-bottom:  ${width * 0.02}px;
    color: purple;
`;

const KaotikaFontHeads = styled.Text`
    font-family: KochAltschrift;
    font-size: ${width * 0.09}px;
    color: white;
    margin-bottom:  ${width * 0.02}px;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const PlayerContainer = styled.View`
    position: relative;
    width: ${width}px;
    height: ${width}px;
    justify-content: center;
    align-items: center;
`;

const AvatarWrapper = styled.View`
    position: absolute;
    width: ${width * 0.3}px;
    height: ${width * 0.3}px;
    border-radius: ${width * 0.5}px;
    border-width: ${width * 0.005}px;
    border-color: white;
    overflow: hidden;
    background-color: orange;
`;

const Avatar = styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 30px;
`;

export default MortimerTowerScreen;
