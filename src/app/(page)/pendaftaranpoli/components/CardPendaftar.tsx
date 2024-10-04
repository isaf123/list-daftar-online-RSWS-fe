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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Wifi, Hospital } from "lucide-react";
import Pagination from "@/components/pagination";
import { Input } from "@/components/ui/input";

export const TabelPendaftaran: React.FC<{
  dataCompare: { online: Number; offline: Number; total: Number };
  tabelCompare: { totalPage: Number; totalData: Number; result: any[] };
  page1: number;
  setPage1: any;
  maxPage1: number;
}> = ({ dataCompare, tabelCompare, maxPage1, page1, setPage1 }) => {
  const { online, offline, total } = dataCompare;
  const { totalData, totalPage, result } = tabelCompare;

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
                {String(online)}
              </div>
              <div className="text-lg text-blue-600">Pasien daftar online</div>
            </div>
            <div className="text-5xl font-bold text-gray-300">-</div>
            <div className="text-center">
              <Hospital className="h-16 w-16 text-green-500 mb-2 mx-auto" />
              <div className="text-4xl font-bold text-green-700">
                {String(offline)}
              </div>
              <div className="text-lg text-green-600">
                Pasien daftar offline
              </div>
            </div>
          </div>
          <div className="mt-6">
            {/* <div className="flex justify-between mb-4">
          
              <Input
            placeholder="Search departments..."
            value={statSearchTerm}
            onChange={(e) => setStatSearchTerm(e.target.value)}
            className="w-full md:w-[200px]"
          />
          <Select
            onValueChange={setStatFilterType}
            value={statFilterType}
          >
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
            </SelectContent>
          </Select>
            </div> */}
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
                {result &&
                  result.map((stat, idx) => (
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
              <Pagination maxPage={maxPage1} page={page1} setPage={setPage1} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
