let displayedImage = 0;

document.addEventListener("DOMContentLoaded", function (event) {

  let nodes = document.getElementsByClassName("tile");
  for (let node of nodes) {
    let closeButtons = node.getElementsByClassName("close");
    for (let j = 0; j < closeButtons.length; j++) {
      closeButtons[j].addEventListener("click", function () {
          hideTile(node);
      });
    }

  }

  let paragraphs = document.getElementsByClassName("editable");
  for (let p of paragraphs) {
    imbueEditableEvent(p);
  }

  let forms = document.getElementsByTagName("form");
  for (let form of forms) {
    let button = form.querySelector("button");
    button.addEventListener("click", function (e) {
      e.preventDefault();
      let maybeTextArea = form.querySelector("textarea");
      if (maybeTextArea) {
        let para = toParagraph(maybeTextArea);
        form.replaceChild(para, maybeTextArea);
      }
    });
  }

  let cycleImages = document.getElementsByClassName("count");
  for (let image of cycleImages) {
    image.addEventListener("click", function () {
      displayedImage++;
      displayedImage %= cycleImages.length;
      updateCycle(cycleImages);
    });
  }

  updateCycle(cycleImages);
});

function updateCycle(cycleImages) {
  for (let i = 0; i < cycleImages.length; i++) {
    if (i == displayedImage) {
      cycleImages[i].style.display = "block";
    } else {
      cycleImages[i].style.display = "none";
    }
  }
}

function imbueEditableEvent(p) {
    p.addEventListener("dblclick", function () {
    let newEl = document.createElement("textarea");
    newEl.innerHTML = p.innerHTML;
    p.parentNode.replaceChild(newEl, p);
  });
}

function toParagraph(textarea) {
  let para = document.createElement("p");
  para.className += "editable";
  para.innerHTML = textarea.value;
  imbueEditableEvent(para);
  return para;
}

function hideTile(tile) {
  if (!tile.className.includes("hidden")) {
    tile.className += " hidden";
  }
}

function clearTiles() {
  let tiles = document.getElementsByClassName("tile");
  for (let tile of tiles) {
    hideTile(tile);
  }
}

function resetTiles() {
   let tiles = document.getElementsByClassName("tile");
   for (let tile of tiles) {
     tile.className = tile.className.replace("hidden", "");
   }
}
