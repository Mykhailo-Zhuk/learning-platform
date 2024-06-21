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
import {
  GROUP_2_MEMBERS,
  GROUP_3_MEMBERS,
  INDIVID_ARTHOR,
  Members,
  PersonalHomeworkResults,
  useStore,
} from "@/store/store";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { BsTrash3Fill } from "react-icons/bs";

const FormSchema = z.object({
  username: z
    .string({ required_error: "Це поле є обов'язковим" })
    .min(2, { message: "Це поле не заповнене" }),
  group: z
    .string({ required_error: "Це поле є обов'язковим" })
    .min(2, { message: "Це поле не заповнене" }),
  type: z
    .string({ required_error: "Це поле є обов'язковим" })
    .min(2, { message: "Це поле не заповнене" }),
  homeworkIsDone: z.array(
    z.object({
      id: z.string(),
      date: z.date({ required_error: "Це поле є обов'язковим" }),
      lessonTitle: z
        .string({ required_error: "Це поле є обов'язковим" })
        .min(2, { message: "Це поле не заповнене" }),
      homeworkId: z.string({ required_error: "Це поле є обов'язковим" }),
      isCompleted: z.enum(["Частково", "Виконав", "Не виконав"]),
    }),
  ),
});

const defaultValues: Pick<PersonalHomeworkResults, "homeworkIsDone"> = {
  homeworkIsDone: [
    {
      id: uuidv4(),
      date: new Date(),
      lessonTitle: "",
      homeworkId: "",
      isCompleted: "Не виконав",
    },
  ],
};

const inputLabel = "text-[0.8rem] font-medium";

const ParentsCabinetHomeworkInputs: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const allHomework = useStore((state) => state.homework);
  const getAllHomework = useStore((state) => state.getHomework);

  const allLessonTitles = allHomework?.map((lessons) => lessons.id);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { control, watch, resetField } = form;

  const subscibeGroup = watch("group");
  const group2Selected = subscibeGroup === "group2";
  const group3Selected = subscibeGroup === "group3";
  const arthorSelected = subscibeGroup === "arthor";

  useEffect(() => {
    getAllHomework(subscibeGroup);
  }, [subscibeGroup]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "homeworkIsDone",
  });

  const AppendHomeworkIsDoneHandler = () => {
    append({
      id: uuidv4(),
      date: new Date(),
      lessonTitle: "",
      homeworkId: "",
      isCompleted: "Не виконав",
    });
  };

  const renderGroup = (membersList: Members[]) => {
    return membersList.map((member) => {
      return (
        <SelectItem key={member.id} value={member.username}>
          {member.firstName}
        </SelectItem>
      );
    });
  };

  const handleSearchLessonTitle = (lessonId: string | number) =>
    allHomework?.find((lesson) => lesson.id === lessonId)?.lessonTitle;

  const handleLessonTitleChange = (lessonIds: (string | number)[]) => {
    return lessonIds?.map((lessonId) => {
      return (
        <SelectItem key={lessonId} value={lessonId.toString()}>
          {handleSearchLessonTitle(lessonId)}
        </SelectItem>
      );
    });
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newInputData = {
      ...data,
      homeworkIsDone: data.homeworkIsDone.map(function (homework) {
        return {
          ...homework,
          date: format(homework.date, "dd.MM.yyyy"),
          homeworkId: homework.lessonTitle,
          lessonTitle: handleSearchLessonTitle(homework.lessonTitle),
        };
      }),
    };
    console.log(newInputData);

    // try {
    //   setLoading(true);

    //   const response: Response = await fetchToChangeDataOnServer("user", newInputData);

    //   type Notification = {
    //     ok?: boolean;
    //   };

    //   const notification: Notification = await response.json();

    //   if (notification?.ok) {
    //     toast({
    //       title: `До користувача ${data.username} додано результати домашніх завдань по наступними темами: `,
    //       description: (
    //         <p className="mt-2 w-[340px] rounded-md py-4">
    //           {newInputData?.homeworkIsDone?.map((homework, index) => (
    //             <span key={index}>
    //               {homework.lessonTitle +
    //                 (newInputData?.homeworkIsDone.length - 1 !== index ? ", " : "")}
    //             </span>
    //           ))}
    //         </p>
    //       ),
    //     });
    //   }

    //   setLoading(false);
    //   resetField("homeworkIsDone");
    // } catch (error) {
    //   toast({
    //     title: "Помилка під час надсилання даних",
    //   });
    //   console.log(error);
    // }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6 w-full">
        <div className="flex space-x-5">
          <div className="flex flex-col space-y-5 p-6 border rounded-lg shadow-md self-start">
            {/* Type input */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={inputLabel}>Тип курсу</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Виберіть тип курсу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="front-end">Front-end</SelectItem>
                      <SelectItem value="react">React</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Group input */}
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={inputLabel}>Група</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            {/* Username input */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={inputLabel}>Ім&apos;я учасника</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={arthorSelected ? "Ja_wewykyj" : field.value}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Виберіть ім'я учасника" />
                    </SelectTrigger>
                    <SelectContent className="min-w-fit">
                      {group2Selected && renderGroup(GROUP_2_MEMBERS)}
                      {group3Selected && renderGroup(GROUP_3_MEMBERS)}
                      {arthorSelected && renderGroup(INDIVID_ARTHOR)}
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
                    name={`homeworkIsDone.${index}.date`}
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
                    name={`homeworkIsDone.${index}.lessonTitle`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-[375px]">
                        <FormLabel className={inputLabel}>Тема заняття</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Lesson #2 ..." />
                          </SelectTrigger>
                          <SelectContent className="min-w-fit">
                            {allLessonTitles && handleLessonTitleChange(allLessonTitles)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`homeworkIsDone.${index}.isCompleted`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className={inputLabel}>Статус виконання</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue="Не виконав">
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Статус" />
                          </SelectTrigger>
                          <SelectContent className="min-w-fit">
                            <SelectItem value="Частково">Частково</SelectItem>
                            <SelectItem value="Виконав">Виконав</SelectItem>
                            <SelectItem value="Не виконав">Не виконав</SelectItem>
                          </SelectContent>
                        </Select>
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

export default ParentsCabinetHomeworkInputs;
