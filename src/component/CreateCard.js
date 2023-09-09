import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import "./CreateCard.css";

export const CreateCard = ({
  pokemonData,
  PokemonImages,
  setPokemonImages,
  LoadTime,
  PokemonText,
  setPokemonText,
  PokemonAddressee,
  setPokemonAddressee,
  PokemonSelected,
  setPokemonSelected,
  setShareRuleNote,
  BackGroundColor,
  setBackGroundColor,
}) => {
  const navigate = useNavigate();
  const RandomPokemon = () => {
    let result = [];
    for (let i = 0; i < 6; i++) {
      const RandomNumber = Math.floor(Math.random() * 151);
      const PokemonImage = pokemonData[RandomNumber].sprites.front_default;
      result.push(PokemonImage);
    }
    console.log(result);
    setPokemonSelected(false);
    return setPokemonImages(result);
  };
  const CreateMessage = async (e) => {
    e.preventDefault();
    const uniqueId = crypto.randomUUID();
    await setDoc(doc(db, "PokemonLetter", uniqueId), {
      text: PokemonText,
      PokemonImage: PokemonImages,
      Addressee: PokemonAddressee,
      BackGroundColor: BackGroundColor,
    });
    setPokemonAddressee("");
    setPokemonImages([]);
    setPokemonText("");
    setPokemonSelected(true);
    setShareRuleNote(true);
    const url = `/CreateCard/${uniqueId}`;
    return navigate(url);
  };
  return (
    <div className="Container">
      {LoadTime ? (
        <div className="onRoad">ロード中</div>
      ) : (
        <div className="PokemonContainer">
          <h1>Pokemon Message</h1>

          <div className="WriteMessage">送りたい人の名前(10文字まで)</div>
          <input
            type="text"
            value={PokemonAddressee}
            onChange={(e) => setPokemonAddressee(e.target.value)}
            className="WriteAddresseeArea"
            maxLength="10"
          />
          <div className="WriteMessage">メッセージを書く(20文字まで)</div>
          <textarea
            value={PokemonText}
            onChange={(e) => setPokemonText(e.target.value)}
            className="WriteMessageArea"
            maxLength="20"
          />
          <div>
            <div className="WriteMessage">メッセージの色を選ぶ</div>
            <div>
              <select
                className="colorSelect"
                onChange={(e) => setBackGroundColor(e.target.value)}
              >
                <option value="#ffedb3" className="creamColor">
                  クリーム色
                </option>
                <option value="#ebbce6" className="pinkColor">
                  うすピンク
                </option>
                <option value="#d7f6f7" className="blueColor">
                  うす水色
                </option>
              </select>
            </div>{" "}
            <button className="PokemonSelect" onClick={() => RandomPokemon()}>
              押してポケモンを選ぶ
            </button>
            <div className="PokemonImgContainer">
              {PokemonImages.map((PokemonImage, index) => {
                const className = `PokemonAnime-${index}`;
                return (
                  <img
                    className={`PokemonImages ${className}`}
                    src={PokemonImage}
                    alt="#"
                    key={index}
                  />
                );
              })}
            </div>
          </div>

          {PokemonSelected ? (
            <></>
          ) : (
            <div>
              <button
                className="CompleteButton"
                onClick={(e) => CreateMessage(e)}
              >
                完成
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
