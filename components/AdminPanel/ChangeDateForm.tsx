"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, addDays, isAfter, isBefore } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn, fetchToChangeDataOnServer } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const FormSchema = z.object({
  date: z.date(),
  group: z.string(),
});

const ChangeDateForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const response = await fetchToChangeDataOnServer("time", {
        date: format(data.date, "dd.MM.yyyy"),
        group: data.group,
      });

      if (response.ok) {
        toast({
          title: `Обрано наступну дату для групи №:${data.group === "group1" ? "1" : "2"}`,
          description: (
            <p className="mt-2 w-[340px] rounded-md">{format(data.date, "dd.MM.yyyy")}</p>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Помилка під час надсилання даних.",
      });
      console.log(error);
    }
  };
  const today = new Date();

  const oneWeekFromNow = addDays(today, 14);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 w-full lg:w-2/6 items-center">
        <div className="flex flex-col space-y-5">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата заняття</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "max-w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}>
                        {field.value ? format(field.value, "PPP") : <span>Обрати дату</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => isAfter(date, oneWeekFromNow) || isBefore(date, today)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Це дата майбутнього заняття</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Група</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Виберіть групу" />
                  </SelectTrigger>
                  <SelectContent className="min-w-fit">
                    <SelectItem value="group2">Група 2</SelectItem>
                    <SelectItem value="group3">Група 3</SelectItem>
                    <SelectItem value="arthor">Інд. Артур</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center">
          <Button type="submit">{loading ? "Виконую..." : "Змінити"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangeDateForm;
