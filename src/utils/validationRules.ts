// Archivo para centralizar las reglas de validación

export const validationRules = {
    required: (value: string) => value.trim() !== '',
    email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    minLength: (value: string, length: number) => value.length >= length,
    maxLength: (value: string, length: number) => value.length <= length,
    number: (value: string) => !isNaN(Number(value)),
};

export const validateField = (fieldName: string, value: string, rules: Array<keyof typeof validationRules>, ...args: [number?]) => {
    for (const rule of rules) {
        if (!validationRules[rule](value, ...(args.filter(arg => arg !== undefined) as [number]))) {
            return false;
        }
    }
    return true;
};