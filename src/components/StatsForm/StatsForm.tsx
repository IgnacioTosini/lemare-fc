import { ChangeEvent } from 'react';
import { Player } from '../../types';

export const StatsForm = ({ formData, handleChange }: { formData: Player, handleChange: (e: ChangeEvent<HTMLInputElement>) => void }) => (
    <section className="statsForm">
        <label>
            Goles
            <input type="number" name="goals" value={formData.stats?.goals || 0} onChange={handleChange} />
        </label>
        <label>
            Asistencias
            <input type="number" name="assists" value={formData.stats?.assists || 0} onChange={handleChange} />
        </label>
        <label>
            Partidos Jugados
            <input type="number" name="matches" value={formData.stats?.matches || 0} onChange={handleChange} />
        </label>
        <label>
            Tarjetas Amarillas
            <input type="number" name="yellowCards" value={formData.stats?.yellowCards || 0} onChange={handleChange} />
        </label>
        <label>
            Tarjetas Rojas
            <input type="number" name="redCards" value={formData.stats?.redCards || 0} onChange={handleChange} />
        </label>
    </section>
);