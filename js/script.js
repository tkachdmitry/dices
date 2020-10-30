'use strict'
const btn = document.querySelector('.btn');

function rollDices() {
    const dicesNum = +document.querySelector('#dices-num').value;
    const edgesNum = document.querySelector('#edges-num').value;
    const resultDiv = document.querySelector('.result-div');
    const min = 0;
    let result = 0;
    let resultWrong = 'Error: Enter positive integer num';
    let arrEdges = [];

// function playAudio {
    function playAudio () {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = './media/sounds/dice_roll_sound.mp3';
        audio.play();
    }


//function validate FateCore
    function validateFate(edgesNum) {
        return ['f', 'fate', 'fatecore', 'ф', 'фейт', 'фейткор'].includes(edgesNum.toLowerCase());
    }

//create wrapper-div eachResult
    const eachResult = document.createElement('div');
    eachResult.classList.add('each-result');
    resultDiv.appendChild(eachResult);

//function that create input div
    function createSymbol(symbolName, styleName) {
        const symbol = document.createElement('div');
        symbol.classList.add('symbol');
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

//check the validity of the input
    if (dicesNum <=0 || isNaN(dicesNum) || edgesNum <= 0 || isInteger(dicesNum)) {
        createSymbol(resultWrong, 'symbol','result');
        clearInput();
        console.log('Wrong number');
    } else if (!validateFate(edgesNum) && isInteger(edgesNum)) {
        createSymbol(resultWrong, 'symbol','result');
        clearInput();
        console.log("EdgesNum isn't integer");
    } else if (!validateFate(edgesNum) && isNaN(edgesNum)) {
        createSymbol(resultWrong, 'symbol','result');
        clearInput();
        console.log('EdgesNum is NaN');
    } else {
//FOR FateCore
        if (validateFate(edgesNum))
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
            } else if (arrEdges[y] === 2 || arrEdges[y] === 3) {
                arrEdges[y] = 0;
            } else if (arrEdges[y] === 4 || arrEdges[y] === 5) {
                arrEdges[y] = 1;
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
        createSymbol(dicesNum, "dice");
        createSymbol('d', 'special-symbol');
        createSymbol(edgesNum, 'dice');
        createSymbol(':', 'special-symbol');
        for (let i = 0; i < arrEdges.length; i++) {
            createSymbol(arrEdges[i], 'symbol');
        }
        createSymbol('=', 'special-symbol')
        createSymbol(result, 'result');
    }
        playAudio();
        createResultOutput();
        clearInput();
        console.log('final result: ' + result);
    }
}

btn.addEventListener('click', rollDices);