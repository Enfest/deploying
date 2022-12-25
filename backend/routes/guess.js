import express from 'express'


const router = express.Router()
let ansNumber=0;

router.post('/start', (_, res) => {
    console.log("in");
    genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    const guessNumber=req.query.number;
    console.log(req.query);
    let ifNotNumber=false;
    for ( let i=0; i<guessNumber.length; i++){
        if(isNaN(guessNumber[i])){
            ifNotNumber=true;
        }
    }
    if( guessNumber > 100 || guessNumber < 1 || ifNotNumber ){
        res.send({msg : (guessNumber+" is NOT a legal number (1 - 100)")})
        res.status(406).send({ msg : (guessNumber+" is NOT a legal number (1 - 100)")})
    }
    else if( guessNumber > ansNumber ){
        res.send({ msg : "Smaller"});
    }
    else if( guessNumber < ansNumber ){
        res.send({ msg : "Bigger"});
    }
    else{
        res.send({ msg : "Equal"});
    }
})
// 去 (memory) DB 拿答案的數字
// 用 req.query.number 拿到前端輸入的數字
// check if NOT a num or not in range [1,100]
// 如果有問題 =>
// res.status(406).send({ msg: 'Not a legal number.' }) // 如果沒有問題，回傳 status
router.post('/restart', (_, res) => {
    genNumber();
    console.log("restart: ", ansNumber);
    res.send({ msg : "The game has restarted"});
})

function genNumber(){
    const newNumber=Math.floor(Math.random()*100)+1;
    ansNumber=newNumber;
    console.log(newNumber);
    return;
}

export default router