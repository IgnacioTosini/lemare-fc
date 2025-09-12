import { Field, ErrorMessage } from 'formik';

export const StatsForm = () => {
    return (
        <section className="statsForm">
            <label>
                Goles
                <Field type="number" name="stats.goals" />
                <ErrorMessage name="stats.goals" component="p" className="error" />
            </label>

            <label>
                Asistencias
                <Field type="number" name="stats.assists" />
                <ErrorMessage name="stats.assists" component="p" className="error" />
            </label>

            <label>
                Partidos Jugados
                <Field type="number" name="stats.matchesPlayed" />
                <ErrorMessage name="stats.matchesPlayed" component="p" className="error" />
            </label>

            <label>
                Tarjetas Amarillas
                <Field type="number" name="stats.yellow_cards" />
                <ErrorMessage name="stats.yellow_cards" component="p" className="error" />
            </label>

            <label>
                Tarjetas Rojas
                <Field type="number" name="stats.red_cards" />
                <ErrorMessage name="stats.red_cards" component="p" className="error" />
            </label>
        </section>
    );
};