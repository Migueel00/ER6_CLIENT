const getIngredientsData = async () => {
    try
    {
        const result = await fetch('https://raw.githubusercontent.com/zsiciarz/skyrim-alchemy-toolbox/master/data/ingredients.json');
        return result.json();
    }
    catch(error)
    {
        console.log(error);
    }  
}

const getCharactersData = async () => {
    try
    {
        const result = await fetch('https://gist.githubusercontent.com/oscar1771/3f27e083e980d9d8357294c2d7387fc0/raw/0296abf13d206454d18f88d8283c114be8d96d2e/joseph.json');
        return result.json();
    }
    catch(error)
    {
        console.log(error);
    }  
}

export {getIngredientsData, getCharactersData};