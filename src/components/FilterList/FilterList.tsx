import { useState } from 'react';
import { Player } from '../../types';
import { IoMdSearch } from "react-icons/io";
import { GoPlus } from "react-icons/go";
import { Position } from '../../types/positions';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { ModalForm } from '../ModalForm/ModalForm';
import './_filterList.scss';

type FilterListProps = {
    team: Player[];
    onFilter: (filteredTeam: Player[]) => void;
};

export const FilterList = ({ team, onFilter }: FilterListProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchValue(value);
        applyFilters(value, selectedPosition);
    };

    const handlePositionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedPosition(value);
        applyFilters(searchValue, value);
    };

    const handleAddPlayer = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const applyFilters = (search: string, position: string) => {
        const filteredTeam = team.filter(player => {
            const matchesSearch = player.name.toLowerCase().includes(search);
            const matchesPosition = position ? player.position === position : true;
            return matchesSearch && matchesPosition;
        });
        onFilter(filteredTeam);
    };

    return (
        <div className='filterList'>
            <section className='searchContainer'>
                <IoMdSearch className='searchIcon' />
                <input
                    type="text"
                    className='searchInput'
                    placeholder="Buscar Jugador/Staff"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </section>

            <section className='filterContainer'>
                <CustomSelect
                    type={Position}
                    selectedValue={selectedPosition}
                    handleChange={handlePositionChange}
                    name="position"
                />

                <button className='addPlayer' aria-label='Add Player' onClick={handleAddPlayer}><GoPlus className='plusIcon' /><p>Añadir Jugador</p></button>
            </section>

            {isModalOpen && (
                <ModalForm onClose={handleCloseModal} onSave={(player) => console.log('Player saved:', player)} />
            )}
        </div>
    );
};
