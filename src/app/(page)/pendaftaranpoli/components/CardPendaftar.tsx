"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Wifi, Hospital } from "lucide-react";
import Pagination from "@/components/pagination";
import {
  useJumlahOfflineOnline,
  useTabelJumlahPasien,
} from "@/api/pendaftaranpoli";
import ComboBoxRuangan from "@/components/combobox";
import { useState } from "react";

export const TabelPendaftaran: React.FC<{
  page1: number;
  setPage1: any;
  maxPage1: number;
  date: Date;
}> = ({ page1, setPage1, date }) => {
  const [room, setRoom] = useState<any[]>([]);

  const { data: offlineOnline } = useJumlahOfflineOnline(date);
  const { data: tabelJumlahPasien, isPending } = useTabelJumlahPasien(
    date,
    page1,
    room
  );
  console.log(room);

  if (isPending) return <Skeleton className="w-full h-[721px]" />;
  return (
    <Card className="mb-8 bg-white border border-gray-100 shadow-md px-8">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Jumlah Pasien Pendaftar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-around items-center">
            <div className="text-center">
              <Wifi className="h-16 w-16 text-blue-500 mb-2 mx-auto" />
              <div className="text-4xl font-bold text-blue-700">
                {String(offlineOnline?.online)}
              </div>
              <div className="text-lg text-blue-600">Pasien daftar online</div>
            </div>
            <div className="text-5xl font-bold text-gray-300">-</div>
            <div className="text-center">
              <Hospital className="h-16 w-16 text-green-500 mb-2 mx-auto" />
              <div className="text-4xl font-bold text-green-700">
                {String(offlineOnline?.offline)}
              </div>
              <div className="text-lg text-green-600">
                Pasien daftar offline
              </div>
            </div>
          </div>
          {/* <ComboBoxRuangan
            room={room}
            setRoom={setRoom}
            data={tabelJumlahPasien.listPoli}
          /> */}
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold md:w-[48px]">
                    No
                  </TableHead>
                  <TableHead className="font-semibold md:w-[400px]">
                    Poli
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Online
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Offline
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tabelJumlahPasien?.result &&
                  tabelJumlahPasien?.result.map((stat: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="w-fit">
                        {(page1 - 1) * 10 + idx + 1}
                      </TableCell>
                      <TableCell className="w-fit font-bold">
                        {stat.poli}
                      </TableCell>
                      <TableCell className="text-center">
                        {stat.online}
                      </TableCell>
                      <TableCell className="text-center">
                        {stat.offline}
                      </TableCell>
                      <TableCell className="text-center">
                        {stat.total}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <Pagination
                maxPage={tabelJumlahPasien?.totalPage}
                page={page1}
                setPage={setPage1}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
