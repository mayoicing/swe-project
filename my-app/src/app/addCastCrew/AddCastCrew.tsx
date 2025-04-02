"use client";
import styles from './AddCastCrew.module.css';
import { useState } from 'react';

interface CastCrewMember {
    name: string;
    role: string;
}

interface AddCastCrewProps {
    setShowModalAction: (show: boolean) => void;
    castCrew: CastCrewMember[];
    setCastCrewAction: (crew: CastCrewMember[]) => void;
}

export default function AddCastCrew({ setShowModalAction, castCrew, setCastCrewAction }: AddCastCrewProps) {
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("Actor");
    
    const handleAddCastCrew = () => {
        if (newName.trim()) {
            setCastCrewAction([...castCrew, { name: newName, role: newRole }]);
            setNewName("");
            setNewRole("Actor");
        }
    };

    const handleDeleteCastCrew = (name: string) => {
        setCastCrewAction(castCrew.filter((member) => member.name !== name));
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
            <ul className={styles.castCrewList}>
                {castCrew.map((member, index) => (
                    <li key={index} className={styles.castCrewItem}>
                    {member.name} - {member.role}
                    <button onClick={() => handleDeleteCastCrew(member.name)}>x</button>
                    </li>
                ))}
                </ul>

            <button onClick={() => setShowModalAction(false)}>Done</button>
        </div>
    );
}