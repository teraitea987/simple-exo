let words = ['Loup','Lapin', 'Cochon', 'Nain', 'Dragon'];
let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let currentPage = 1;
let cellValues = {};
let cellClassName = {};
const wordsPerPage = 2;
words = words.map(word => word.toUpperCase());
let containerId = (document.querySelector('#tableContainer')) ? '#tableContainer' : '#tableContainerDifficile';
let classCssDifficulte = (document.querySelector('#tableContainer')) ? 'facile' : 'difficile';
let classCssUppercaseOrNot = (document.querySelector('#tableContainer')) ? ' _blank_facile' : ' _blank_difficile';
function createTable() {
    let container = document.querySelector(containerId);
    container.innerHTML = '';

    let start = (currentPage - 1) * wordsPerPage;
    let end = start + wordsPerPage;
    let pageWords = words.slice(start, end);

    pageWords.forEach((word, index) => {
        let div = document.createElement('div');
        div.classList.add('exo-content');

        let img = document.createElement('img');
        img.src = `./images/page_${currentPage}_exo_image_${index+1}.jpg`;
        div.appendChild(img);

        let table = document.createElement('table');
        let tbody = document.createElement('tbody');

        let row = document.createElement('tr');
        row.classList.add(classCssDifficulte)
        let blankRow = document.createElement('tr');

        for (let count = 0; count < word.length; count++) {
            let cell = document.createElement('td');
            cell.textContent = word[count];
            row.appendChild(cell);
            cell.classList.add(`${index}_cell_${word[count]}`);
            
            let blankCell = document.createElement('td');
            let cellKey = `${currentPage}_${index}_${count}`;
            
            if (cellValues[cellKey]) {
                blankCell.textContent = cellValues[cellKey];
            }
            blankCell.className = cell.className + '_verif blank-cell-script' + classCssUppercaseOrNot;
            if (cellClassName[cellKey]) {
                blankCell.className += ' ' + cellClassName[cellKey].join(' ');
            }
            blankCell.addEventListener('dragover', function(event) {
                event.preventDefault();
            });
            
            blankCell.addEventListener('drop', function(event) {
                event.preventDefault();
                let data = event.dataTransfer.getData('text/plain');
                this.textContent = data;
                
                let previousRow = this.parentNode.previousElementSibling;
                let correspondingCell = previousRow.children[this.cellIndex];
            
                if (correspondingCell.textContent === this.textContent) {
                    this.classList.add('cl-green');
                } else {
                    this.classList.add('cl-red');
                }
                cellValues[cellKey] = data;
                cellClassName[cellKey] = Array.from(this.classList);
                
            });
            blankCell.addEventListener('click', function(event) {
                this.textContent = '';
                this.classList.remove("cl-red");
                this.classList.remove("cl-green");
                delete cellValues[cellKey];
                delete cellClassName[cellKey];
            });
            blankRow.appendChild(blankCell);
        }
        
        tbody.appendChild(row);
        tbody.appendChild(blankRow);

        table.appendChild(tbody);
        div.appendChild(table);
        container.appendChild(div);
    });
}

function displayWords() {
    let container = document.querySelector(containerId);
    let ul = document.createElement('ul');

    abc.forEach((word) => {
        let li = document.createElement('li');
        let letters = word.split('');
        letters.forEach((letter) => {
            let span = document.createElement('span');
            span.textContent = letter;
            span.id = letter;
            
            li.setAttribute('draggable', 'true');
            li.addEventListener('dragstart', function(event) {
                event.dataTransfer.setData('text/plain', this.textContent);
            });
    
            li.appendChild(span);
        });

        li.id = word;
        li.className = `letter-drag${classCssUppercaseOrNot}`;

        ul.appendChild(li);
    });

    container.appendChild(ul);
}

function createPagination() {
    let container = document.querySelector('#paginationContainer');
    let totalPages = Math.ceil(words.length / wordsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        let button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', function() {
            currentPage = i;
            createTable('color-red','#tableContainer');
            createTable('color-red','#tableContainerDifficile');
            displayWords();
        });
        container.appendChild(button);
    }
}
createPagination();
createTable();
displayWords();