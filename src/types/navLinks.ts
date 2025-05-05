export enum NavLinks {
    INICIO = 'Inicio',
    PLANTEL = 'Plantel',
    PARTIDOS = 'Partidos',
    MULTIMEDIA = 'Multimedia',
    QUIENES_SOMOS = 'Quienes Somos'
}

export const navLinks = [
    { label: NavLinks.INICIO, to: '/' },
    { label: NavLinks.PLANTEL, to: '/plantel' },
    { label: NavLinks.PARTIDOS, to: '/partidos' },
    { label: NavLinks.MULTIMEDIA, to: '/multimedia' },
    { label: NavLinks.QUIENES_SOMOS, to: '/quienes-somos' }
];