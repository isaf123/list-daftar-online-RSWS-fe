"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker, DayModifiers } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  format,
  addDays,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
} from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  selected,
  onSelect,
  ...props
}: CalendarProps & {
  selected?: Date;
  onSelect?: (date: Date) => void;
}) {
  const [highlightedDates, setHighlightedDates] = React.useState<Date[]>([]);

  React.useEffect(() => {
    if (selected) {
      // Hitung tanggal 7 hari ke depan
      const sevenDaysFromNow = addDays(selected, 7);

      // Hitung rentang seminggu dari tanggal yang dipilih
      const startOfWeek = startOfDay(selected);
      const endOfWeek = endOfDay(addDays(startOfWeek, 6));
      const range = eachDayOfInterval({ start: startOfWeek, end: endOfWeek });

      // Atur tanggal yang akan disorot
      setHighlightedDates([selected, sevenDaysFromNow, ...range]);
    }
  }, [selected]);

  // Modifier untuk menambahkan kelas pada tanggal yang dipilih, 7 hari ke depan, dan rentang seminggu
  const modifiers: DayModifiers = {
    selected: (date) =>
      highlightedDates.some(
        (highlightedDate) =>
          date.getDate() === highlightedDate.getDate() &&
          date.getMonth() === highlightedDate.getMonth() &&
          date.getFullYear() === highlightedDate.getFullYear()
      ),
    range: (date) => {
      return highlightedDates.some(
        (highlightedDate) =>
          date.getDate() === highlightedDate.getDate() &&
          date.getMonth() === highlightedDate.getMonth() &&
          date.getFullYear() === highlightedDate.getFullYear()
      );
    },
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "bg-blue-400 text-white",
        day_range_end: "bg-blue-400 text-white",
        day_range_middle: "bg-blue-400 text-white",
        day_selected: "bg-gray-200 text-black font-bold",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      modifiers={modifiers}
      onDayClick={onSelect}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
