let index = 0; 
let row = 0; 
let col = 5; 
let wordleWords = []; 
let wordleWordsStatus = []; 
let currentWord = ""; 

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function setWordleStatus()
{
    let status = ""; 
    let selectedTile = document.querySelectorAll(".Tile-module_tile__UWEHN");
    for(let i = 0; i < col; i++)
    {
        let selectedTileAttribute = selectedTile[row * col + i].getAttribute("data-state"); 
        if(selectedTileAttribute == "absent")
        {
            status += "a";  
        }
        else if(selectedTileAttribute == "present")
        {
            status += "p"; 
        }
        else if(selectedTileAttribute == "correct")
        {
            status += "c"; 
        }
    }

    wordleWordsStatus.push(status); 
}

function checkCurrentWordExist()
{
    let selectedTile = document.querySelectorAll(".Tile-module_tile__UWEHN");
    let alert = document.getElementById("alert");
    let currentWordExist = false;
    for (let i = 0; i < wordsLength; i++) {
        if (currentWord == words[i]) {
            currentWordExist = true;
            break;
        }
    }; 
    if (!currentWordExist) {
        alert.innerHTML = "Not in word list";
        return;
    }
}

function insertNewWord()
{
    let selectedTile = document.querySelectorAll(".Tile-module_tile__UWEHN");
    let alert = document.getElementById("alert");

    if (index < 5) {
        alert.innerHTML = "Not enough letters";
        return;
    }
    let allCharMarked = true; 
    for(let i = 0; i < col; i++)
    {
        let selectedTileAttribute = selectedTile[row * col + i].getAttribute("data-state"); 
        if(selectedTileAttribute == "tbd" || selectedTileAttribute == "empty")
        {
            allCharMarked = false; 
        }
    }
    if(!allCharMarked)
    {
        alert.innerHTML = "Unmarked character(s)";
        return; 
    }
    let currentWord = ""; 
    for(let i = 0; i < col; i++)
    {
        currentWord += selectedTile[row * col + i].innerHTML; 
    }

    alert.innerHTML = ""; 
    wordleWords.push(currentWord); 
    setWordleStatus(); 
    // console.log(wordleWords); 
    row++; 
    index = 0;
    return true; 
}

function typeToGrid(selected) {
    let selectedTile = document.querySelectorAll(".Tile-module_tile__UWEHN");
    if (selected == "Backspace") {
        if (index > 0) {
            index--;
            let indexNow = row * col + index;
            selectedTile[indexNow].innerHTML = "";
            selectedTile[indexNow].setAttribute("data-state", "empty"); 
            currentWord = currentWord.substring(0, index);
        }
    }
    else if (selected == "Enter") {
        insertNewWord();
        let validWords = getValidWords(wordsLength); 
        console.log(validWords); 
        printValidWords(validWords); 
    }
    else if(selected.length === 1 && selected.match(/[a-z]/i)){
        if (index < 5) {
            let indexNow = row * col + index;
            selectedTile[indexNow].innerHTML = selected;
            if (selectedTile[indexNow].getAttribute("data-state") == "empty") {
                selectedTile[indexNow].setAttribute("data-state", "tbd"); 
            }
            index++;
        }
    }
}