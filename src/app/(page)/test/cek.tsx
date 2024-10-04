"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { useRef } from "react";
import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  const formSchema = z.object({
    subject: z.string().min(5, { message: "min 5 karakter" }),
    caption: z.string().min(5, { message: "min 5 karakter" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      subject: "",
      caption: "",
    },
  });

  function onSubmit(value: z.infer<typeof formSchema>) {
    console.log(value);
  }

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
  };

  const quillRef = useRef<any>();
  return (
    <div className="m-auto w-[720px]">
      <form>
        <Label>Subject :</Label>
        <Controller
          name="subject"
          render={({ field }) => <Input className="mb-4" {...field}></Input>}
        />
        <Controller
          name="caption"
          render={({ field }) => (
            <ReactQuill
              className=" w-full h-28  inline-block rounded-b-2xl"
              modules={modules}
              theme="snow"
            ></ReactQuill>
          )}
        />
      </form>
    </div>
  );
};

export default App;
