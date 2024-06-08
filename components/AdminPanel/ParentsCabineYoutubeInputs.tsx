"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn, fetchToChangeDataOnServer } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "../ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/store/store";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { BsTrash3Fill } from "react-icons/bs";
import { Input } from "../ui/input";

const FormSchema = z.object({
  group: z
    .string({ required_error: "Це поле є обов'язковим" })
    .min(2, { message: "Це поле не заповнене" }),
  youtube_links: z.array(
    z.object({
      id: z
        .string({ required_error: "Це поле є обов'язковим" })
        .min(2, { message: "Це поле не заповнене" }),
      linkToRecording: z
        .string({ required_error: "Це поле є обов'язковим" })
        .min(2, { message: "Це поле не заповнене" }),
      dateOfMeeting: z.date({ required_error: "Це поле є обов'язковим" }),
      lessonTitle: z
        .string({ required_error: "Це поле є обов'язковим" })
        .min(2, { message: "Це поле не заповнене" }),
    }),
  ),
});

const inputLabel = "text-[0.8rem] font-medium";

const ParentsCabineYoutubeInputs: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const allHomework = useStore((state) => state.homework);
  const getAllHomework = useStore((state) => state.getHomework);

  const allLessonTitles = allHomework?.map((lessons) => lessons.id);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      group: "",
      youtube_links: [
        {
          id: uuidv4(),
          linkToRecording: "",
          dateOfMeeting: new Date(),
          lessonTitle: "",
        },
      ],
    },
  });

  const { control, reset, watch } = form;

  const subscibeGroup = watch("group");

  useEffect(() => {
    getAllHomework(subscibeGroup);
  }, [subscibeGroup]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "youtube_links",
  });

  const AppendHomeworkIsDoneHandler = () => {
    append({
      id: uuidv4(),
      linkToRecording: "",
      dateOfMeeting: new Date(),
      lessonTitle: "",
    });
  };

  const handleSearchLessonTitle = (lessonId: string | number) =>
    allHomework?.find((lesson) => lesson.id === lessonId)?.lessonTitle;

  const handleLessonTitleChange = (lessonIds: (string | number)[]) => {
    return lessonIds?.map((lessonId) => {
      return (
        <SelectItem key={lessonId} value={lessonId.toString()}>
          <div className="max-w-[270px] overflow-hidden whitespace-nowrap">
            {handleSearchLessonTitle(lessonId)}
          </div>
        </SelectItem>
      );
    });
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newYoutubeLinks = {
      ...data,
      youtube_links: data.youtube_links.map(function (link) {
        return {
          ...link,
          dateOfMeeting: format(link.dateOfMeeting, "dd.MM.yyyy"),
          lessonTitle: handleSearchLessonTitle(link.lessonTitle),
        };
      }),
    };

    try {
      setLoading(true);

      const response: Response = await fetchToChangeDataOnServer("youtube", newYoutubeLinks);

      type Notification = {
        ok?: boolean;
      };

      const notification: Notification = await response.json();

      if (notification?.ok) {
        toast({
          title: `Для групи ${newYoutubeLinks.group} додано нове посилання на записи наступних занять: `,
          description: (
            <p className="mt-2 w-[340px] rounded-md py-4">
              {newYoutubeLinks?.youtube_links?.map((link, index) => (
                <span key={index}>
                  {link.lessonTitle +
                    (newYoutubeLinks?.youtube_links.length - 1 !== index ? ", " : "")}
                </span>
              ))}
            </p>
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
    reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6 w-full">
        <div className="flex space-x-5">
          <div className="flex flex-col space-y-5 p-6 border rounded-lg shadow-md self-start">
            {/* Group input */}
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={inputLabel}>Група</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[200px]">
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
          <div className="flex flex-col space-y-5 p-6 border rounded-lg shadow-md w-full">
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="relative flex space-x-5 p-3 group hover:outline-1 hover:outline hover:outline-accent rounded-lg">
                  <FormField
                    control={form.control}
                    name={`youtube_links.${index}.dateOfMeeting`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[150px]">
                        <FormLabel className={inputLabel}>Дата</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "max-w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}>
                                {field.value ? (
                                  format(field.value as Date, "PPP")
                                ) : (
                                  <span>Обрати дату</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value as Date}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`youtube_links.${index}.lessonTitle`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[300px]">
                        <FormLabel className={inputLabel}>Тема заняття</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Lesson #2 ..." />
                          </SelectTrigger>
                          <SelectContent className="min-w-fit">
                            {allLessonTitles ? (
                              handleLessonTitleChange(allLessonTitles)
                            ) : (
                              <SelectItem value="unknown" disabled>
                                Оберіть групу
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`youtube_links.${index}.linkToRecording`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className={inputLabel}>Посилання на запис</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.youtube.com/"
                            {...field}
                            className="max-w-[240px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 absolute transition-opacity top-0 right-0"
                    onClick={() => remove(index)}>
                    <BsTrash3Fill className="text-red-500" />
                  </Button>
                </div>
              );
            })}
            <div className="flex">
              <Button onClick={AppendHomeworkIsDoneHandler}>Додати</Button>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <Button type="submit">{loading ? "Виконую..." : "Записати"}</Button>
        </div>
      </form>
    </Form>
  );
};

export default ParentsCabineYoutubeInputs;
