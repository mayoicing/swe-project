"use client";
import { useState } from "react";
import styles from "./AdminPromo.module.css";

export default function AdminPromo() {
  // Initialize with an active promo code
  const [promoCodes, setPromoCodes] = useState<{ code: string; discount: number }[]>([
    { code: "DISCOUNT10", discount: 10 }, // Preloaded promo code
  ]);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(0);

  const handleAddPromo = () => {
    if (newCode.trim() && newDiscount > 0) {
      setPromoCodes([...promoCodes, { code: newCode, discount: newDiscount }]);
      setNewCode("");
      setNewDiscount(0);
    } else {
      alert("Please enter a valid promo code and discount.");
    }
  };

  const handleRemovePromo = (code: string) => {
    setPromoCodes(promoCodes.filter((promo) => promo.code !== code));
  };

  return (
    <div className={styles.container}>
      <h1>Promotions Management</h1>

      {/* Add Promo Code Section */}
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
            placeholder="Discount amount"
            value={newDiscount}
            onChange={(e) => setNewDiscount(parseFloat(e.target.value))}
            className={styles.input}
          />
          <button onClick={handleAddPromo} className={styles.addButton}>
            Add Promo
          </button>
        </div>
      </div>

      {/* Promo Codes List */}
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