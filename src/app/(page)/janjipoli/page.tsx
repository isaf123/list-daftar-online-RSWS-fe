"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import DataTable from "../view/data-table";
import Pagination from "@/components/pagination";
import ComboBoxRuangan from "@/components/combobox";
import axios from "axios";
import DatePicker from "@/components/DatePicker";
import { ChartPasien } from "../view/ChartPasien";
import { ChartPie } from "../view/ChartPie";
import { PageHome } from "@/lib/contextProvider";
import { Skeleton } from "@/components/ui/skeleton";
interface ITableCheckoutProps {
  page: number;
}

const TableCheckout: React.FunctionComponent<ITableCheckoutProps> = (props) => {
  const [page, SetPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [date, setDate] = useState<any[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [sortTarget, setSortTarget] = useState<string>("total");
  const [datePick, setDatePick] = React.useState<Date>();
  const [room, setRoom] = useState<any[]>([]);
  const [listRuangan, setListRuangan] = useState<any[]>([]);
  const [dataChart, setDataChart] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<{ from: any; to: any } | any>(
    undefined
  );
  const [sumPasien, setSumPasien] = useState<number>(0);
  const [dataPoli, setDataPoli] = useState<any[]>([]);
  const [dataPoliPie, setDataPoliPie] = useState<any[]>([]);
  const [state, dispatch] = useState<any>();

  useEffect(() => {
    dataPasien();
  }, [page, sortTarget, datePick, room]);

  useEffect(() => {
    dataRuangan();
  }, [datePick]);

  useEffect(() => {
    grafikPasien();
  }, [dateRange]);

  useEffect(() => {
    piePoli();
  }, [dateRange, dataPoliPie]);

  const dataPasien = async () => {
    const tgljanji = datePick ? datePick?.toISOString() : "";
    const response = await axios.post(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }data?page=${page}&sortTarget=${sortTarget}${
        datePick ? `&tgljanji=${datePick}` : ""
      }`,
      room.length && { ruangan: room }
    );
    setData(response.data?.result);
    setDate(response.data?.range);
    setMaxPage(response.data?.totalPage);
  };

  const dataRuangan = async () => {
    const query = `${process.env.NEXT_PUBLIC_API_URL}ruangan${
      datePick ? `?tgljanji=${datePick}` : ""
    }`;
    const ruangan = await axios.get(query);
    setListRuangan(ruangan?.data);
  };

  const grafikPasien = async () => {
    const grafik = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}grafik-pasien${
        dateRange ? `?mulai=${dateRange.from}&selesai=${dateRange.to}` : ""
      }`
    );

    setDataChart(grafik.data.data);
    setSumPasien(grafik.data.sum);
  };

  const piePoli = async () => {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}grafik-pasien${
        dateRange ? `?mulai=${dateRange.from}&selesai=${dateRange.to}` : ""
      }`,
      dataPoliPie.length && { ruangan: dataPoliPie }
    );
    setDataPoli(result.data);
  };

  return (
    <PageHome.Provider value={[state, dispatch]}>
      <div className="w-full">
        <Card className="h-fit mb-4 ">
          <CardHeader className="px-7 bg-gray-100 rounded-t-lg ">
            <div className="flex gap-5 items-center flex-wrap">
              <div>
                <CardTitle className="mb-2">Janji Poli</CardTitle>
                <CardDescription>Jumlah Pasien H+7</CardDescription>
              </div>
              <DatePicker date={datePick} setDate={setDatePick}></DatePicker>
              <ComboBoxRuangan
                room={room}
                setRoom={setRoom}
                data={listRuangan}
              ></ComboBoxRuangan>
              <div className=" flex-1 flex overflow-x-auto gap-2">
                {room.length ? (
                  room.map((val) => {
                    return (
                      <Badge
                        className="px-0 flex justify-center shadow-md border border-gray-500 cursor-pointer"
                        variant={"secondary"}
                        onClick={() => {
                          const updateRoom = room.filter(
                            (item) => val !== item
                          );

                          setRoom(updateRoom);
                        }}
                      >
                        <div className="ml-4 w-[64px] truncate">{val}</div>
                        <div className="mr-4 font-bold text-red-600">x</div>
                      </Badge>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!data.length ? (
              <div>
                <Skeleton className="w-full h-[472px] max-sm:max-w-[472px] mt-5" />
              </div>
            ) : (
              <div className="w-full max-sm:max-w-[472px]">
                <DataTable
                  data={data}
                  date={date}
                  page={page}
                  sortTarget={setSortTarget}
                ></DataTable>
              </div>
            )}
          </CardContent>
        </Card>
        {/* x-chunk="dashboard-06-chunk-0" */}
        <div className=" flex justify-end mb-4">
          <Pagination
            setPage={SetPage}
            page={page}
            maxPage={maxPage}
          ></Pagination>
        </div>
        <div className="flex gap-2 h-fit flex-wrap ">
          <ChartPasien
            data={dataChart}
            setDateRange={setDateRange}
            dateRange={dateRange}
            sum={sumPasien}
            classname="flex-1 min-w-fit"
          ></ChartPasien>
          <div className="flex-1 min-w-fit">
            <ChartPie
              data={dataPoli}
              setListPoli={setDataPoliPie}
              listPoli={dataPoliPie}
              dateShow={dateRange}
            ></ChartPie>
          </div>
        </div>
      </div>
    </PageHome.Provider>
  );
};

export default TableCheckout;
