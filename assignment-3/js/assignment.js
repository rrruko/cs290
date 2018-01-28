document.addEventListener("DOMContentLoaded", function (event) {

  let nodes = document.getElementsByClassName("tile");
  for (let i=0; i < nodes.length; i++) {
    let closeButtons = nodes[i].getElementsByClassName("close");
    for (let j = 0; j < closeButtons.length; j++) {
      let node = nodes[i];
      closeButtons[j].addEventListener("click", function () {
          console.log("hiding node");
          hideTile(node);
      });
    }

  }
});

function hideTile(tile) {
  if (!tile.className.includes("hidden")) {
    tile.className += " hidden";
  }
}

function clearTiles() {
  let tiles = document.getElementsByClassName("tile");
  for (let i = 0; i < tiles.length; i++) {
    hideTile(tiles[i]);
  }
}

function resetTiles() {
   console.log("hi");
   let tiles = document.getElementsByClassName("tile");
   for (let i=0; i < tiles.length; i++) {
     tiles[i].className = tiles[i].className.replace("hidden", "");
   }
}
