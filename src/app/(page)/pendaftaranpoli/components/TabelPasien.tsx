import React from "react";
import {
  Table,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Pagination from "@/components/pagination";
import { cn } from "@/lib/utils";
export const TabelPasien: React.FC<{
  data: any[];
  page2: number;
  setPage2: any;
  maxPage: number;
}> = ({ data, page2, setPage2, maxPage }) => {
  return (
    <Card className="bg-white border border-gray-100 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Informasi Pasien
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
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
            {data?.map((patient, idx) => (
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
          <Pagination maxPage={maxPage} page={page2} setPage={setPage2} />
        </div>
      </CardContent>
    </Card>
  );
};
