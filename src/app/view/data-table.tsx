"use client";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Ghost } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

interface ITableCheckoutProps {
  data: any[];
  date: any[];
  page: number;
  sortTarget: Function;
}

const DataTable: React.FunctionComponent<ITableCheckoutProps> = (props) => {
  const [eventId, setEventId] = useState<number>(0);

  const mapping = () => {
    return props.data?.map((val: any, idx: number) => {
      return (
        <TableRow key={idx}>
          <TableCell>
            <p className="">{(props.page - 1) * 15 + idx + 1}</p>
          </TableCell>
          <TableCell>
            <p className="font-semibold">{val.ruangan_nama}</p>
          </TableCell>
          <TableCell>
            <p className="text-center">{val.data1}</p>
          </TableCell>
          <TableCell>
            <p className="text-center">{val.data2}</p>
          </TableCell>
          <TableCell>
            <p className="text-center">{val.data3}</p>
          </TableCell>
          <TableCell>
            <p className="text-center">{val.data4}</p>
          </TableCell>
          <TableCell>
            <p className="text-center">{val.data5}</p>
          </TableCell>
          <TableCell>
            <p className="text-center">{val.data6}</p>
          </TableCell>
          <TableCell>
            <p className="text-center">{val.data7}</p>
          </TableCell>
          <TableCell>
            <p className="text-center font-bold">{val.total}</p>
          </TableCell>
        </TableRow>
      );
    });
  };

  const headerMapping = () => {
    return props.date?.map((val, i) => {
      return (
        <TableHead
          className="text-center"
          onClick={() => {
            {
              i == 7
                ? props.sortTarget("total")
                : props.sortTarget(`data${i + 1}`);
            }
          }}
        >
          <Button variant={"ghost"}>{val}</Button>
        </TableHead>
      );
    });
  };

  return (
    <CardContent>
      <Table className="">
        <TableHeader className="">
          <TableRow>
            <TableHead>no.</TableHead>
            <TableHead className="w-[340px]">ruangan</TableHead>
            {headerMapping()}
          </TableRow>
        </TableHeader>

        <TableBody className="">{mapping()}</TableBody>
      </Table>
    </CardContent>
  );
};

export default DataTable;
