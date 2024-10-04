"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatePickerWithRange } from "@/components/RangeDate";
import axios from "axios";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const description = "An interactive bar chart";

const chartConfig = {
  pasien: {
    label: "pasien",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const ChartPasien: React.FC<{
  data: any[];
  setDateRange: Function;
  dateRange: any;
  sum: number;
  classname?: string;
}> = ({ data, setDateRange, dateRange, sum, classname }) => {
  // if (!data?.length) return <Skeleton className="flex-1 w-min-fit h-[472px]" />;

  return (
    <Card className={cn(classname)}>
      <CardHeader className="flex flex-col items-center space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Grafik Janji Poli</CardTitle>
          <CardDescription>Jumlah pasien/hari</CardDescription>
        </div>
        <div className="flex items-center">
          <DatePickerWithRange
            classname="px-6"
            setDateRange={setDateRange}
            dateRange={dateRange}
          ></DatePickerWithRange>
          <div className="flex">
            <button className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
              <span className="text-xs text-muted-foreground">PASIEN</span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {sum}
              </span>
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="flex gap-2">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[190px] text-[16px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey="pasien" fill={`var(--color-pasien)`} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
