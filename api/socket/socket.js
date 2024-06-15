import Message from "../models/message.model.js";

export const onConnection = (socket, io) => {
  socket.on("chat-message", async (data) => {
    try {
      const message = new Message({
        userIdSend: data.userIdSend,
        userIdReceive: data.userIdReceive,
        content: data.content,
      });
      await message.save();
      io.emit("chat-message", message); // Emit the message to all connected clients
    } catch (error) {
      console.log("Error sending message:", error);
    }
  });
};
