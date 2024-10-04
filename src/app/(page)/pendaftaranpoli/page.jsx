"use client";

import { useState, useEffect } from "react";
import { CardInfo } from "./components/CardInfo";
import { TabelPendaftaran } from "./components/CardPendaftar";
import axios from "axios";
import { TabelPasien } from "./components/TabelPasien";
import { DatePick } from "@/components/DatePick";
import { cardTopQUery } from "@/api/pendaftaranpoli";
// Simulate a backend API call with a larger dataset

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [infoPasien, setInfoPasien] = useState();
  const [compareJumlah, setComapreJumlah] = useState({
    offline: 0,
    online: 0,
    total: 0,
  });
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [maxPage1, setMaxPage1] = useState(1);
  const [maxPage2, setMaxPage2] = useState(1);

  const [tabelJumlah, setTabelJumlah] = useState({
    totalData: 0,
    totalPage: 0,
    result: [],
  });
  const { data: cardData, isLoading } = cardTopQUery(date);

  const getJumlahOfflineOnline = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/perbandingantotal?date=${date}`
      );
      const data = result.data;
      setComapreJumlah({
        offline: data.offline,
        online: data.online,
        total: data.total,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getTabelJumlahPasien = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/tabeldaftar?page=${page1}&date=${date}`
      );
      const data = result.data;

      setTabelJumlah({
        totalData: data.totalData,
        totalPage: data.totalPage,
        result: data.result,
      });

      setMaxPage1(data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataPasien = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/tabelpasien?page=${page2}&date=${date}`
      );

      setInfoPasien(response?.data.result);
      setMaxPage2(response?.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTabelJumlahPasien();
  }, [page1, date]);

  useEffect(() => {
    getDataPasien();
  }, [page2, date]);

  useEffect(() => {
    getJumlahOfflineOnline();
  }, [date]);

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
      />

      <TabelPendaftaran
        dataCompare={compareJumlah}
        tabelCompare={tabelJumlah}
        maxPage1={maxPage1}
        page1={page1}
        setPage1={setPage1}
      />
      <TabelPasien
        data={infoPasien}
        maxPage={maxPage2}
        page2={page2}
        setPage2={setPage2}
      />
    </div>
  );
}
