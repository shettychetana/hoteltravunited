let socket;

export const initSocket = () => {
  socket = new WebSocket("ws://localhost:3000/ws");

  socket.onopen = () => {
    console.log("✅ WebSocket connected!");
    socket.send("Hello Server!");
  };

  socket.onmessage = (event) => {
    console.log("📩 Message from server:", event.data);
  };

  socket.onerror = (error) => {
    console.error("❌ WebSocket Error:", error);
  };

  socket.onclose = () => {
    console.log("🔌 WebSocket Disconnected");
  };

  return socket;
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
    console.log("📤 Sent message:", message);
  } else {
    console.error("🚫 WebSocket is not connected.");
  }
};

export const closeSocket = () => {
  if (socket) {
    socket.close();
    console.log("🔴 WebSocket closed");
  }
};
