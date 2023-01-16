const word=document.getElementById('word');
const text=document.getElementById('text');
const scoreEl=document.getElementById('score');
const timeEl=document.getElementById('time');
const endgameEl=document.getElementById('end-game-container');
const settingsBtn=document.getElementById('settings-btn');
const settings=document.getElementById('settings');
const settingsForm=document.getElementById('settings-form');
const difficultySelect=document.getElementById('difficulty');

const words = [
    'loving',
    'drag',
    'admit',
    'eight',
    'silver',
    'orange',
    'steer',
    'ball',
    'sigh',
    'tense',
    'pies',
    'juice',
    'bad',
    'cool',
    'light',
    'feeling',
    'superficial',
    'dependent',
    'bts'
];

let randomWord;
let score=0;
let time=10;

text.focus();

const timeInterval=setInterval(updateTime,1000);
function getRandomWord(){
    return words[Math.floor(Math.random()* words.length)];
}

function addWordToDom(){
    randomWord=getRandomWord();
    word.innerHTML=randomWord;
    //console.log(randomWord); 글씨가 f5번 누를 때 랜덤으로 변하는지 확인용
}

//점수 
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

//시간
function updateTime(){
    time--;
    timeEl.innerHTML=time+'s';
    if(time===0){
        clearInterval(timeInterval);
        gameOver();
    }
}
function gameOver(){
    endgameEl.innerHTML =`
    <h1>Time run out</h1>
    <p>You final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display='flex';
}

// 내가 쓴 글자랑 랜덤 글자가 일치하는지
// 일치하면 점수 1씩 증가

text.addEventListener('input', e =>{
    const insertedText=e.target.value;


    if(insertedText===randomWord){
        updateScore();
        addWordToDom();

        //clear
        e.target.value='';
        if(difficultySelect==='hard'){
            time += 2;
        }else if(difficultySelect==='medium'){
            time += 3;
        }else{
            time += 5;
        }
        updateTime();
    }
});

addWordToDom();

settingsBtn.addEventListener('click',() => settings.classList.toggle('hide'))



