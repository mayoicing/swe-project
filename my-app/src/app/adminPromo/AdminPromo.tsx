"use client";
import { useEffect, useState } from "react";
import styles from "./AdminPromo.module.css";

export default function AdminPromo() {
  const [promoCodes, setPromoCodes] = useState<{ code: string; discount: number }[]>([]);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(0);

  const backendUrl = "http://localhost:8080/promocode"; // Adjust if deployed

  const fetchPromoCodes = async () => {
    const res = await fetch(`${backendUrl}/getAll`);
    const data = await res.json();
    setPromoCodes(data);
  };

  const handleAddPromo = async () => {
    if (!newCode.trim() || newDiscount <= 0) {
      alert("Please enter a valid promo code and discount.");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: newCode, discount: newDiscount }),
      });

      if (res.ok) {
        setNewCode("");
        setNewDiscount(0);
        fetchPromoCodes();
      } else {
        const err = await res.text();
        alert("Failed to add promo: " + err);
      }
    } catch (err) {
      alert("Error: " + err);
    }
  };

  const handleRemovePromo = async (code: string) => {
    try {
      const res = await fetch(`${backendUrl}/getByCode/${code}`);
      const promo = await res.json();
      const id = promo.promoID;

      const delRes = await fetch(`${backendUrl}/delete/${id}`, { method: "DELETE" });

      if (delRes.ok) {
        fetchPromoCodes();
      } else {
        alert("Failed to delete promo.");
      }
    } catch (err) {
      alert("Error deleting promo: " + err);
    }
  };

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Promotions Management</h1>

      <div className={styles.addPromoSection}>
        <h2>Add New Promo Code</h2>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter promo code"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Discount %"
            value={newDiscount}
            onChange={(e) => setNewDiscount(parseFloat(e.target.value))}
            className={styles.input}
          />
          <button onClick={handleAddPromo} className={styles.addButton}>
            Add Promo
          </button>
        </div>
      </div>

      <div className={styles.promoList}>
        <h2>Active Promo Codes</h2>
        {promoCodes.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Promo Code</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.map((promo, index) => (
                <tr key={index}>
                  <td>{promo.code}</td>
                  <td>{promo.discount}%</td>
                  <td>
                    <button
                      onClick={() => handleRemovePromo(promo.code)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No promo codes available.</p>
        )}
      </div>
    </div>
  );
}
