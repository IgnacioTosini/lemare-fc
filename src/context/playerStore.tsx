import React, { createContext, useState, useEffect, useContext } from 'react';
import { Player } from '../types';
import { PlayersService } from '../services/PlayersServices';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type PlayerContextProps = {
    players: Player[];
    error: string | null;
    filteredPlayers: Player[];
    editingPlayer: Player | null;
    openMenuId: number | null;
    isLoading: boolean;
    handleAddPlayer: (newPlayer: Player) => Promise<void>;
    handleEdit: (player: Player | null) => void;
    handleSave: (editPlayer: Player) => Promise<void>;
    handleDelete: (playerId: number) => Promise<void>;
    handleToggleMenu: (playerId: number | null) => void;
    handleFilter: (filteredTeam: Player[]) => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setIsLoading(true);
                const fetchedPlayers = await PlayersService.getPlayers();
                setPlayers(fetchedPlayers);
                setFilteredPlayers(fetchedPlayers);
            } catch (err) {
                console.error('Error fetching players:', err);
                setError('Error fetching players');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayers();
    }, []);

    useEffect(() => {
        setFilteredPlayers(players);
    }, [players]);

    const handleAddPlayer = async (newPlayer: Player) => {
        setIsLoading(true);
        try {
            const createdPlayer = await PlayersService.addPlayer(newPlayer);
            if (!createdPlayer) {
                throw new Error('Failed to create player');
            }
            setPlayers((prevPlayers) => [...prevPlayers, createdPlayer]);
            setFilteredPlayers((prevPlayers) => [...prevPlayers, createdPlayer]);
            toast.success('Jugador agregado correctamente.');
            setIsLoading(false);
        } catch (error) {
            console.error('Error creating player:', error);
            toast.error('Ocurrió un error al agregar el jugador.');
        }
    };

    const handleEdit = (player: Player | null) => {
        setEditingPlayer(player);
    };

    const handleSave = async (editPlayer: Player) => {
        setIsLoading(true);
        try {
            const response = await PlayersService.updatePlayer(editPlayer);
            const updatedPlayer = response.data; // Extraer el jugador actualizado de la propiedad 'data'

            // Obtener datos completos del jugador actualizado
            const fullPlayer = await PlayersService.getPlayerById(updatedPlayer.id);

            setPlayers((prevPlayers) =>
                prevPlayers.map((player) => (player.id === fullPlayer.id ? fullPlayer : player))
            );
            setFilteredPlayers((prevPlayers) =>
                prevPlayers.map((player) => (player.id === fullPlayer.id ? fullPlayer : player))
            );
            setEditingPlayer(null);
            toast.success('Jugador actualizado correctamente.');
            setOpenMenuId(null);
            setIsLoading(false);
        } catch (error) {
            console.error('Error updating player:', error);
            toast.error('Ocurrió un error al actualizar el jugador.');
        }
    };

    const handleDelete = async (playerId: number) => {
        setIsLoading(true);
        try {
            await PlayersService.deletePlayer(playerId);
            setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId));
            setFilteredPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== playerId));
            setOpenMenuId(null);
            toast.success('Jugador eliminado correctamente.');
            setIsLoading(false);
        } catch (error) {
            console.error('Error eliminando jugador:', error);
            toast.error('Ocurrió un error al eliminar el jugador.');
        }
    };

    const handleToggleMenu = (playerId: number | null) => {
        setOpenMenuId((prevId) => (prevId === playerId ? null : playerId));
    };

    const handleFilter = (filteredTeam: Player[]) => {
        setFilteredPlayers(filteredTeam);
    };

    return (
        <PlayerContext.Provider
            value={{
                players,
                error,
                filteredPlayers,
                editingPlayer,
                openMenuId,
                isLoading,
                handleAddPlayer,
                handleEdit,
                handleSave,
                handleDelete,
                handleToggleMenu,
                handleFilter,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayerContext must be used within a PlayerProvider');
    }
    return context;
};