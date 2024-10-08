import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "@/components/pagination";
import { cn } from "@/lib/utils";
import { useDataPasien } from "@/api/pendaftaranpoli";
export const TabelPasien: React.FC<{
  page2: number;
  setPage2: any;
  date: Date;
}> = ({ page2, setPage2, date }) => {
  const [search, setSearch] = useState<string>("");
  const { data, isPending } = useDataPasien(date, page2, search);
  console.log(search);

  if (isPending && !search) return <Skeleton className="w-full h-[585px]" />;
  return (
    <Card className="bg-white border border-gray-100 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Informasi Pasien
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          className="mb-4 w-[230px]"
          placeholder="cari pasien"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table className="min-h-[500px]">
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="font-semibold">No</TableHead>
              <TableHead className="font-semibold">Nama</TableHead>

              <TableHead className="font-semibold ">Poli</TableHead>
              <TableHead className="font-semibold text-center">
                Cara Daftar
              </TableHead>
              <TableHead className="font-semibold text-center">
                Status Periksa
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.result.map((patient: any, idx: number) => (
              <TableRow key={idx} className="text-center">
                <TableCell className="text-left">
                  {(page2 - 1) * 10 + idx + 1}
                </TableCell>
                <TableCell className="text-left">
                  {patient.nama_pasien}
                </TableCell>
                <TableCell className="text-left">
                  {patient.ruangan_nama}
                </TableCell>
                <TableCell>{patient.daftar}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      patient.statusperiksa === "SUDAH DI PERIKSA" &&
                        "bg-blue-100 text-blue-800",
                      patient.statusperiksa === "ANTRIAN" &&
                        "bg- text-slate-800",
                      patient.statusperiksa === "SUDAH PULANG" &&
                        "bg-green-100 text-green-800",
                      patient.statusperiksa === "BATAL PERIKSA" &&
                        "bg-red-100 text-red-800",
                      patient.statusperiksa === "SEDANG DIRAWAT INAP" &&
                        "bg-purple-100 text-purple-800",
                      patient.statusperiksa === "SEDANG PERIKSA" &&
                        "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {patient.statusperiksa}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end mt-4">
          <Pagination
            maxPage={data?.totalPage}
            page={page2}
            setPage={setPage2}
          />
        </div>
      </CardContent>
    </Card>
  );
};
