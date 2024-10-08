import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCardTopQUery = (date: Date) => {
  const result = useQuery({
    queryFn: async () => {
      const { data: jumlahPasien } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/total-pasien?date=${date}`
      );
      const { data: jumlahPoli } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/jumlahpoli?date=${date}`
      );

      const { data: pasienPulang } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/pasienPulang?date=${date}`
      );

      const { data: batalPeriksa } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/batal?date=${date}`
      );

      return { jumlahPoli, jumlahPasien, pasienPulang, batalPeriksa };
    },
    queryKey: ["checkout", date],
  });

  return result;
};

export const useJumlahOfflineOnline = (date: Date) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/perbandingantotal?date=${date}`
      );
      return response.data;
    },
    queryKey: ["jumlahOnlineOffline", date],
  });
};

export const useTabelJumlahPasien = (
  date: Date,
  page1: number,
  ruangan: any[]
) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}daftarpoli/tabeldaftar?page=${page1}&date=${date}`,
        { ruangan }
      );
      return response.data;
    },
    queryKey: ["tabelJumlahPasien", date, page1, ruangan],
  });
};

export const useDataPasien = (date: Date, page2: number, search: string) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }daftarpoli/tabelpasien?page=${page2}&date=${date}${
          search && `&search=${search}`
        }`
      );
      return response.data;
    },
    queryKey: ["dataPasien", date, page2, search],
  });
};
