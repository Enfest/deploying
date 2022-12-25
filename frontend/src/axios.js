import axios from "axios";

const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "/api"
    : "http://localhost:4000/api";


const instance = axios.create({ baseURL: API_ROOT })

const startGame = async () => {
 const { data: { msg } } = await instance.post('/start')
 return msg
}

const guess = async (number) => {
 try {
   console.log(number);
    const { data: { msg } } = await instance.get('/guess'+'?'+'number='+number)
    return msg
 }
 catch (error) {
   
 }
}
const restart = async () => {
   const { data:{ msg }} = await instance.post('/restart')
   return msg
}

export { startGame, guess, restart }

