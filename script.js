'use strict'
const btn = document.querySelector('.btn');
const resultDiv = document.querySelector('.result-div');

function rollDices() {
    const min = 0;
    const dicesNum = +document.querySelector('#dices-num').value;
    const edgesNum = document.querySelector('#edges-num').value;
    let result = 0;
    let resultWrong = 'Error: Enter positive integer num';
    let arrEdges = [];

//create wrapper-div eachResult
    const eachResult = document.createElement('div');
    eachResult.classList.add('each-result');
    resultDiv.appendChild(eachResult);
    console.log('eachResult: ' + eachResult);

//function that create input div
    function createSymbol(symbolName, styleSymbol, styleName) {
        const symbol = document.createElement('div');
        symbol.classList.add(styleSymbol);
        symbol.classList.add(styleName);
        eachResult.appendChild(symbol);
        symbol.textContent = symbolName;
    }

//function clear input value
    function clearInput () {
        document.querySelector('#dices-num').value = '';
        document.querySelector('#edges-num').value = '';
    }

//function for checking validity isInteger
    function isInteger (num) {
       return (num % 1 !== 0);
    }

    console.log('dicesNum: ' + dicesNum);
    console.log('edgesNum: ' + edgesNum);

//check the validity of the input
    if (dicesNum <=0 || isNaN(dicesNum) || edgesNum <= 0 || isInteger(dicesNum)) {
        createSymbol(resultWrong, 'symbol','result');
        clearInput();
        console.log('Wrong number');
    } else {
//FOR FateCore
        console.log('edgesNum: ' + edgesNum);
        if (edgesNum === 'f' || edgesNum === 'fate' || edgesNum === 'fatecore' ||
            edgesNum === 'F' || edgesNum === 'FATE' || edgesNum === 'FATECORE' ||
            edgesNum === 'Ф' || edgesNum === 'ФЕЙТ' || edgesNum === 'ФЕЙТКОР')
        {
            console.log('Start FateCore-mode');

//create arr of edges for FateCore
        for (let i = 0; i < dicesNum; i++) {
            arrEdges.push(Math.floor(Math.random() * (5 - min +1) + min));
            console.log('arrEdges[i]' + arrEdges[i]);
        }
        console.log('arr-fate before turning into -1, 0, 1: ' + arrEdges);

        for (let y = 0; y < arrEdges.length; y++) {

            if (arrEdges[y] === 0 || arrEdges[y] === 1) {
                arrEdges[y] = -1;
                console.log('edge -1');
            } else if (arrEdges[y] === 2 || arrEdges[y] === 3) {
                arrEdges[y] = 0;
                console.log('edge 0');
            } else if (arrEdges[y] === 4 || arrEdges[y] === 5) {
                arrEdges[y] = 1;
                console.log('edge 1');
            } else {
                console.log('Something goes wrong');
            }
        }
        console.log('arr-fate after turning into -1, 0, 1: ' + arrEdges);

        for (let z = 0; z < arrEdges.length; z++) {
            result += arrEdges[z];
        }
        console.log('result fate: ' + result);
    } else {
//FOR DND
//create arr of DND edges
        for (let i = 0; i < dicesNum; i++) {
            arrEdges.push(Math.floor(Math.random() * (edgesNum - min +1) + min));
        }
        console.log('arr-dnd: ' + arrEdges);

//calculate the resultSum of rolled DND edges
        for (let i = 0; i < arrEdges.length; i++) {
            result += arrEdges[i];
        }
        console.log('result-dnd: ' + result);
    }

    const createResultOutput = () => {
//create div for num of dices
        createSymbol(dicesNum, 'symbol',"dice");

//create div for letter d
        createSymbol('d', 'symbol', 'special-symbol');

//create div for num of edges
        createSymbol(edgesNum, 'symbol','dice');

//create div for symbol ':'
        createSymbol(':', 'symbol','special-symbol');

//create divs for every element of arr
        for (let i = 0; i < arrEdges.length; i++) {
            createSymbol(arrEdges[i], 'symbol','symbol')
        }

//create div for symbol '='
        createSymbol('=', 'symbol','special-symbol')

//create div for result output
        createSymbol(result, 'symbol','result');
    }
        createResultOutput();
        clearInput();
        console.log('final result: ' + result);
    }
}

btn.addEventListener('click', rollDices);