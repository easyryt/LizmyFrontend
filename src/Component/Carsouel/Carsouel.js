import { v4 as uuidv4 } from "uuid";
import React from "react"
import { Link } from "react-router-dom";
import Carroussel from "./Carroussel";
import { CardTempletes1, CardTempletes10, CardTempletes11, CardTempletes12, CardTempletes13, CardTempletes14, CardTempletes15, CardTempletes16, CardTempletes17, CardTempletes18, CardTempletes19, CardTempletes2, CardTempletes20, CardTempletes21, CardTempletes22, CardTempletes23, CardTempletes24, CardTempletes25, CardTempletes26, CardTempletes27, CardTempletes28, CardTempletes29, CardTempletes3, CardTempletes30, CardTempletes4, CardTempletes5, CardTempletes6, CardTempletes7, CardTempletes8, CardTempletes9 } from "./CardTempletes";




export default function Carsouel() {
  let cards = [
    {
      key: uuidv4(),
      content: <CardTempletes1 />
    },
    {
      key: uuidv4(),
      content:  <CardTempletes2 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes4 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes5 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes6 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes7 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes8 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes9 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes10 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes11 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes12 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes13 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes14 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes15 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes16 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes17 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes18 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes19 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes20 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes21 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes22 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes23 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes24 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes25 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes26 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes27 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes28 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes29 />
    },
    {
      key: uuidv4(),
      content: <CardTempletes30 />
    },

  
  ]; 



  return (
    <div className="App">
      <Carroussel
        cards={cards}
        height="500px"
        width="100%"
        margin="0 auto"
        offset={2}
        showArrows={false}
      />
    </div>
  );
}