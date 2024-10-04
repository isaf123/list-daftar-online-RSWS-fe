import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const cardTopQUery = (date: Date) => {
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
