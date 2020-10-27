'use strict'
const btn = document.querySelector('.btn');
const resultDiv = document.querySelector('.result-div');

function rollDices() {

    const min = 0;
    let dicesNum = +document.querySelector('#dices-num').value;
    let edgesNum = document.querySelector('#edges-num').value;
    let result = 0;
    let arr = [];

//check the validity of the input
//     if (dicesNum <= 0 || isNaN(dicesNum) || edgesNum != 'f' ||
//         edgesNum != 'fate' || edgesNum != 'fatecore' ||
//         edgesNum != 'F' || edgesNum != 'FATE' || edgesNum != 'FATECORE' ||
//         edgesNum != 'Ф' || edgesNum != 'ФЕЙТ' || edgesNum != 'ФЕЙТКОР'
//         && isNaN(edgesNum)) {
//         result = "Don't play with me";
//     }

//FOR FateCore
    console.log('edgesNum: ' + edgesNum);
    if (edgesNum == 'f' || edgesNum == 'fate' || edgesNum == 'fatecore' ||
        edgesNum == 'F' || edgesNum == 'FATE' || edgesNum == 'FATECORE' ||
        edgesNum == 'Ф' || edgesNum == 'ФЕЙТ' || edgesNum == 'ФЕЙТКОР') {
        console.log('Включился режим FateCore');

//create arr of edges for FateCore
        for (let i = 0; i < dicesNum; i++) {
            arr.push(Math.floor(Math.random() * (5 - min +1) + min));
            console.log('are[i]' + arr[i]);
        }
        console.log('arr-fate before turning into -1, 0, 1: ' + arr);

        for (let y = 0; y < arr.length; y++) {

            if (arr[y] == 0 || arr[y] == 1) {
                arr[y] = -1;
                console.log('edge -1');
            } else if (arr[y] == 2 || arr[y] == 3) {
                arr[y] = 0;
                console.log('edge 0');
            } else if (arr[y] == 4 || arr[y] == 5) {
                arr[y] = 1;
                console.log('edge 1');
            } else {
                console.log('Something goes wrong');
            }
        }
        console.log('arr-fate after turning into -1, 0, 1: ' + arr);

        for (let z = 0; z < arr.length; z++) {
            result += arr[z];
        }
        console.log('result fate: ' + result);
    } else {
//FOR DND
//create arr of DND edges

        for (let i = 0; i < dicesNum; i++) {
            arr.push(Math.floor(Math.random() * (edgesNum - min +1) + min));
        }
        console.log('arr-dnd: ' + arr);

//calculate the resultSum of rolled DND edges
        for (let i = 0; i < arr.length; i++) {
            result += arr[i];
        }
        console.log('result-dnd: ' + result);
    }

    const createResultOutput = (value) => {
//create wrapper-div eachResult
        const eachResult = document.createElement('div');
        eachResult.classList.add('each-result');
        const d = resultDiv.appendChild(eachResult);
        console.log('eachResult: ' + eachResult);

//create div for num of dices
        createSymbol(dicesNum);

//create div for letter d
        createSymbol('d');

//create div for num of edges
        createSymbol(edgesNum);

//create div list-of-edges for every element of arr
        for (let i = 0; i < arr.length; i++) {
            createSymbol(arr[i])
        }


//create div for symbol '='
        createSymbol('=')

//create div for result output
        createSymbol(result);

//function that create input div
        function createSymbol(v) {
            const symbol = document.createElement('div');
            symbol.classList.add('symbol');
            const z = eachResult.appendChild(symbol);
            symbol.textContent = v;
        }
    }
    createResultOutput(result);

// clear input value
    document.querySelector('#dices-num').value = '';
    document.querySelector('#edges-num').value = '';

    console.log('final result: ' + result);
}

btn.addEventListener('click', rollDices);