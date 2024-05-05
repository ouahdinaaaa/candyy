document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const width = 9; // Mettez à jour la largeur à 9
  const squares = [];
  let score = 0;

  const candyColors = [
    'url(images/red-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/purple-candy.png)',
    'url(images/green-candy.png)',
    'url(images/blue-candy.png)'
  ];

  // Créer le plateau de jeu
  function createBoard() {
    for (let i = 0; i < width * 5; i++) { // 5 lignes * 9 colonnes = 45 éléments
      const square = document.createElement('div');
      square.setAttribute('draggable', true);
      square.setAttribute('id', i);
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundImage = candyColors[randomColor];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

  // Glisser les bonbons
  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('dragenter', dragEnter));
  squares.forEach(square => square.addEventListener('dragleave', dragLeave));
  squares.forEach(square => square.addEventListener('drop', dragDrop));

  function dragStart() {
    colorBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
    // this.style.backgroundImage = ''
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.backgroundImage = '';
  }

  function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced;
  }

  function dragEnd() {
    // Quel est un mouvement valide ?
    let validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
  }

  // Déplacer les bonbons une fois que certains ont été effacés
  function moveIntoSquareBelow() {
    for (i = 0; i < width * 5 - width; i++) { // Pour éviter de déplacer les éléments dans la dernière ligne
      if (squares[i + width].style.backgroundImage === '') {
        squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = '';
        const isFirstRow = i < width; // Vérifie si c'est la première ligne
        if (isFirstRow && (squares[i].style.backgroundImage === '')) {
          let randomColor = Math.floor(Math.random() * candyColors.length);
          squares[i].style.backgroundImage = candyColors[randomColor];
        }
      }
    }
  }


  // Vérifier les correspondances pour quatre éléments alignés
  function checkRowForFour() {
    for (i = 0; i < width * 5; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      const notValid = [width - 1, width * 2 - 1, width * 3 - 1, width * 4 - 1]; // Exclure les éléments de la dernière colonne
      if (notValid.includes(i)) continue;

      if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4;
        scoreDisplay.innerHTML = score;
        rowOfFour.forEach(index => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }
  checkRowForFour();

  // Vérifier les correspondances pour quatre éléments alignés verticalement
  function checkColumnForFour() {
    for (i = 0; i < width * 2; i++) { // Parcourir les deux premières lignes uniquement
      let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      let decidedColor = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === '';

      if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        score += 4;
        scoreDisplay.innerHTML = score;
        columnOfFour.forEach(index => {
          squares[index].style.backgroundImage = '';
        });
      }
    }
  }
  checkColumnForFour();

  // Vérifier les correspondances pour trois éléments alignés horizontalement

  
    //for row of Three
    function checkRowForThree() {
      for (i = 0; i < 61; i ++) {
        let rowOfThree = [i, i+1, i+2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
  
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (notValid.includes(i)) continue
  
        if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
          score += 3
          scoreDisplay.innerHTML = score
          rowOfThree.forEach(index => {
          squares[index].style.backgroundImage = ''
          })
        }
      }
    }
    checkRowForThree()
  
  //for column of Three
    function checkColumnForThree() {
      for (i = 0; i < 47; i ++) {
        let columnOfThree = [i, i+width, i+width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
  
        if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
          score += 3
          scoreDisplay.innerHTML = score
          columnOfThree.forEach(index => {
          squares[index].style.backgroundImage = ''
          })
        }
      }
    }
  checkColumnForThree()
  
  // Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
  window.setInterval(function(){
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    moveIntoSquareBelow()
}, 100)
  })
  