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

const FormSchema = z.object({
  content: z
    .string()
    .min(10, {
      message: "Content must be at least 30 characters.",
    })
    .max(5000, {
      message: "Content must not be longer than 5000 characters.",
    }),
});

function GenerateLessons() {
  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await api.post("/topic", data);
    console.log(res);
    setMessage(res.data.message);
  }

  return (
    <>
      <Header />
      <div className="p-2 flex mx-auto items-center flex-col max-w-lg m-24">
        <p className="text-h1 mb-2">
          ✨ Create a lesson plan for any topic ✨
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-lg min-w-md"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your text content here"
                      className="mb-2"
                      rows={12}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mb-2" />
                </FormItem>
              )}
            />
            <Button className="w-[100%]" type="submit">
              Generate
            </Button>
          </form>
        </Form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
}

export default GenerateLessons;
