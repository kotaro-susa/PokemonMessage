import { useEffect, useState } from "react";
import "./App.css";
import { instance } from "./utils/Pokemon";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateCard } from "./component/CreateCard";
import { Home } from "./component/Home";
import axios from "axios";

function App() {
  // PokeAPIから取得したデータを格納します
  const [pokemonData, setPokemonData] = useState([]);
  // ランダムで選ばれた6枚のポケモンの画像を格納しています
  const [PokemonImages, setPokemonImages] = useState([]);
  const [CreatedPokemonImages, setCreatedPokemonImages] = useState([]);
  // ロードが完了するとfalseに変更　メッセージ作成ページの制御に使います。
  const [LoadTime, setLoadTime] = useState(true);
  const [DBLoadTime, setDBLoadTime] = useState(true);
  // ポケモンを選ぶを押すとfalseになります。
  const [PokemonSelected, setPokemonSelected] = useState(true);
  // 作成したメッセージを格納しています。
  const [PokemonText, setPokemonText] = useState("");
  const [CreatedPokemonText, setCreatedPokemonText] = useState("");
  // 作成したメッセージの宛先を格納しています。
  const [PokemonAddressee, setPokemonAddressee] = useState("");
  const [CreatedPokemonAddressee, setCreatedPokemonAddressee] = useState("");
  // URL共有からページに飛んだ場合とそうでない場合で挙動(URL共有の注意)を変えます。
  const [ShareRuleNote, setShareRuleNote] = useState(false);
  // 背景色の設定
  const [BackGroundColor, setBackGroundColor] = useState("");
  // PokemonAPIから画像情報を取得
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await instance.get("/?limit=151");
        await LoadPokemonData(res.data.results);
        setLoadTime(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemonData();
  }, []);

  const LoadPokemonData = async (data) => {
    const _PokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let PokemonRecord = await axios.get(pokemon.url);
        // console.log(PokemonRecord.data);
        return PokemonRecord.data;
      })
    );
    setPokemonData(_PokemonData);
  };

  return (
    <div className="allContainer">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <CreateCard
                pokemonData={pokemonData}
                setPokemonImages={setPokemonImages}
                LoadTime={LoadTime}
                PokemonImages={PokemonImages}
                PokemonText={PokemonText}
                setPokemonText={setPokemonText}
                PokemonAddressee={PokemonAddressee}
                setPokemonAddressee={setPokemonAddressee}
                PokemonSelected={PokemonSelected}
                setPokemonSelected={setPokemonSelected}
                setShareRuleNote={setShareRuleNote}
                BackGroundColor={BackGroundColor}
                setBackGroundColor={setBackGroundColor}
              />
            }
          ></Route>
          <Route
            path="/CreateCard/:id"
            element={
              <Home
                CreatedPokemonText={CreatedPokemonText}
                setCreatedPokemonText={setCreatedPokemonText}
                CreatedPokemonImages={CreatedPokemonImages}
                setCreatedPokemonImages={setCreatedPokemonImages}
                DBLoadTime={DBLoadTime}
                setDBLoadTime={setDBLoadTime}
                CreatedPokemonAddressee={CreatedPokemonAddressee}
                setCreatedPokemonAddressee={setCreatedPokemonAddressee}
                ShareRuleNote={ShareRuleNote}
                setShareRuleNote={setShareRuleNote}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
