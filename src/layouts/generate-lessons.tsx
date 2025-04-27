import api from "@/util/interceptor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AutoResizeTextarea } from "@/components/auto-resize-textarea";
import {
  CircleHelp,
  CircleMinus,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const fileSizeLimit = 15 * 1024 * 1024; // 15MB

const FormSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(2000, { message: "Content must be less than 2000 characters" })
    .refine((value) => value.trim().length > 0, {
      message: "Content cannot be just whitespace",
    }),
  is_public: z.boolean(),
  only_content: z.boolean(),
  num_of_lessons: z.coerce
    .number()
    .min(3, {
      message: "The number of lessons must be between 3 and 10.",
    })
    .max(10, {
      message: "The number of lessons must be between 3 and 10.",
    }),
  attachment: z
    .instanceof(FileList)
    .optional()
    .refine((fileList) => (fileList?.length ?? 0) <= 1, {
      message: "Only one PDF file can be uploaded.",
    })
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        return fileList.item(0)?.type === "application/pdf";
      },
      { message: "Only the PDF file type is supported. " },
    )
    .refine(
      (fileList) => (fileList?.item(0)?.size ?? 0) <= fileSizeLimit,
      {
        message: "File size should not exceed 15MB",
      },
    ),
});

type FormValues = {
  content: string;
  is_public: boolean;
  only_content: boolean;
  num_of_lessons: number;
  attachment?: FileList;
};

function GenerateLessons() {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      is_public: false,
      only_content: false,
      num_of_lessons: 3,
    },
  });

  const [loading, setLoading] = useState(false);

  const fileRef = form.register("attachment");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    toast("We are generating lessons for you. Give us a few seconds");

    console.log(data);

    try {
      const formData = new FormData();
      formData.append("content", data.content);
      formData.append("is_public", String(data.is_public)); // Convert boolean to string
      formData.append("only_content", String(data.only_content)); // Convert boolean to string
      formData.append("num_of_lessons", String(data.num_of_lessons)); // Convert number to string

      if (data.attachment && data.attachment[0]) {
        formData.append("attachment", data.attachment[0]);
      }

      const res = await api.post("/topic", formData, {
        headers: {
          "Content-Type": "multipart/form-data", //redundant but good to have
        },
      });
      toast.success("Your lessons are ready!", {
        duration: 5000,
        action: {
          label: "Go to topic",
          onClick: () => navigate("/topic/" + res.data.message),
        },
        actionButtonStyle: {
          backgroundColor: "var(--primary)",
          color: "oklch(0.985 0 0)",
        },
      });
    } catch (err) {
      const error = err as AxiosError;
      if (error.status === 400) {
        const msg =
          (error.response?.data as { message: string })?.message ||
          "An unknown error occurred";
        toast.error(msg, {
          style: {
            color: "var(--destructive)",
          },
        });
      } else {
        toast.error("Got some errors on our end. We're fixing on it.", {
          style: {
            color: "var(--destructive)",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100svh-48px)] w-full max-w-2xl space-y-4 mx-auto flex flex-col px-2 font-custom">
      <div className="flex-1 grid place-items-center text-4xl font-medium text-primary text-center">
        Learn any topic with interactive lessons
      </div>

      <div className="mb-4 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AutoResizeTextarea
                        placeholder="Your content goes here"
                        value={field.value}
                        onChange={field.onChange}
                        maxHeight={200}
                        className="min-h-[80px] text-base py-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex mt-5 justify-between gap-2">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="attachment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <label
                            htmlFor="attachment"
                            className="cursor-pointer rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs hover:shadow-md flex gap-1 items-center"
                          >
                            <Paperclip className="size-4" />
                            <div className="hidden md:block">
                              Attach PDF
                            </div>
                            <Input
                              id="attachment"
                              type="file"
                              {...fileRef}
                              className="sr-only"
                            />
                          </label>
                          {field.value?.length ? (
                            <div className="-mt-4 mb-1 md:mt-0 flex items-center">
                              <span className="text-sm text-muted-foreground">
                                {field.value.item(0)?.name}
                                <button
                                  type="button"
                                  className="ml-2 size-5 text-destructive"
                                  onClick={() =>
                                    field.onChange(undefined)
                                  }
                                >
                                  <CircleMinus className="size-4" />
                                </button>
                              </span>
                            </div>
                          ) : (
                            <span className="-mt-4 mb-1 md:mt-0 text-sm text-muted-foreground">
                              You can attach a PDF file.
                            </span>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="num_of_lessons"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            className="w-16"
                            type="number"
                            max={10}
                            min={3}
                            {...field}
                          />
                        </FormControl>
                        <FormLabel>Number of lessons</FormLabel>
                      </div>
                      <FormMessage className="-mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="is_public"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Public</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="size-6 rounded-sm -ml-1"
                          >
                            <CircleHelp
                              className="size-4"
                              strokeWidth={1.5}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <p className="font-custom">
                            Choose the visibility of the lessons created
                          </p>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="only_content"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Use Content Only</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className="size-6 rounded-sm -ml-1"
                          >
                            <CircleHelp
                              className="size-4"
                              strokeWidth={1.5}
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <p className="font-custom">
                            Toggle to generate lessons based on the
                            content provided only
                          </p>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="h-10 px-4 w-auto"
                type="submit"
                size="icon"
                disabled={loading}
              >
                <Sparkles className="h-5 w-5" />
                <div>Generate</div>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default GenerateLessons;
