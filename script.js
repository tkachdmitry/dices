'use strict'
const btn = document.querySelector('.btn');
const resultDiv = document.querySelector('.result-div');
let sumDices = 0;

function rollDices() {

    const min = 0;
    let dicesNum = +document.querySelector('#dices-num').value;
    let edgesNum = +document.querySelector('#edges-num').value;
    let result = 0;
    let resultSum = 0;
    let dice = 0;
    let arr = [];

//check the validity of the input
    if (dicesNum <=0 || edgesNum <= 0 || dicesNum == NaN || edgesNum == NaN) {
        result = "Don't play with me";
    }

    for (let i = 0; i < dicesNum; i++) {
        arr.push(Math.floor(Math.random() * (edgesNum - min) + min));
    }
//calculating the resultSum of rolled edges
    for (let i = 0; i < arr.length; i++) {
        result += arr[i];
    }

    const createResultOutput = (value) => {
//create wrapper-div eachResult
        const eachResult = document.createElement('div');
        eachResult.classList.add('each-result');
        const d = resultDiv.appendChild(eachResult);

//create div for num of dices
        const outputNumOfDices = document.createElement('div');
        outputNumOfDices.classList.add('symbol');
        const e = eachResult.appendChild(outputNumOfDices);
        outputNumOfDices.textContent = dicesNum;
//create div for letter d
        const symbolD = document.createElement('div');
        symbolD.classList.add('symbol');
        const f = eachResult.appendChild(symbolD);
        symbolD.textContent = 'd';
//create div for num of edges
        const outputNumOfEdges = document.createElement('div');
        outputNumOfEdges.classList.add('symbol');
        const g = eachResult.appendChild(outputNumOfEdges);
        outputNumOfEdges.textContent = edgesNum;

//create div list-of-edges for every element of arr
        for (let i = 0; i < arr.length; i++) {
            const listOfEdges = document.createElement('div');
            listOfEdges.classList.add('list-of-edges');
            const a = listOfEdges.textContent = i;
            const b = eachResult.appendChild(listOfEdges);
        }

//create div for symbol '='
        const symbolEqual = document.createElement('div');
        symbolEqual.classList.add('symbol');
        const i = eachResult.appendChild(symbolEqual);
        symbolEqual.textContent = '=';

//create div sumOptput for sum of roll
        const sumOutput = document.createElement('div');
        sumOutput.classList.add('sum-output');
        const c = eachResult.appendChild(sumOutput);
        sumOutput.textContent = value;
    }
    createResultOutput(result);

// clear input value
    document.querySelector('#dices-num').value = '';
    document.querySelector('#edges-num').value = '';

    console.log('result: ' + result);
}

btn.addEventListener('click', rollDices);