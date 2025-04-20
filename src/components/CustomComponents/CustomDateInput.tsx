/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";

interface DateInputProps {
  title: string;
  name: string;
}

const today = new Date().toISOString();

export const CustomDateInput: React.FC<DateInputProps> = ({
  title,
  name,
}: DateInputProps) => {
  const [date, setDate] = React.useState<string>();

  console.log(date);
  console.log(today);

  console.log(typeof date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>{title}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(format(selectedDate, "yyyy-MM-dd")); // or "PPP" or any format you want
              console.log(selectedDate.toISOString());
            }
          }}
          initialFocus
        />
        <input type="hidden" name={name} value={date} />
      </PopoverContent>
    </Popover>
  );
};
