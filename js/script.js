generateField();

function generateField() {
  field.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    row = field.insertRow(i);
    for (let j = 0; j < 10; j++) {
      cell = row.insertCell(j);
      cell.onclick = function () {
        clickCell(this);
      };
      let mine = document.createAttribute("isMine");
      mine.value = "false";
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

function addMines() {
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let cell = field.rows[row].cells[col];
    cell.setAttribute("isMine", "true");

    //cell.innerHTML = "!";

  }
}

function revealMines() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = field.rows[i].cells[j];
      if (cell.getAttribute("isMine") == "true") {
        cell.className = "mine";
      }
    }
  }
}

function checkEndGame() {
  let isFull = true;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if ((field.rows[i].cells[j].getAttribute("isMine") == "false") && (field.rows[i].cells[j].innerHTML == "")) {
        isFull = false;
      }
    }
  }
  if (isFull) {
    alert("win!");
    revealMines();

    setTimeout(generateField, 2000);
  }
}

function clickCell(cell) {
  if (cell.getAttribute("isMine") == "true") {
    revealMines();
    alert("lose");
    setTimeout(generateField, 2000);
  } else {
    cell.className = "clicked";

    let mineCount = 0;
    let cellRow = cell.parentNode.rowIndex;
    let cellCol = cell.cellIndex;
    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
      for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
        if (field.rows[i].cells[j].getAttribute("isMine") == "true") {
          mineCount++;
        }
      }
    }
    cell.innerHTML = mineCount;
    if (mineCount == 0) {
      for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
          if (field.rows[i].cells[j].innerHTML == "") {
            clickCell(field.rows[i].cells[j]);
          }
        }
      }
    }
    checkEndGame();
  }
}