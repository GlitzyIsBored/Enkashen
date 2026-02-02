import express from "express";
import cors from "cors";
import { EnkaNetwork } from "enkanetwork";

const app = express();
const port = 80;
const enka = new EnkaNetwork();

//playertest
let uid = "601473466";
const user = await enka.fetchUser(uid);
// I hope cors dies i hate it so mcuh
const corsOptions = {
  origin: ["http://localhost/EN/601473466"],
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/:language/:uid", async (req, res) => {
  res.json({
    userInfo: [
      {
        nickname: `${user.player.nickname}`,
        signature: `${user.player.signature}`,
        level: `Adventure Rank: ${user.player.level}`,
        worldLevel: `World level: ${user.player.worldLevel}`,
        achievements: `${user.player.achievements}`,
        //profilePic: `${user.player.profilePicture.icon}`,
        nameCard: `${user.player.nameCard.banner}`,
      },
    ],
  });
  const { language, uid } = req.params;

  try {
    const data = await enka.fetchUser(uid, language);

    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

await enka.assetsUpdater.fetchAssets();
app.listen(port, () =>
  console.log(
    `[SERVER] Server listening on port ${port}, link for UID ${uid}\nhttp://localhost/EN/${uid}`,
  ),
);
// http://localhost/EN/601473466
