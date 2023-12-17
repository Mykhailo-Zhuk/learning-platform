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
      };

      const response = await fetchToChangeDataOnServer("time", "post", newTime);

      if (response.ok) {
        toast({
          title: "Обрано наступний час:",
          description: (
            <p className="mt-2 w-[340px] rounded-md p-4">{`${formattedStartTime} - ${formattedEndTime}`}</p>
          ),
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-2/6 space-y-6">
        <div className="flex space-x-6">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="whitespace-nowrap">Змінити час початку</FormLabel>
                <FormControl>
                  <Input placeholder="10:00" {...field} />
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
                  <Input placeholder="12:00" {...field} />
                </FormControl>
                <FormDescription className="whitespace-nowrap">
                  Це час закінчення заняття
                </FormDescription>
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
