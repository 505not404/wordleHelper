const allKeys = document.querySelectorAll(".Key-module_key__kchQI"); 
const colorChoices = document.querySelectorAll(".color-choice")
window.addEventListener('keydown', function(event) { 
  const key = event.key; 
  keyboardType(key); 
});

allKeys.forEach(function(allKeys) {
    allKeys.addEventListener("click", keyboardClick); 
});

colorChoices.forEach(function(colorChoices)
{
  colorChoices.addEventListener("click", selectColor); 
})

function selectColor()
{
  let selectedColor = this.id; 
  let newPickerState =  document.getElementById(selectedColor).getAttribute("data-pickerstate");
  document.getElementById("color-selected").setAttribute("data-pickerstate", newPickerState);  
}

function keyboardType(typedCharacter)
{
  typeToGrid(typedCharacter); 
}

function keyboardClick()
{
    let selected = this.getAttribute("data-key");
    typeToGrid(selected); 
}

function HTMLPrint(printedArray, htmlElement)
{
  let len = printedArray.length; 
  for(let i = 0; i < len; i++)
  {
    htmlElement.innerHTML += `<span>${printedArray[i]}</span>`;
  }
}

function printValidWords(wordList)
{
  console.log("tes"); 
  let topFiveChars = document.getElementById("top-five-chars");
  let allValidWords = document.getElementById("all-valid-words"); 
  let topFiveHTML = document.getElementById("frequent-chars"); 
  let validWordHTML = document.getElementById("valid-words");
  document.getElementById("frequent-chars").innerHTML = ""; 
  document.getElementById("valid-words").innerHTML = ""; 
  if(topFiveChars.checked == true)
  {
    topFiveHTML.innerHTML += '<h1>top five most frequent characters</h1><hr>'; 
    if(wordList != null)
    {
      let topFiveChars = getTopFiveChars(wordList); 
      console.log(topFiveChars);
      HTMLPrint(topFiveChars, topFiveHTML);   
    }
  }

  if(allValidWords.checked == true)
  {
    validWordHTML.innerHTML += 
    '<h1>valid words</h1><hr>'; 
    if(wordList != null)
    {
      HTMLPrint(wordList, validWordHTML); 
    }
  }
}