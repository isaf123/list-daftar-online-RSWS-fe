"use client";
import * as React from "react";
import { useState } from "react";
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
import DatePicker from "@/components/DatePicker";
import { ChartPasien } from "../view/ChartPasien";
import { ChartPie } from "../view/ChartPie";
import { PageHome } from "@/lib/contextProvider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useTabelJanjiPoli,
  useSortListJanjiPoli,
  useGrafikJanjiPoli,
} from "@/api/janjipoli";
interface ITableCheckoutProps {}

const TableCheckout: React.FunctionComponent<ITableCheckoutProps> = (props) => {
  const [page, SetPage] = useState<number>(1);
  const [sortTarget, setSortTarget] = useState<string>("total");
  const [datePick, setDatePick] = React.useState<Date>();
  const [room, setRoom] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<{ from: any; to: any } | any>(
    undefined
  );
  const [dataPoliPie, setDataPoliPie] = useState<any[]>([]);
  const [state, dispatch] = useState<any>();
  const { data: grafikJanjiPoli } = useGrafikJanjiPoli(dateRange, dataPoliPie);
  const { data: sortListjanjiPoli } = useSortListJanjiPoli(datePick);
  const { data: tabelJanjiPoli, isLoading } = useTabelJanjiPoli(
    page,
    sortTarget,
    datePick,
    room
  );

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
                data={sortListjanjiPoli}
              ></ComboBoxRuangan>
              <div className=" flex-1 flex overflow-x-auto gap-2">
                {room.length ? (
                  room.map((val) => {
                    return (
                      <Badge
                        key={val}
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
            {isLoading ? (
              <div>
                <Skeleton className="w-full h-[472px] max-sm:max-w-[472px] mt-5" />
              </div>
            ) : (
              <div className="w-full max-sm:max-w-[472px]">
                <DataTable
                  data={tabelJanjiPoli?.result}
                  date={tabelJanjiPoli?.range}
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
            maxPage={tabelJanjiPoli?.totalPage}
          ></Pagination>
        </div>
        <div className="flex gap-2 h-fit flex-wrap ">
          <ChartPasien
            data={grafikJanjiPoli?.data}
            setDateRange={setDateRange}
            dateRange={dateRange}
            sum={grafikJanjiPoli?.sum}
            classname="flex-1 min-w-fit"
          ></ChartPasien>
          <div className="flex-1 min-w-fit">
            <ChartPie
              data={grafikJanjiPoli}
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
