"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { BsTrash3Fill } from "react-icons/bs";
import { useState } from "react";
import { cn, fetchToChangeDataOnServer, replacedSingleQuotes } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Homework } from "@/store/store";

const FormSchema = z.object({
  date: z.date({ required_error: "Це поле є обов'язковим" }),
  group: z.string({ required_error: "Це поле є обов'язковим" }),
  lessonTitle: z
    .string({ required_error: "Це поле є обов'язковим" })
    .min(2, { message: "Це поле необхідно заповнити" }),
  reading: z.object({
    id: z.string(),
    action: z.string({ required_error: "Це поле є обов'язковим" }),
    listOfThemes: z.array(
      z.object({
        id: z.string(),
        link: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле необхідно заповнити" }),
        title: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле необхідно заповнити" }),
        type: z.string({ required_error: "Це поле є обов'язковим" }),
      }),
    ),
  }),
  writting: z.object({
    id: z.string(),
    action: z.string({ required_error: "Це поле є обов'язковим" }),
    links: z.array(
      z.object({
        id: z.string(),
        link: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле необхідно заповнити" }),
        title: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле необхідно заповнити" }),
        type: z.string({ required_error: "Це поле є обов'язковим" }),
      }),
    ),
  }),
});

const styles = {
  inputContainer: "flex flex-col space-y-2",
  inputLabel: "text-[0.8rem] font-medium",
  inputError: "w-full px-3 py-2 border rounded focus:outline-none",
  spanError: "text-[0.8rem] font-medium text-red-500",
};

