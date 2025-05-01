import { Player } from "../types";

export async function addPlayer(player: Player) {
    const response = await fetch("http://localhost:3000/jugadores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
    });
    return response.json();
}