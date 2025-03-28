"use client";
import styles from './AddCastCrew.module.css';
import AdminNavbar from '../components/AdminNavbar';
import { useState } from 'react';
import Link from 'next/link';

interface CastCrewMember {
    name: string;
    role: string;
}

export default function AddCastCrew() {
    const [newName, setNewName] = useState("");
    const [newRole, setNewRole] = useState("Actor");
    const [castCrew, setCastCrew] = useState<CastCrewMember[]>([]);
    

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
        <>
            <AdminNavbar/>
            <div className={styles.container}>

                {/* Adding Cast/Crew Memebers */}
                <div className={styles.addActor}>
                    <label>Cast/Crew Name: 
                        <input 
                            type="text"
                            name="castCrewName"
                            value={newName}
                            onChange={(e) => {setNewName(e.target.value)}}
                        />
                    </label>
                    <label>
                        Role: 
                        <select value={newRole} onChange={(e) => {setNewRole(e.target.value)}}>
                            <option>Actor</option>
                            <option>Director</option>
                            <option>Producer</option>
                        </select>
                    </label>
                    <div className={styles.buttonContainer}>
                        <button onClick={handleAddCastCrew}>Add Cast/Crew</button>
                    </div>
                </div>

                {/* List of Cast/Crew Members */}
                <div className={styles.membersList}>
                    {castCrew.length > 0 ? (
                        castCrew.map((member, index) => (
                            <div key={index} className={styles.memberItem}>
                                <span>{member.name} - {member.role}</span>
                                <button onClick={() => handleDeleteCastCrew(member.name)}>Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No cast/crew members added yet.</p>
                    )}
                </div>

                {/* Click this to go back to addMovie page */}
                <div className={styles.doneButton}>
                    <Link href='addMovie'>Done</Link>
                </div>
            </div>
        </>
    );
}