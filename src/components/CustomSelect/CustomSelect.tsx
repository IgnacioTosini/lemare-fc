import './_customSelect.scss';

type CustomSelectProps<T> = {
    type: T;
    selectedValue: string;
    handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    disabledOptions?: string[];
};

export const CustomSelect = <T extends Record<string, string>>({ type, selectedValue, handleChange, name, disabledOptions }: CustomSelectProps<T>) => {
    return (
        <select
            name={name}
            value={selectedValue}
            onChange={handleChange}
        >
            <option value="">Seleccionar</option>
            {Object.values(type)
                .filter((value) => !disabledOptions?.includes(value))
                .map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
        </select>
    );
};
