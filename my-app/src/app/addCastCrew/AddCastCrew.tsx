"use client";
import styles from './AddCastCrew.module.css';
import AdminNavbar from '../components/AdminNavbar';
import { useState } from 'react';
import Link from 'next/link';

interface CastCrewMember {
    name: string;
    role: string;
}

interface AddCastCrewProps {
    setShowModal: (show: boolean) => void;
    castCrew: CastCrewMember[];
    setCastCrew: (crew: CastCrewMember[]) => void;
}

export default function AddCastCrew({ setShowModal, castCrew, setCastCrew }: AddCastCrewProps) {
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("Actor");
    
    const handleAddCastCrew = () => {
        if (newName.trim()) {
            setCastCrew([...castCrew, { name: newName, role: newRole }]);
            setNewName("");
            setNewRole("Actor");
        }
    };

    const handleDeleteCastCrew = (name: string) => {
        setCastCrew(castCrew.filter((member) => member.name !== name));
    };

    return (
        <div className={styles.modalContainer}>
            <h2>Add Cast & Crew</h2>

            {/* Adding Cast/Crew Memebers */}
            <div className={styles.addActor}>
                <label>Name: 
                    <input 
                        type="text"
                        name="castCrewName"
                        value={newName}
                        onChange={(e) => {setNewName(e.target.value)}}
                    />
                </label>
                
                <label>Role: 
                    <select value={newRole} onChange={(e) => {setNewRole(e.target.value)}}>
                        <option>Actor</option>
                        <option>Director</option>
                        <option>Producer</option>
                    </select>
                </label>

                <div className={styles.buttonContainer}>
                    <button onClick={handleAddCastCrew}>Add</button>
                </div>
            </div>

            {/* List of Cast/Crew Members */}
            <ul>
                {castCrew.map((member, index) => (
                    <li key={index}>
                        {member.name} - {member.role}
                        <button onClick={() => handleDeleteCastCrew(member.name)}>❌</button>
                    </li>
                ))}
            </ul>

            <button onClick={() => setShowModal(false)}>Done</button>
        </div>
    );
}