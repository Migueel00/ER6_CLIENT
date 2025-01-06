import { useContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Text } from "react-native-svg";
import styled from "styled-components/native";
import AppContext from "../../helpers/context";
import { Player } from "../../interfaces/contextInterface";
import { URL } from "../../src/API/urls";

const { width, height } = Dimensions.get('screen');
const bgImg = require('../../assets/backgrounds/exitLabBG.png');

const ApplyCurseScreen = () => {
    const [cursed, setCursed] = useState<String[]>([]);
    const [acolytes, setAcolytes] = useState<Player[]>([]);

    const appContext = useContext(AppContext);
    const players = appContext?.players!;

    useEffect(() => {
        setAcolytes(players?.filter((player) => player.role === 'ACOLYTE'));
    }, []);

    const handleApplyCurse = async(playerId : string) => {
        try {
            const res = await fetch(`${URL.API_PLAYERS}/${playerId}`, {
                method: 'PATCH',  
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ethazium: true})

            });
            console.log(res);
            if(res.ok){
                setCursed(prev => [...prev, playerId]);
            }
        }

        catch (error) {
            console.log(error);
        }
    
    }   

    return (
        <StyledImageBackground 
            source={bgImg}
        >   
            <Title>Hello ISTVAN here you can throw the curse ethazium to anyone</Title>
            <PlayersList>
                {acolytes.map(acolyte => 
                    <PlayerItem
                        key={acolyte._id}
                        >
                        <Avatar
                            src={acolyte.avatar}
                        />
                        <PlayerName>{acolyte.nickname}</PlayerName>
                        { !cursed.includes(acolyte._id) ? (
                            <CurseButton 
                                onPress={() => handleApplyCurse(acolyte._id)}
                            >
                                <ButtonText>Apply</ButtonText>
                            </CurseButton>
                        ) : null }
                    </PlayerItem>)}
            </PlayersList>
        </StyledImageBackground>
    )
}

export default ApplyCurseScreen;

// Styled components
const StyledImageBackground = styled.ImageBackground`
    width: ${width}px;
    height: ${height}px;
    align-items: center;
    justify-content: center;
    padding: ${width * 0.04}px;
`;

const PlayersList = styled.View`
    align-items: flex-start;
    background-color: rgba(0, 0, 0, 0.7);
    padding: ${width * 0.04}px;
    border-radius: ${width * 0.1}px;
    border-width: ${width * 0.002}px;
    border-color: white;
    width: ${width * 0.9}px;
    margin-top: ${width * 0.03}px;
    shadow-color: #000;
    shadow-opacity: 0.25;
    shadow-radius: 3.5;
    elevation: 5;
`;

const PlayerItem = styled.View`
    flex-direction: row;
    align-items: center;
    border-bottom-color: orange;
    padding-bottom: ${width * 0.05}px;
    border-bottom-width: ${width * 0.005}px;
    margin-bottom: ${width * 0.05}px;
    width: ${width * 0.8}px;
`;

const Title = styled.Text`
    font-size: ${width * 0.08}px;
    color: white;
    font-family: 'KochAltschrift';
    text-align: center;
    margin-bottom: ${width * 0.05}px;
`;

const Avatar = styled.Image`
    width: ${width * 0.13}px;
    height: ${width * 0.13}px;
    border-radius: ${width * 0.065}px; 
    margin-right: ${width * 0.02}px;
`;

const PlayerName = styled.Text`
    font-family: KochAltschrift;
    color: white;
    margin-vertical: 5px;
    text-align: left;
    margin-left: 10px;
    width: 40%;
    font-size: ${width * 0.06}px;
`;

const CurseButton = styled.TouchableOpacity`
    width: 30%;
    background-color: orange;
    border-radius: ${width * 0.02}px;
    align-items: center;
    justify-content: center;
    padding: ${width * 0.02}px;
`;

const ButtonText = styled.Text`
    color: black;
    font-family: KochAltschrift;
    font-size: ${width * 0.07}px; 
`;