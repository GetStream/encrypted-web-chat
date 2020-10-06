import React, { useEffect, useState, memo } from "react";
import {
  Chat,
  Channel,
  ChannelHeader,
  Thread,
  Window,
  Message,
} from "stream-chat-react";
import { MessageList, MessageInput, SendButton } from "stream-chat-react";

import chatClient from "../lib/chatClient";

import "stream-chat-react/dist/css/index.css";
import EncryptedMessage from "./EncryptedMessage";
import EncryptedMessageInput from "./EncryptedMessageInput";

export default (props) => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    setChannel(
      chatClient.channel("messaging", {
        members: [props.sender.sender, props.recipient.recipient],
      })
    );
  }, [props]);

  if (!channel) return <div>Loading...</div>;

  return (
    <Chat client={chatClient} theme={"messaging light"}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList
            Message={(e) => (
              <EncryptedMessage {...e} derivedKey={props.derivedKey} />
            )}
          />
          <EncryptedMessageInput derivedKey={props.derivedKey} />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};
