import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/util/interceptor";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "Content must be at least 10 characters.",
    })
    .max(5000, {
      message: "Content must not be longer than 5000 characters.",
    }),
});

function GenerateLessons() {
  const [topicId, setTopicId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const res = await api.post("/topic", data);
      setTopicId(res.data.message);
    } catch (err) {
      const error = err as AxiosError;
      if (error.status === 400) {
        setErrMsg(
          (error.response?.data as { message: string })?.message ||
            "An unknown error occurred",
        );
      }
    }
  }

  return (
    <div className="bg-dot h-screen">
      <Header />
      <div className="p-2 flex mx-auto items-center flex-col max-w-lg m-24">
        <p className="mb-4 text-center text-foreground font-semibold font-custom text-4xl">
          Learn any topic with interactvie lessons
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-lg md:w-md w-xs"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. I want to learn about the history of calendars"
                      className="mb-2 bg-background"
                      rows={12}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mb-2" />
                </FormItem>
              )}
            />
            <Button
              className="w-[100%]"
              type="submit"
              disabled={loading}
            >
              Generate
            </Button>
          </form>
        </Form>
        {topicId && (
          <Link to={"/topic/" + topicId}>
            <Button className="max-w-lg min-w-md mt-2">
              Go To Topic
            </Button>
          </Link>
        )}
        {errMsg && <p>{errMsg}</p>}
      </div>
    </div>
  );
}

export default GenerateLessons;
