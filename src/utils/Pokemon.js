import axios from "axios";
// 遊戯王APIインスタンスの作成
export const instance = axios.create({
  baseURL:"https://pokeapi.co/api/v2/pokemon",
});

