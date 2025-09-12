import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
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
    setIsLoading: (loading: boolean) => void;
    handleAddPlayer: (newPlayer: Player) => Promise<void>;
    handleEdit: (player: Player | null) => void;
    handleDesactivate: (playerId: number, active: boolean) => Promise<void>;
    handleDelete: (playerId: number) => Promise<void>;
    handleToggleMenu: (playerId: number | null) => void;
    handleFilter: (filteredTeam: Player[]) => void;
    handleUpsertPlayer: (player: Player) => void;
    refreshPlayers: () => Promise<void>;
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
    }, [players.length]);

    useEffect(() => {
        setFilteredPlayers(players);
    }, [players]);

    const handleAddPlayer = async (newPlayer: Player) => {
        setIsLoading(true);
        try {
            const createdPlayer = await PlayersService.addPlayer(newPlayer);
            // Actualizar la lista local con la respuesta del backend
            handleUpsertPlayer(createdPlayer);
            toast.success("Jugador agregado correctamente.");
        } catch (error) {
            console.error('Error creating player:', error);
            toast.error('Ocurrió un error al agregar el jugador.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (player: Player | null) => {
        setEditingPlayer(player);
    };

    const handleUpsertPlayer = (savedPlayer: Player) => {
        setPlayers((prev) => {
            const exists = prev.some(p => p.id === savedPlayer.id);
            if (exists) return prev.map(p => (p.id === savedPlayer.id ? savedPlayer : p));
            return [...prev, savedPlayer];
        });
        setFilteredPlayers((prev) => {
            const exists = prev.some(p => p.id === savedPlayer.id);
            if (exists) return prev.map(p => (p.id === savedPlayer.id ? savedPlayer : p));
            return [...prev, savedPlayer];
        });
    };

    const handleDesactivate = async (playerId: number, active: boolean) => {
        setIsLoading(true);
        try {
            // la API no devuelve el jugador, así que actualizamos localmente el flag `active`
            await PlayersService.desactivatePlayer(playerId, active);
            setOpenMenuId(null);
            if (active) {
                toast.success('Jugador restaurado correctamente.');
            } else {
                toast.success('Jugador desactivado correctamente.');
            }
            setPlayers((prev) => prev.map(p => p.id === playerId ? { ...p, active } : p));
            setFilteredPlayers((prev) => prev.map(p => p.id === playerId ? { ...p, active } : p));
        } catch (error) {
            console.error('Error eliminando jugador:', error);
            toast.error('Ocurrió un error al eliminar el jugador.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (playerId: number) => {
        setIsLoading(true);
        try {
            // deletePlayer realiza borrado duro; la API no devuelve entidad, removemos localmente
            await PlayersService.deletePlayer(playerId);
            setOpenMenuId(null);
            setPlayers((prev) => prev.filter(p => p.id !== playerId));
            setFilteredPlayers((prev) => prev.filter(p => p.id !== playerId));
            toast.success('Jugador eliminado correctamente.');

        } catch (error) {
            console.error('Error eliminando jugador:', error);
            toast.error('Ocurrió un error al eliminar el jugador.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleMenu = (playerId: number | null) => {
        setOpenMenuId((prevId) => (prevId === playerId ? null : playerId));
    };

    const handleFilter = (filteredTeam: Player[]) => {
        setFilteredPlayers(filteredTeam);
    };

    const refreshPlayers = useCallback(async () => {
        try {
            setIsLoading(true);
            const fetchedPlayers = await PlayersService.getPlayers();
            setPlayers(fetchedPlayers);
            setFilteredPlayers(fetchedPlayers);
            setError(null);
        } catch (err) {
            console.error('Error refreshing players:', err);
            setError('Error refreshing players');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                players,
                error,
                filteredPlayers,
                editingPlayer,
                openMenuId,
                isLoading,
                setIsLoading,
                    handleAddPlayer,
                handleEdit,
                    handleDesactivate,
                    handleDelete,
                    handleUpsertPlayer,
                handleToggleMenu,
                handleFilter,
                refreshPlayers,
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