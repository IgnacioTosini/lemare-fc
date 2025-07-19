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
                <Field type="number" name="stats.matches" />
                <ErrorMessage name="stats.matches" component="p" className="error" />
            </label>

            <label>
                Tarjetas Amarillas
                <Field type="number" name="stats.yellowCards" />
                <ErrorMessage name="stats.yellowCards" component="p" className="error" />
            </label>

            <label>
                Tarjetas Rojas
                <Field type="number" name="stats.redCards" />
                <ErrorMessage name="stats.redCards" component="p" className="error" />
            </label>
        </section>
    );
};