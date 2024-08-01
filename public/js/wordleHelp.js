function getCorrectWords(wordsLength)
{
    let allCorrectLeft = []; 
    let correctStatus = "*****"; 

    for(let i = 0; i < row; i++)
    {
        for(let j = 0; j < col; j++)
        {
            if(wordleWordsStatus[i][j] == "c")
            {
                correctStatus = setCharAt(correctStatus, j, wordleWords[i][j]); 
            }
        }
    }

    for(let i = 0; i < wordsLength; i++)
    {
        let valid = true; 
        for(let j = 0; j < col; j++)
        {
            if(words[i][j] != correctStatus[j] && correctStatus[j] != "*")
            {
                valid = false; 
            }
        }

        if(valid)allCorrectLeft.push(words[i]); 
    }

    return allCorrectLeft;
}

function eliminateAbsentCharacters(allCorrectLeft)
{
    let absentCharacters = new Set(); 
    for(let i = 0; i < row; i++)
    {
        for(let j = 0; j < col; j++)
        {
            if(wordleWordsStatus[i][j] == "a")
            {
                absentCharacters.add(wordleWords[i][j]); 
            }
        }
    }

    let allCorrectLeftLength = allCorrectLeft.length; 
    let allAbsentLeft = [];
    for(let i = 0; i < allCorrectLeftLength; i++)
    {
        let valid = true; 
        for(let j = 0; j < col; j++)
        {
            absentCharacters.forEach((value) =>
            {
                if(allCorrectLeft[i][j] == value)
                {
                    valid = false; 
                }
            })
        }
        if(valid)allAbsentLeft.push(allCorrectLeft[i]); 
    }

    return allAbsentLeft; 
}

function getPresentValidWords(allAbsentLeft)
{
    let presentList = [];
    let presentCharacters = new Set(); 
    for(let i = 0; i < row; i++)
    {
        let tempList = []; 
        for(let j = 0; j < col; j++)
        {
            if(wordleWordsStatus[i][j] == 'p')
            {
                tempList.push(wordleWords[i][j]); 
                presentCharacters.add(wordleWords[i][j]); 
            }
            else tempList.push("*"); 
        }
        presentList.push(tempList); 
    }

    let allAbsentLeftLength = allAbsentLeft.length; 
    let allPresentLeft = [];
    for(let i = 0; i < allAbsentLeftLength; i++)
    {
        let valid = true; 
        for(let j = 0; j < row; j++)
        {
            for(let k = 0; k < col; k++)
            {
                if(allAbsentLeft[i][k] == presentList[j][k])
                {
                    valid = false; 
                }
            }
        }

        presentCharacters.forEach((value) => 
        {
            if(!allAbsentLeft[i].includes(value, 0))
            {
                valid = false; 
            }
        })

        if(valid)allPresentLeft.push(allAbsentLeft[i]); 
    }

    return allPresentLeft; 
}

function getValidWords(wordsLength)
{
    allCorrectLeft = getCorrectWords(wordsLength); 
    allAbsentLeft = eliminateAbsentCharacters(allCorrectLeft); 
    allPresentLeft = getPresentValidWords(allAbsentLeft); 
    return allPresentLeft; 
}

function getTopFiveChars(wordList)
{
    const countChar = {};
    let wordListLength = wordList.length; 

    for(let i = 0; i < wordListLength; i++)
    {
        for(let char of wordList[i])
        {
            if(countChar[char])
            {
                countChar[char]++; 
            }
            else
            {
                countChar[char] = 1; 
            }
        }
    }

    let sortCount = []; 
    for(let char in countChar)
    {
        sortCount.push([char, countChar[char]]); 
    }

    sortCount.sort(function(a, b)
    {
        return a[1] - b[1]; 
    }); 

    sortCount.reverse();

    let presentAndCorrectCharacters = []; 
    for(let i = 0; i < row; i++)
    {
        for(let j = 0; j < col; j++)
        {
            if(wordleWordsStatus[i][j] == 'c' || wordleWordsStatus[i][j] == 'p')
            {
                presentAndCorrectCharacters.push(wordleWords[i][j]); 
            }
        }
    }

    let presentAndCorrectCharactersLength = presentAndCorrectCharacters.length; 
    let sortCountLength = sortCount.length; 

    let topFiveChars = []; 
    let countFreq = 0; 
    for(let i = 0; i < sortCountLength; i++)
    {
        if(countFreq >= 5)break; 
        let valid = true; 
        for(let j = 0; j < presentAndCorrectCharactersLength; j++)
        {
            if(sortCount[i][0] == presentAndCorrectCharacters[j])
            {
                valid = false; 
            } 
        }
        if(valid)
        {
            countFreq++; 
            topFiveChars.push(sortCount[i][0]); 
        }
    }
    return topFiveChars; 
}