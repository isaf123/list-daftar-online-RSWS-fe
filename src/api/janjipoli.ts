import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useTabelJanjiPoli = (
  page: number,
  sortTarget: string,
  datePick: Date | undefined,
  room: any[]
) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }data?page=${page}&sortTarget=${sortTarget}${
          datePick ? `&tgljanji=${datePick}` : ""
        }`,
        room.length && { ruangan: room }
      );
      return response.data;
    },
    queryKey: ["tabelJanjiPoli", page, sortTarget, datePick, room],
  });
};

export const useSortListJanjiPoli = (datePick: Date | undefined) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}ruangan${
          datePick ? `?tgljanji=${datePick}` : ""
        }`
      );
      return response.data;
    },
    queryKey: ["listPoliJanjiPoli", datePick],
  });
};

export const useGrafikJanjiPoli = (
  dateRange: { from: any; to: any } | any,
  dataPoliPie: any[]
) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}grafik-pasien${
          dateRange ? `?mulai=${dateRange.from}&selesai=${dateRange.to}` : ""
        }`,
        dataPoliPie.length && { ruangan: dataPoliPie }
      );
      return response.data;
    },
    queryKey: ["grafikJanjiPoli", dateRange, dataPoliPie],
  });
};
