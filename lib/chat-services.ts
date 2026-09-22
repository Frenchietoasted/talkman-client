import {type Message} from "./types"
let socket: WebSocket;
export function getCookie(name: string): string | null {
	const cookies = document.cookie.split(";");

	for (const cookie of cookies) {
		const [key, ...value] = cookie.trim().split("=");

		if (key === name) {
			return decodeURIComponent(value.join("="));
		}
	}

	return null;
}

export function connectToRoom() {
	const serverUrl = process.env.NEXT_PUBLIC_WSS_SERVER_URL;

	if (!serverUrl) {
		throw new Error("WebSocket URL is not configured");
	}

	socket = new WebSocket(serverUrl);
	
	socket.addEventListener("open", () => {
		console.log("WebSocket connected");

		const username = getCookie("username");
		const roomId = getCookie("roomId");

		if (!username || !roomId) {
			console.error("Username or roomId cookie missing");
			socket.close();
			return;
		}

    setTimeout(async () => socket.send(
      JSON.stringify({
        type: "join",
        username,
        roomId,
      }),
    ), 4000);
	});

	socket.addEventListener("message", (event) => {
		console.log("Received:", event.data);
	});

	socket.addEventListener("error", (error) => {
		console.error("WebSocket error:", error);
	});

	socket.addEventListener("close", (event) => {
		console.log("WebSocket closed:", event.code, event.reason);
	});

	return socket;
}

export function sendMessage(message : Message) {
	if (!socket || socket.readyState !== WebSocket.OPEN) {
		throw new Error("WebSocket is not connected");
	}

	socket.send(
		JSON.stringify(message),
	);
}

export async function getAllMessages(roomId: string): Promise<Message[]> {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/getAllMessages/${roomId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("getAllMessages failed:", response.status);
      return [];
    }
    const data = await response.json();
    console.log("raw response:", data); // check the actual shape
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.messages)) return data.messages; // adjust to your API
    console.error("unexpected shape:", data);
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}