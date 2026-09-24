import {type Message} from "./types"
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
    if (Array.isArray(data?.messages)) return data.messages;
    console.error("unexpected shape:", data);
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}