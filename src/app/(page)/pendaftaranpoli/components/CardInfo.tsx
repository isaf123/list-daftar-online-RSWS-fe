"use client";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Building2, UserCheck, StopCircle } from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const CardInfo: React.FC<{
  totalPasien?: Number;
  totalPoli?: Number;
  pulang?: Number;
  batalPeriksa?: number;
  isPending?: boolean;
}> = ({ totalPasien, totalPoli, pulang, batalPeriksa, isPending }) => {
  if (isPending)
    return (
      <div className="w-full h-[200px] flex gap-4 flex-wrap mb-8">
        <Skeleton className="flex-1 min-h-fit" />
        <Skeleton className="flex-1 min-h-fit" />
        <Skeleton className="flex-1 min-h-fit" />
        <Skeleton className="flex-1 min-h-fit" />
      </div>
    );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="bg-blue-50 border border-blue-100 shadow-md">
        <CardContent className="pt-6 pb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-4xl font-bold text-blue-700 mb-1">
            {String(totalPasien)}
          </div>
          <CardTitle className="text-sm font-medium text-blue-600">
            Total Pasien
          </CardTitle>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border border-green-100 shadow-md">
        <CardContent className="pt-6 pb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-4xl font-bold text-green-700 mb-1">
            {String(totalPoli)}
          </div>
          <CardTitle className="text-sm font-medium text-green-600">
            Total poli melayani
          </CardTitle>
        </CardContent>
      </Card>
      <Card className="bg-red-50 border border-purple-100 shadow-md">
        <CardContent className="pt-6 pb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <StopCircle className="h-8 w-8 text-red-600" />
          </div>
          <div className="text-4xl font-bold text-red-700 mb-1">
            {batalPeriksa}
          </div>
          <div className="flex items-center">
            <CardTitle className="text-sm font-medium text-red-600 mr-2">
              Batal periksa
            </CardTitle>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-yellow-50 border border-yellow-100 shadow-md">
        <CardContent className="pt-6 pb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <UserCheck className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-4xl font-bold text-yellow-700 mb-1">
            {String(pulang)}
          </div>
          <CardTitle className="text-sm font-medium text-yellow-600">
            Pasien pulang
          </CardTitle>
        </CardContent>
      </Card>
    </div>
  );
};
