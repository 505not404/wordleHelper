const allTiles = document.querySelectorAll(".Tile-module_tile__UWEHN"); 

allTiles.forEach(function(allTiles)
{
    allTiles.addEventListener("click", colorTile); 
})

function colorTile()
{
    state = this.getAttribute("data-state"); 
    activeState = document.getElementById("color-selected").getAttribute("data-pickerstate");
    if(state != "empty")
    {
        this.setAttribute("data-state", activeState); 
    }
}