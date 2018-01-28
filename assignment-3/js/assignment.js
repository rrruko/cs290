document.addEventListener("DOMContentLoaded", function (event) {

  let nodes = document.getElementsByClassName("tile");

  for (let i=0; i < nodes.length; i++) {
    let closeButtons = nodes[i].getElementsByClassName("close");
    for (let j = 0; j < closeButtons.length; j++) {
      let node = nodes[i];
      closeButtons[j].addEventListener("click", function () {
          hideTile(node);
      });
    }

  }

  let paragraphs = document.getElementsByClassName("editable");

  for (let i = 0; i < paragraphs.length; i++) {
    let p = paragraphs[i];
    imbueEditableEvent(p);
  }

  let forms = document.getElementsByTagName("form");

  for (let i = 0; i < forms.length; i++) {
    let form = forms[i];
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
