"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface ReactQuillProps {}

const PostForm: React.FC<ReactQuillProps> = () => {
  const formSchema = z.object({
    subject: z.string().min(5),
    caption: z.string().min(5),
  });

  const { handleSubmit, control } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      subject: "",
      caption: "",
    },
  });
  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic"],
        ["image"],
      ],
    },
  };

  const onSubmit = (data: any) => {
    console.log("haloo");
    console.log(data);
  };

  return (
    <Card className="w-[720px]">
      <CardHeader className="font-extrabold">FORM :</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Subject :</Label>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => <Input className="mb-4" {...field}></Input>}
          />
          <Label>Caption :</Label>
          <div className="w-full">
            <Controller
              name="caption"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  className="mb-4 h-72 inline-block w-full rounded-t-lg"
                  modules={modules}
                  theme="snow"
                  {...field}
                />
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;
