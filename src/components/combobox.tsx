"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IComboBoxRuanganProps {
  room?: any[];
  setRoom?: any;
  data?: any[];
}

const ComboBoxRuangan: React.FunctionComponent<IComboBoxRuanganProps> = (
  props
) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          Pilih Poli
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>tidak tersedia</CommandEmpty>
            <CommandGroup>
              {props.data?.map((arr) => (
                <CommandItem
                  key={arr.ruangan_nama}
                  value={arr.ruangan_nama}
                  onSelect={() => {
                    if (!props.room?.includes(arr.ruangan_nama) && props.room) {
                      props.setRoom([...props.room, arr.ruangan_nama]);
                      setOpen(false);
                    }
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-4">
                      <Check
                        className={cn(
                          " h-4 w-4",
                          props.room?.includes(arr.ruangan_nama)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </div>
                    <div className="break-words">{arr.ruangan_nama}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBoxRuangan;
