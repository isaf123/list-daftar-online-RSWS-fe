"use client";
import { useState } from "react";
import { CardInfo } from "./components/CardInfo";
import { TabelPendaftaran } from "./components/CardPendaftar";
import { TabelPasien } from "./components/TabelPasien";
import { DatePick } from "@/components/DatePick";
import { useCardTopQUery } from "@/api/pendaftaranpoli";
// Simulate a backend API call with a larger dataset

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const { data: cardData, isLoading } = useCardTopQUery(date);

  return (
    <div className="container mx-auto p-4 md:p-10 ">
      <h1 className="text-3xl font-bold mb-6">
        Patient Registration Dashboard
      </h1>
      <div className="mb-6">
        <DatePick date={date} setDate={setDate} />
      </div>
      <CardInfo
        date={date}
        setDate={setDate}
        totalPasien={cardData?.jumlahPasien}
        totalPoli={cardData?.jumlahPoli}
        pulang={cardData?.pasienPulang}
        batalPeriksa={cardData?.batalPeriksa}
        isPending={isLoading}
      />

      <TabelPendaftaran page1={page1} setPage1={setPage1} date={date} />
      <TabelPasien date={date} page2={page2} setPage2={setPage2} />
    </div>
  );
}
