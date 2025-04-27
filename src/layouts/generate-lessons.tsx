import api from "@/util/interceptor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AutoResizeTextarea } from "@/components/auto-resize-textarea";
import { CircleHelp, Sparkles } from "lucide-react";
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
});

type FormValues = {
  content: string;
  is_public: boolean;
  only_content: boolean;
  num_of_lessons: number;
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    toast("We are generating lessons for you. Give us a few seconds");

    try {
      const res = await api.post("/topic", data);
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
