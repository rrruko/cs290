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
    console.log("got " + button);
    button.addEventListener("click", function (e) {
      e.preventDefault();
      let maybeTextArea = form.querySelector("textarea");
      if (maybeTextArea) {
        let para = toParagraph(maybeTextArea);
        form.replaceChild(para, maybeTextArea);
        console.log("done");
      } else {
        console.log("???");
      }
    });
  }
});

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
   console.log("hi");
   let tiles = document.getElementsByClassName("tile");
   for (let tile of tiles) {
     tile.className = tile.className.replace("hidden", "");
   }
}
