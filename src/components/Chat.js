import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
});

const initialBots = [
  {
    id: "happy-bot",
    name: "Happy Bot",
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
    replies: ["I am fine", "I am good", "I am great"],
    chat: [{ text: "Hello", time: Date.now(), align: "left" }],
  },
  {
    id: "angry-bot",
    name: "Angry Bot",
    avatar: "https://material-ui.com/static/images/avatar/2.jpg",
    replies: ["I am angry", "I am mad", "I am sad"],
    chat: [{ text: "What?", time: Date.now(), align: "left" }],
  },
  {
    id: "kind-bot",
    name: "Kind Bot",
    avatar: "https://material-ui.com/static/images/avatar/3.jpg",
    replies: ["I am kind", "I am nice", "I am good"],
    chat: [{ text: "Welcome", time: Date.now(), align: "left" }],
  },
];

const Chat = () => {
  const [bots, setBots] = useState(initialBots);
  const [search, setSearch] = useState("");
  const [selectedBot, setSelectedBot] = useState(initialBots[0].id);
  const [message, setMessage] = useState("");
  const classes = useStyles();
  const botRef = useRef(null);
  botRef.current = selectedBot;

  const handleOnchange = (event) => {
    setSearch(event.target.value);
  };

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
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message">
            💬 TM Chat App
          </Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="Boris Johnson">
              <ListItemIcon>
                <Avatar
                  alt="Boris Johnson"
                  src={"https://material-ui.com/static/images/avatar/1.jpg"}
                />
              </ListItemIcon>
              <ListItemText primary="John Wick"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
              onChange={handleOnchange}
            />
          </Grid>
          <Divider />
          <List>
            {bots.map((bot) => {
              return (
                <ListItem
                  style={{
                    backgroundColor:
                      bot.id === selectedBot ? "#e0e0e0" : "white",
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
          <List className={classes.messageArea}>
            {bots
              .find((bot) => bot.id === selectedBot)
              .chat.map((message) => {
                return (
                  <ListItem
                    key="1"
                    style={{
                      backgroundColor: message.highlight ? "#e0e0e0" : "white",
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
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                onChange={handleMessageChange}
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
                value={message}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add" onClick={handleOnclick}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  
      
    </div>
  );
};

export default Chat;
