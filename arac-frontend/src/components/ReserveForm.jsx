import React from "react";

export default function ReserveForm({ form, setForm, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-2">
      <h3 className="font-semibold text-lg text-gray-700">📋 Rezervasyon Oluştur</h3>

      {/* Araç Bilgileri (Read-only) */}
      <div className="flex flex-col">
        <label>Plaka</label>
        <input name="plaka" value={form.plaka || ""} readOnly className="bg-gray-100 p-2 rounded"/>
      </div>

      <div className="flex flex-col">
        <label>Sahip</label>
        <input name="sahip" value={form.sahip || ""} readOnly className="bg-gray-100 p-2 rounded"/>
      </div>

      {/* Kullanıcı */}
      <div className="flex flex-col">
        <label>Kullanan</label>
        <input name="kullanan" value={form.kullanan || ""} readOnly className="bg-gray-100 p-2 rounded"/>
      </div>

      {/* Yer ve Gidilecek Yer */}
      <div className="flex gap-2">
        <input name="yer" placeholder="Bulunduğu Yer" value={form.yer || ""} onChange={handleChange} className="flex-1 p-2 border rounded"/>
        <input name="gidilecek_yer" placeholder="Gidilecek Yer" value={form.gidilecek_yer || ""} onChange={handleChange} className="flex-1 p-2 border rounded"/>
      </div>

      {/* Tarihler */}
      <div className="flex gap-2">
        <input type="datetime-local" name="baslangic" value={form.baslangic || ""} onChange={handleChange} className="flex-1 p-2 border rounded"/>
        <input type="datetime-local" name="son" value={form.son || ""} onChange={handleChange} className="flex-1 p-2 border rounded"/>
      </div>

      {/* Neden ve Aciliyet */}
      <div className="flex gap-2">
        <input name="neden" placeholder="Neden" value={form.neden || ""} onChange={handleChange} className="flex-1 p-2 border rounded"/>
        <input name="aciliyet" placeholder="Aciliyet" value={form.aciliyet || ""} onChange={handleChange} className="flex-1 p-2 border rounded"/>
      </div>

      <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">Rezervasyonu Oluştur</button>
    </form>
  );
}
