"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import ComboBoxRuangan from "@/components/combobox";
import { Badge } from "@/components/ui/badge";
import { format, subMonths } from "date-fns";
import { usePostContext } from "@/lib/contextProvider";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "A donut chart with text";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const ChartPie: React.FC<{
  data?: any;
  setListPoli: any;
  listPoli: any[];
  dateShow: { from: any; to: any };
}> = ({ data, setListPoli, listPoli, dateShow }) => {
  const pieData = data.dataPoli;

  const ChartData = pieData?.map((val: any, i: number) => {
    return {
      ruangan: val.ruangan,
      perpoli: val.perpoli,
      fill: `hsl(var(--chart-${i + 1}))`,
    };
  });
  const [state, dispatch] = usePostContext();

  React.useEffect(() => {
    dispatch("halo");
  }, []);

  if (!pieData) return <Skeleton className="flex-1 w-min-fit h-[472px]" />;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className=" pb-0 ">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Jumlah Pasein per Poli</CardTitle>
            {dateShow && dateShow.from && dateShow.to ? (
              <CardDescription>
                {format(new Date(dateShow.from), "d MMM yyyy")} -{" "}
                {format(new Date(dateShow.to), "d MMM yyyy")}
              </CardDescription>
            ) : (
              <CardDescription>
                {format(subMonths(new Date(), 3), "d MMM yyyy")} -{" "}
                {format(new Date(), "d MMM yyyy")}
              </CardDescription>
            )}
          </div>
          <ComboBoxRuangan
            data={data.listSearchPoli}
            room={listPoli}
            setRoom={setListPoli}
          ></ComboBoxRuangan>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[276px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={ChartData}
              dataKey="perpoli"
              nameKey="ruangan"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data.dataPoli.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Poli Aktif
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-sm">
        <div className=" w-[468px] flex overflow-x-auto gap-2">
          {listPoli.length ? (
            listPoli.map((val) => {
              return (
                <Badge
                  className="px-0 flex justify-center shadow-md border border-gray-500 cursor-pointer"
                  variant={"secondary"}
                  onClick={() => {
                    const updateRoom = listPoli.filter((item) => val !== item);

                    setListPoli(updateRoom);
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
      </CardFooter>
    </Card>
  );
};
