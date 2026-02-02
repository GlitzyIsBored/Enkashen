import axios from "axios";
import { useEffect, useState } from "react";

function PlayerData() {
  const [array, setArray] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost/EN/601473466");
    setArray(response.data.userInfo);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="container">
      {array.map((user, index) => (
        <div id="section" key={index}>
          {/* <img src={user.profilePic} />*/}
          <img id="banner" src={user.nameCard} />
          <img id="pfp" src="https://enka.network/ui/UI_AvatarIcon_Flins.png" />
          <h2> erm ... </h2>
          <h2>{user.nickname}</h2>
          <p>{user.signature}</p>
          <p>{user.level}</p>
          <p>{user.worldLevel}</p>
        </div>
      ))}
    </div>
  );
}

export default PlayerData;
