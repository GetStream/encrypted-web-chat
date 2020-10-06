import React, { useContext } from "react";
import { MessageInputLarge, ChannelContext } from "stream-chat-react";
import encrypt from "../lib/encrypt";

export default (props) => {
  const channelContext = useContext(ChannelContext);
  const sendMessage = async (message, channelCid) => {
    const newMessage = {
      ...message,
      text: await encrypt(message.text, props.derivedKey),
    };

    await channelContext.channel.sendMessage(newMessage);
  };

  return <MessageInputLarge overrideSubmitHandler={sendMessage} {...props} />;
};
