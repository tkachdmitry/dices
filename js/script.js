const btn = document.querySelector('.btn');

const dicesNum = +document.querySelector('#dices-num').value;
const edgesNum = document.querySelector('#edges-num').value;
const resultDiv = document.querySelector('.result-div');
const min = 0;
let result = 0;
let resultWrong = 'Error: Enter positive integer num';
let arrEdges = [];

class myDice {
    constructor() {
        this.dicesNum = dicesNum;
        this.edgesNum = edgesNum;
        this.resultDiv = resultDiv;
        this.result = result;
        this.resultWrong = resultWrong;
        this.arrEdges = arrEdges;
    }

    playAudio() {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = './media/sounds/dice_roll_sound.mp3';
        audio.play();
    }

    validateFate() {
        return ['f', 'fate', 'fatecore', 'ф', 'фейт', 'фейткор'].includes(this.edgesNum.toLowerCase());
    }

    createWrapperDiv () {
        this.eachResult = document.createElement('div');
        this.eachResult.classList.add('each-result');
        this.resultDiv.appendChild(this.eachResult);
    }

    createSymbol (symbolName, styleName) {
        const symbol = document.createElement('div');
        symbol.classList.add('symbol');
        symbol.classList.add(styleName);
        this.eachResult.appendChild(symbol);
        symbol.textContent = symbolName;
    }

    clearInput () {
        document.querySelector('#dices-num').value = '';
        document.querySelector('#edges-num').value = '';
    }

    isInteger (num) {
        return (num % 1 !== 0);
    }

    roll () {
        this.dicesNum = +document.querySelector('#dices-num').value;
        this.edgesNum = document.querySelector('#edges-num').value;
        this.createWrapperDiv();
        if (this.dicesNum <= 0 || isNaN(this.dicesNum) || this.edgesNum <= 0 || this.isInteger(this.dicesNum)) {
            this.createSymbol(this.resultWrong, 'symbol', 'result');
            this.clearInput();
            console.log('Wrong number');
        } else if (!(this.validateFate(this.edgesNum)) && this.isInteger(this.edgesNum)) {
            this.createSymbol(this.resultWrong, 'symbol', 'result');
            this.clearInput();
            console.log("EdgesNum isn't integer");
        } else if (!(this.validateFate(this.edgesNum)) && isNaN(this.edgesNum)) {
            this.createSymbol(this.resultWrong, 'symbol', 'result');
            this.clearInput();
            console.log('EdgesNum is NaN');
        } else {
            if (this.validateFate(this.edgesNum)) {
                console.log('Start FateCore-mode');
                for (let i = 0; i < this.dicesNum; i++) {
                    this.arrEdges.push(Math.floor(Math.random() * (5 - this.min + 1) + this.min));
                    console.log('arrEdges[i]' + this.arrEdges[i]);
                }
                console.log('arr-fate before turning into -1, 0, 1: ' + this.arrEdges);

                for (let y = 0; y < this.arrEdges.length; y++) {

                    if (this.arrEdges[y] === 0 || this.arrEdges[y] === 1) {
                        this.arrEdges[y] = -1;
                    } else if (this.arrEdges[y] === 2 || this.arrEdges[y] === 3) {
                        arrEdges[y] = 0;
                    } else if (this.arrEdges[y] === 4 || this.arrEdges[y] === 5) {
                        this.arrEdges[y] = 1;
                    } else {
                        console.log('Something goes wrong');
                    }
                }
                console.log('arr-fate after turning into -1, 0, 1: ' + this.arrEdges);

                for (let z = 0; z < this.arrEdges.length; z++) {
                    this.result += this.arrEdges[z];
                }
                console.log('result fate: ' + this.result);
            } else {
                for (let i = 0; i < this.dicesNum; i++) {
                    this.arrEdges.push(Math.floor(Math.random() * (this.edgesNum - min + 1) + min));
                }
                console.log('arr-dnd: ' + this.arrEdges);

                for (let i = 0; i < this.arrEdges.length; i++) {
                    this.result += this.arrEdges[i];
                }
                console.log('result-dnd: ' + this.result);
            }
            this.createResultOutput();
        }
    }
     createResultOutput  ()  {
        this.createSymbol(this.dicesNum, "dice");
        this.createSymbol('d', 'special-symbol');
        this.createSymbol(this.edgesNum, 'dice');
        this.createSymbol(':', 'special-symbol');
        for (let i = 0; i < this.arrEdges.length; i++) {
            this.createSymbol(this.arrEdges[i], 'symbol');
        }
        this.createSymbol('=', 'special-symbol')
        this.createSymbol(this.result, 'result');

        this.clearInput();
        this.playAudio();
        this.arrEdges.length = 0;
    }
}

function throwingDices() {
    let dice = new myDice(dicesNum, edgesNum);
    dice.roll();
}

btn.addEventListener('click', throwingDices);
