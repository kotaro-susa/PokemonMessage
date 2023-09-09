import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Home.css";

export const Home = ({
  CreatedPokemonText,
  setCreatedPokemonText,
  CreatedPokemonImages,
  setCreatedPokemonImages,
  DBLoadTime,
  setDBLoadTime,
  CreatedPokemonAddressee,
  setCreatedPokemonAddressee,
  ShareRuleNote,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const PokemonLetter = doc(db, "PokemonLetter", id);
      try {
        const PokemonSnap = await getDoc(PokemonLetter);
        setCreatedPokemonText(PokemonSnap.data().text);
        setCreatedPokemonImages(PokemonSnap.data().PokemonImage);
        setCreatedPokemonAddressee(PokemonSnap.data().Addressee);
        setTimeout(() => {
          const element = document.querySelector(".MessageBox");
          element.style.backgroundColor = PokemonSnap.data().BackGroundColor;
        }, 10);
        setDBLoadTime(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [
    id,
    setCreatedPokemonAddressee,
    setCreatedPokemonImages,
    setCreatedPokemonText,
    setDBLoadTime,
  ]);
  const ReturnPage = () => {
    navigate("/");
  };
  return (
    <>
      {DBLoadTime ? (
        <div className="onRoad">ロード中</div>
      ) : (
        <div className="MessageContainer">
          {ShareRuleNote ? <h4>送りたい相手にURLを共有してね</h4> : <></>}
          <div className="MessageBox">
            <div className="MessageAddressee">{CreatedPokemonAddressee}へ</div>
            <div className="MessageImages">
              <img
                src={CreatedPokemonImages[0]}
                alt="#"
                className="Message-Image PokemonAnime-0"
              />
              <img
                src={CreatedPokemonImages[1]}
                alt="#"
                className="Message-Image PokemonAnime-1"
              />
              <img
                src={CreatedPokemonImages[2]}
                alt="#"
                className="Message-Image PokemonAnime-2"
              />
            </div>
            <div className="MessageContents">{CreatedPokemonText}</div>
            <div className="MessageImages">
              <img
                src={CreatedPokemonImages[3]}
                alt="#"
                className="Message-Image PokemonAnime-1"
              />
              <img
                src={CreatedPokemonImages[4]}
                alt="#"
                className="Message-Image PokemonAnime-2"
              />
              <img
                src={CreatedPokemonImages[5]}
                alt="#"
                className="Message-Image PokemonAnime-0"
              />
            </div>
            <div className="CreateReturnButton" onClick={() => ReturnPage()}>
              新しいメッセージをつくる
            </div>
          </div>
        </div>
      )}
    </>
  );
};
