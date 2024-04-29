import { useState } from "react";

export default function Player({ initialName, symbol, isActive , onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if(isEditing){
    onChangeName(symbol ,playerName)
}
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameElement = playerName;

  if (isEditing) {
    playerNameElement = (
      <input
        type="text"
        value={playerName}
        onChange={handleChange}
      />
    );
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <div className="Player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </div>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}



// import { useState } from "react";
// export default function Player({ initialName, symbol , isActive }) {
//   const [playerName, setPlayerName] = useState(initialName);
//   const [isEditing, setIsEditing] = useState(false);

//   function handleEditClick() {
//     setIsEditing((editing) => !editing);
//   }

//   function handleChange(event) {
    
//     setPlayerName(event.target.value);
//   }

//   let editablePlayerName = <span className="player-name">{playerName}</span>;

//   if (isEditing) {
//     editablePlayerName = (
//       <input
//         type="text"required value={playerName} onChange={handleChange}
//       ></input>
//     );
//   }

//   return (
//     <li className={ isActive ? 'active' : undefined }>
//       <span className="Player">
//         {playerName}
//         <span className="player-symbol">{symbol}</span>
//       </span>
//       <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
//     </li>
//   );
// }
