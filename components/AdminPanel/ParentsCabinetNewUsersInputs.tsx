"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { fetchToChangeDataOnServer } from "@/lib/utils";
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
import { BsTrash3Fill } from "react-icons/bs";
import { Input } from "../ui/input";
import { styles } from "@/lib/styles";
import { ParentCabinetShowAllUsersData } from "../index";
import { Separator } from "../ui/separator";

const FormSchema = z.object({
  group: z
    .string({ required_error: "Це поле є обов'язковим" })
    .min(2, { message: "Це поле не заповнене" }),
  usersList: z
    .array(
      z.object({
        id: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле не заповнене" }),
        name: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле не заповнене" }),
        label: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле не заповнене" }),
        password: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле не заповнене" }),
        role: z
          .string({ required_error: "Це поле є обов'язковим" })
          .min(2, { message: "Це поле не заповнене" }),
      }),
    )
    .nonempty({ message: "Необхідно додати хоча б одного користувача" }),
});

const { inputLabel, spanError } = styles;

const ParentsCabinetNewUsersInputs: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const allUsers = useStore((state) => state.users);
  const getAllUsers = useStore((state) => state.getUsers);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      group: "",
      usersList: [
        {
          id: uuidv4(),
          name: "",
          label: "",
          role: "",
          password: "",
        },
      ],
    },
  });

  const {
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };
    fetchData();
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "usersList",
  });

  const AppendHomeworkIsDoneHandler = () => {
    append({
      id: uuidv4(),
      name: "",
      label: "",
      role: "student",
      password: "",
    });
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newUsers = {
      ...data,
      usersList: data.usersList.map((user) => {
        return {
          group: data.group,
          ...user,
        };
      }),
    };

    try {
      setLoading(true);

      const response: Response = await fetchToChangeDataOnServer("users", newUsers);

      type Notification = {
        ok?: boolean;
      };

      const notification: Notification = await response.json();

      if (notification?.ok) {
        toast({
          title: `Для групи ${newUsers.group} додано наступних користувачів: `,
          description: (
            <p className="mt-2 w-[340px] rounded-md py-4">
              {newUsers?.usersList?.map((user, index) => (
                <span key={user.id}>
                  {user.name + (newUsers.usersList.length - 1 !== index ? ", " : "")}
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6 w-full">
          <div className="flex space-x-5">
            <div className="flex flex-col space-y-5 p-6 border rounded-lg shadow-md self-start">
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
                      name={`usersList.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className={inputLabel}>Ім&apos;я студента</FormLabel>
                          <FormControl>
                            <Input
                              list="users"
                              placeholder="Олександр"
                              {...field}
                              className="max-w-[240px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`usersList.${index}.label`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className={inputLabel}>Username студента</FormLabel>
                          <FormControl>
                            <Input placeholder="Ja_wewykyj" {...field} className="max-w-[240px]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`usersList.${index}.password`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className={inputLabel}>Пароль</FormLabel>
                          <FormControl>
                            <Input placeholder="12345" {...field} className="max-w-[240px]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`usersList.${index}.role`}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className={inputLabel}>Роль</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue="student">
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Виберіть роль" />
                            </SelectTrigger>
                            <SelectContent className="min-w-fit">
                              <SelectItem value="admin">Адмін</SelectItem>
                              <SelectItem value="student">Студент</SelectItem>
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
              {errors.usersList?.root && (
                <span className={spanError}>{errors.usersList?.root?.message}</span>
              )}
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
      <Separator className="my-10" />
      <ParentCabinetShowAllUsersData usersData={allUsers} />
    </>
  );
};

export default ParentsCabinetNewUsersInputs;