const HomeworkInput: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      lessonTitle: "",
      group: "",
      reading: {
        id: "1",
        action: "Прочитати теми: ",
        listOfThemes: [{ id: uuidv4(), link: "", title: "", type: "text" }],
      },
      writting: {
        id: "2",
        action: "Ознайомитися із практичними завданнями та тестами по темах: ",
        links: [{ id: uuidv4(), link: "", title: "", type: "text" }],
      },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const {
    fields: readingFields,
    append: readingAppend,
    remove: readingRemove,
  } = useFieldArray({
    control,
    name: "reading.listOfThemes",
  });

  const {
    fields: writtingFields,
    append: writtingAppend,
    remove: writtingRemove,
  } = useFieldArray({
    control,
    name: "writting.links",
  });

  const AppendReadingListHandler = () => {
    readingAppend({ id: uuidv4(), link: "", title: "", type: "text" });
  };
  const AppendWrittingListHandler = () => {
    writtingAppend({ id: uuidv4(), link: "", title: "", type: "text" });
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      const newHomework: Homework = {
        id: uuidv4(),
        lessonTitle: data.lessonTitle,
        date: format(data.date, "dd.MM.yyyy"),
        homework: [data.reading, data.writting],
        group: data.group,
      };
      console.log(newHomework);

      const response = await fetchToChangeDataOnServer(
        "homework",
        replacedSingleQuotes(newHomework),
      );

      type Notification = {
        msg?: string;
        updated?: boolean;
        done?: boolean;
      };

      const notification: Notification = await response.json();

      if (notification?.updated) {
        toast({
          title: notification?.msg,
        });
      }

      if (notification?.done) {
        toast({
          title: "Додано домашнє по наступним темам:",
          description: (
            <p className="mt-2 w-[340px] rounded-md py-4">
              <b>Читання: </b>{" "}
              {data.reading.listOfThemes?.map(
                (theme, index) =>
                  theme.title + (data?.reading?.listOfThemes.length - 1 !== index ? ", " : ""),
              )}
              ;
              <br />
              <b>Практичне: </b>{" "}
              {data.writting.links?.map(
                (link, index) =>
                  link.title + (data?.writting?.links.length - 1 !== index ? ", " : ""),
              )}
              ;
            </p>
          ),
        });
      }
      setLoading(false);
      reset();
    } catch (error) {
      toast({
        title: "Помилка під час надсилання даних",
      });
      console.log(error);
    }
  };

  const { inputContainer, inputLabel, inputError } = styles;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-screen-md mx-auto">
        <div className="space-y-4 p-6 border rounded-lg shadow-md">
          <div className={inputContainer}>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
              name="lessonTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={inputLabel}>Тема:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Lesson 1 HTML: Syntax, Structure, Tags"
                      {...field}
                      className={`${inputError} ${
                        errors?.lessonTitle ? "border-red-500" : "focus:border-accent"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reading.action"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={inputLabel}>Читання: </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`${inputError} ${
                        errors?.lessonTitle ? "border-red-500" : "focus:border-accent"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Читання */}
          {readingFields.map((fields, index) => {
            return (
              <div
                key={fields.id}
                className="relative flex flex-col space-y-3 p-5 hover:outline hover:outline-1 hover:outline-accent rounded-lg group">
                <div className={inputContainer}>
                  <FormField
                    control={form.control}
                    name={`reading.listOfThemes.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className={inputLabel}>Назва:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="HTML Семантика"
                            {...field}
                            className={`${inputError} ${
                              errors?.reading?.listOfThemes?.[index]?.title
                                ? "border-red-500"
                                : "focus:border-accent"
                            }`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={inputContainer}>
                  <FormField
                    control={form.control}
                    name={`reading.listOfThemes.${index}.link`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className={inputLabel}>Силка | Текст:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://w3schoolsua.github.io/html/html5_semantic_elements.html"
                            {...field}
                            className={`${inputError} ${
                              errors?.reading?.listOfThemes?.[index]?.link
                                ? "border-red-500"
                                : "focus:border-accent"
                            }`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <FormField
                    control={form.control}
                    name={`reading.listOfThemes.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Select onValueChange={field.onChange} required>
                          <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Тип" />
                          </SelectTrigger>
                          <SelectContent className="min-w-fit">
                            <SelectItem value="text">Текст</SelectItem>
                            <SelectItem value="a">Зовнішня силка</SelectItem>
                            <SelectItem value="link">Внутрішня силка</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 absolute transition-opacity -top-3 right-0"
                  onClick={() => readingRemove(index)}>
                  <BsTrash3Fill className="text-red-500" />
                </Button>
              </div>
            );
          })}
          <div className="flex justify-end space-x-3">
            <Button variant="ghost" onClick={AppendReadingListHandler}>
              Додати
            </Button>
          </div>
          <div className={inputContainer}>
            <FormField
              control={form.control}
              name="writting.action"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className={inputLabel}>Практичні: </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={`${inputError} ${
                        errors?.writting?.action ? "border-red-500" : "focus:border-accent"
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Практичні */}
          {writtingFields.map((fields, index) => {
            return (
              <div
                key={fields.id}
                className="relative flex flex-col space-y-3 p-5 hover:outline-1 hover:outline hover:outline-accent rounded-lg group">
                <div className={inputContainer}>
                  <FormField
                    control={form.control}
                    name={`writting.links.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className={inputLabel}>Назва: </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="HTML Семантика"
                            {...field}
                            className={`${inputError} ${
                              errors?.writting?.links?.[index]?.title
                                ? "border-red-500"
                                : "focus:border-accent"
                            }`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={inputContainer}>
                  <FormField
                    control={form.control}
                    name={`writting.links.${index}.link`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className={inputLabel}>Силка | Текст:</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="tasks/html_semantics"
                            {...field}
                            className={`${inputError} ${
                              errors?.writting?.links?.[index]?.link
                                ? "border-red-500"
                                : "focus:border-accent"
                            }`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <FormField
                    control={form.control}
                    name={`writting.links.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Select onValueChange={field.onChange} required>
                          <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Тип" />
                          </SelectTrigger>
                          <SelectContent className="min-w-fit">
                            <SelectItem value="text">Текст</SelectItem>
                            <SelectItem value="a">Зовнішня силка</SelectItem>
                            <SelectItem value="link">Внутрішня силка</SelectItem>
                            <SelectItem value="photo">Фото</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 absolute transition-opacity -top-3 right-0"
                  onClick={() => writtingRemove(index)}>
                  <BsTrash3Fill className="text-red-500" />
                </Button>
              </div>
            );
          })}
          <div className="flex justify-between space-x-3">
            <div>
              <FormField
                control={form.control}
                name="group"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Select onValueChange={field.onChange} required>
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Виберіть групу" />
                      </SelectTrigger>
                      <SelectContent className="min-w-fit">
                        <SelectItem value="group2">Група 2</SelectItem>
                        <SelectItem value="group3">Група 3</SelectItem>
                        <SelectItem value="arthor">Індивід Артур</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-center items-center">
              <Button variant="ghost" onClick={AppendWrittingListHandler}>
                Додати
              </Button>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Button type="submit">{loading ? "Виконую..." : "Записати"}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default HomeworkInput;
