import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function parseJwt(token) { 
  try { 
    return JSON.parse(atob(token.split('.')[1])); 
  } catch { 
    return {}; 
  } 
}

export default function ReserveList() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const fetchReservations = async () => {
      try {
        const res = await fetch("https://cardeal-vduj.onrender.com/reservations", { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        const data = await res.json();
        setReservations(data);
      } catch(err) { alert(err.message); }
    };
    fetchReservations();
  }, [navigate]);

  const handleApprove = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://cardeal-vduj.onrender.com/reservations/approve/${id}`, { 
        method: "POST", 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (!res.ok) throw new Error("Onaylanamadı");
      setReservations(prev => prev.filter(r => r.id !== id));
      alert("✅ Rezervasyon onaylandı.");
    } catch(err) { alert(err.message); }
  };

  const handleDelete = async (kullanan, plaka) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`https://cardeal-vduj.onrender.com/rezerve_sil?plaka=${plaka}&kullanan=${kullanan}`, { 
        method: "DELETE", 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setReservations(prev => prev.filter(r => !(r.plaka===plaka && r.kullanan===kullanan)));
    } catch(err) { alert(err.message); }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Rezervasyon Listesi</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Plaka</th><th>Kullanan</th><th>Sahip</th><th>Başlangıç</th><th>Son</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">Rezervasyon bulunamadı</td>
            </tr>
          ) : (
            reservations.map(r => (
              <tr key={`${r.plaka}-${r.kullanan}`}>
                <td>{r.plaka}</td>
                <td>{r.kullanan}</td>
                <td>{r.sahip}</td>
                <td>{r.baslangic}</td>
                <td>{r.son}</td>
                <td>
                  <button onClick={() => handleApprove(r.id)} className="text-blue-600">Onayla</button>
                  <button onClick={() => handleDelete(r.kullanan, r.plaka)} className="text-red-600 ml-2">Sil</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
