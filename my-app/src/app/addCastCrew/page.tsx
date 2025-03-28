/* Page - AddCastCrew */
"use client";
import { useState } from 'react';
import AddCastCrew from "./AddCastCrew";

export default function AddCastCrewPage() {
    const [castCrew, setCastCrewAction] = useState<{ name: string; role: string; }[]>([]);
    const [showModal, setShowModalAction] = useState(true);

    return showModal ? ( 
        <AddCastCrew
            setShowModalAction={setShowModalAction}
            castCrew={castCrew}
            setCastCrewAction={setCastCrewAction}
        />
    ) : null;
}