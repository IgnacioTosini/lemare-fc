import { ChangeEvent } from 'react';
import { Player } from '../../types';

type StatsChangeEvent = {
    target: {
        name: string;
        value: {
            goals: number;
            assists: number;
            matches: number;
            yellowCards: number;
            redCards: number;
        };
    };
};

export const StatsForm = ({ formData, handleChange }: { formData: Player, handleChange: (e: ChangeEvent<HTMLInputElement> | StatsChangeEvent) => void }) => {
    const handleStatsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedStats = {
            ...formData.stats,
            [name]: Number(value),
        };
        handleChange({
            target: {
                name: 'stats',
                value: updatedStats,
            },
        });
    };

    return (
        <section className="statsForm">
            <label>
                Goles
                <input type="number" name="goals" value={formData.stats?.goals || 0} onChange={handleStatsChange} />
                {formData.stats?.goals < 0 && <p className="error">El número de goles no puede ser negativo.</p>}
            </label>
            <label>
                Asistencias
                <input type="number" name="assists" value={formData.stats?.assists || 0} onChange={handleStatsChange} />
                {formData.stats?.assists < 0 && <p className="error">El número de asistencias no puede ser negativo.</p>}
            </label>
            <label>
                Partidos Jugados
                <input type="number" name="matches" value={formData.stats?.matches || 0} onChange={handleStatsChange} />
                {formData.stats?.matches < 0 && <p className="error">El número de partidos no puede ser negativo.</p>}
            </label>
            <label>
                Tarjetas Amarillas
                <input type="number" name="yellowCards" value={formData.stats?.yellowCards || 0} onChange={handleStatsChange} />
                {formData.stats?.yellowCards < 0 && <p className="error">El número de tarjetas amarillas no puede ser negativo.</p>}
            </label>
            <label>
                Tarjetas Rojas
                <input type="number" name="redCards" value={formData.stats?.redCards || 0} onChange={handleStatsChange} />
                {formData.stats?.redCards < 0 && <p className="error">El número de tarjetas rojas no puede ser negativo.</p>}
            </label>
        </section>
    );
};