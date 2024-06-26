"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { fetchToChangeDataOnServer } from "@/lib/utils";
import { useState } from "react";

const FormSchema = z.object({
  start_time: z
    .string()
    .min(2, {
      message: "Ось вірний зразок написання 10:00",
    })
    .max(5, { message: "Ось вірний зразок написання 10:00" }),
  end_time: z
    .string()
    .min(2, {
      message: "Ось вірний зразок написання 12:00",
    })
    .max(5, { message: "Ось вірний зразок написання 12:00" }),
  group: z.string(),
});

const ChangeTimeForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      start_time: "10:00",
      end_time: "12:00",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const isValidTimeFormat = (time: string) => /^\d{2}:\d{2}$/.test(time);

      const formattedStartTime = isValidTimeFormat(data.start_time)
        ? data.start_time
        : `${data.start_time.slice(0, 2)}:00`;

      const formattedEndTime = isValidTimeFormat(data.end_time)
        ? data.end_time
        : `${data.end_time.slice(0, 2)}:00`;

      const newTime = {
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        group: data.group,
      };

      const response = await fetchToChangeDataOnServer("time", newTime);

      if (response.ok) {
        toast({
          title: `Обрано наступний час для групи №:${data.group === "group1" ? "1" : "2"}`,
          description: (
            <p className="mt-2 w-[340px] rounded-md p-4">{`${formattedStartTime} - ${formattedEndTime}`}</p>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      toast({
        title: "Помилка під час надсилання даних",
      });
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full lg:w-1/2 space-y-6">
        <div className="flex flex-col space-y-5">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="whitespace-nowrap">Змінити час початку</FormLabel>
                <FormControl>
                  <Input placeholder="10:00" {...field} className="max-w-[240px]" />
                </FormControl>
                <FormDescription className="whitespace-nowrap">
                  Це час початку заняття
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="whitespace-nowrap">Змінити час закінчення</FormLabel>
                <FormControl>
                  <Input placeholder="12:00" {...field} className="max-w-[240px]" />
                </FormControl>
                <FormDescription className="whitespace-nowrap">
                  Це час закінчення заняття
                </FormDescription>
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

export default ChangeTimeForm;
