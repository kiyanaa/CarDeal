import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReserveForm from "../components/ReserveForm";

function parseJwt(token) {
  try { return JSON.parse(atob(token.split('.')[1])); } 
  catch { return {}; }
}

export default function ReservePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { plaka } = state || {};

  const [form, setForm] = useState({
    marka: "", model: "", yil: "", renk: "", plaka: "",
    sahip: "", kullanan: "", yer: "", gidilecek_yer: "",
    baslangic: "", son: "", neden: "", aciliyet: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/login"); return; }

    const decoded = parseJwt(token);
    setForm(prev => ({ ...prev, sahip: decoded.username, kullanan: decoded.username }));

    const fetchVehicle = async () => {
      try {
        const res = await fetch(`https://cardeal-vduj.onrender.com/araclar/${plaka}`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error("Araç bilgisi alınamadı");
        const data = await res.json();
        setForm(prev => ({ ...prev,
          marka: data.arac.marka, model: data.arac.model, yil: data.arac.yil, renk: data.arac.renk,
          plaka: data.arac.plaka, sahip: data.arac.tahsisli || "havuz", yer: data.arac.yer || "Bilinmiyor"
        }));
      } catch(err) { setError(err.message); }
      finally { setLoading(false); }
    };
    fetchVehicle();
  }, [plaka, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://cardeal-vduj.onrender.com/reserve_et/${plaka}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || "Rezervasyon başarısız");
      alert("✅ Rezervasyon başarıyla oluşturuldu.");
      navigate("/rezervasyonlar");
    } catch(err) { alert("Hata: " + err.message); }
  };

  if (loading) return <div>⏳ Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <ReserveForm form={form} setForm={setForm} onSubmit={handleSubmit} />;
}
