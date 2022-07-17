import React, { useState, useRef } from "react";
import {
  Paper,
  Grid,
  Divider,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab,
} from "@mui/material";
import { Send } from "@mui/icons-material";



const initialBots = [
  {
    id: "happy-bot",
    name: "Happy Bot",
    avatar:
      "https://media.istockphoto.com/photos/happy-man-wishing-good-luck-isolated-picture-id175174559?k=20&m=175174559&s=170667a&w=0&h=1Y1zUiQQEjyvSBENtFcKWLYaakDSydcHUc9FyGr4ofE=",
    replies: ["I am fine", "I am good", "I am great"],
    chat: [{ text: "Hello", time: Date.now(), align: "left" }],
  },
  {
    id: "angry-bot",
    name: "Angry Bot",
    avatar:
      "https://i0.wp.com/www.filmloverss.com/wp-content/uploads/2019/02/henry-fonda-FilmLoverss.jpg?resize=750%2C500&ssl=1",
    replies: ["I am angry", "I am mad", "I am sad"],
    chat: [{ text: "What?", time: Date.now(), align: "left" }],
  },
  {
    id: "kind-bot",
    name: "Kind Bot",
    avatar: "https://d3b3by4navws1f.cloudfront.net/shutterstock_315520139.jpg",
    replies: ["I am kind", "I am nice", "I am good"],
    chat: [{ text: "Welcome", time: Date.now(), align: "left" }],
  },
];

const Chat = () => {
  const [bots, setBots] = useState(initialBots);
  const [selectedBot, setSelectedBot] = useState(initialBots[0].id);
  const [message, setMessage] = useState("");
  const botRef = useRef(null);
  botRef.current = selectedBot;

  const handleSelectBot = (botid) => {
    setTimeout(() => {
      const bot = bots.find((bot) => bot.id === botid);
      const newChat = bot.chat.map((chat) => ({
        ...chat,
        highlight: false,
      }));
      const newBot = { ...bot, chat: newChat };
      setMessage("");

      const newBots = bots.map((bot) => (bot.id === botid ? newBot : bot));
      setBots(newBots);
    }, 1000);
    setSelectedBot(botid);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleReply = (botid, newBots) => {
    setTimeout(() => {
      const autoBots = newBots.map((bot) => {
        if (bot.id === botid) {
          bot.chat.push({
            text: bot.replies[Math.floor(Math.random() * 3)],
            time: Date.now(),
            align: "left",
            highlight: botRef.current === botid ? false : true,
          });
        }
        console.log(bot.chat);
        return bot;
      });
      setBots(autoBots);
      setMessage("");
    }, 3000);
  };

  const handleOnclick = (event) => {
    event.preventDefault();
    const bot = bots.find((bot) => bot.id === selectedBot);
    const newChat = [
      ...bot.chat,
      { text: message, time: Date.now(), align: "right" },
    ];
    const newBot = { ...bot, chat: newChat };
    setMessage("");
    setSelectedBot(bot.id);
    const newBots = bots.map((bot) => (bot.id === selectedBot ? newBot : bot));

    setBots(newBots);

    handleReply(bot.id, newBots);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ background: "#0a80d770" }}>
          <Typography variant="h4" className="header-message">
            <div
              style={{
                color: "#b41c2a",
                display: "flex",
                justifyContent: "center",
                fontSize: "3.5rem",
                // fontFamily: "Patua One",
              }}
            >
              💬 TM Chat App 💬
            </div>
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        component={Paper}
        style={{ width: "100%", height: "80vh" }}
      >
        <Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
          <List>
            <ListItem button key="You" style={{ backgroundColor: "#ff000070" }}>
              <ListItemIcon>
                <Avatar src="https://www.bancaditalia.it/dotAsset/a25ad0c1-22f2-41a4-8f15-bc81d578a0d8">
                  You{" "}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="You"></ListItemText>
            </ListItem>
          </List>
          <Divider />

          <Divider />
          <List>
            {bots.map((bot) => {
              return (
                <ListItem
                  style={{
                    backgroundColor:
                      bot.id === selectedBot ? "#0a80d7ab" : "white",
                  }}
                  button
                  key={bot.id}
                  onClick={handleSelectBot.bind(this, bot.id)}
                >
                  <ListItemIcon>
                    <Avatar alt={bot.name} src={bot.avatar} />
                  </ListItemIcon>
                  <ListItemText primary={bot.name}>{bot.name}</ListItemText>
                  <ListItemText secondary="online" align="right"></ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List style={{ height: "70vh", overflowY: "auto" }}>
            {bots
              .find((bot) => bot.id === selectedBot)
              .chat.map((message) => {
                return (
                  <ListItem
                    key="1"
                    style={{
                      backgroundColor: message.highlight
                        ? "#0a80d7ab"
                        : "white",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItem key={message.time}>
                          <ListItemText
                            primary={message.text}
                            align={message.align}
                          />
                        </ListItem>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align={message.align}
                          secondary={new Date(
                            message.time
                          ).toLocaleTimeString()}
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
          </List>
          <Divider />
          <Grid
            container
            style={{ padding: "2px", backgroundColor: "#eaeaea75" }}
          >
            <Grid item xs={11}>
              <TextField
                onChange={handleMessageChange}
                id="outlined-basic-email"
                label="Send Something"
                fullWidth
                value={message}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab
                style={{ backgroundColor: "#00c87e" }}
                color="primary"
                aria-label="add"
                onClick={handleOnclick}
              >
                <Send />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
