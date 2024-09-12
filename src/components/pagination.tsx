import * as React from "react";
import { MoveRight, MoveLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface IPaginationProps {
  page: number;
  setPage: any;
  maxPage: number;
}

const Pagination: React.FunctionComponent<IPaginationProps> = (props) => {
  return (
    <div className=" flex gap-4 text-2xl">
      <Button
        disabled={props.page == 1}
        className={"border bg-white shadow-m px-3 py-3"}
        onClick={() => {
          if (props.page > 1) {
            props.setPage(props.page - 1);
          }
        }}
      >
        <ChevronLeft className="text-black hover:text-white"></ChevronLeft>
      </Button>
      <Button
        disabled={props.page == props.maxPage}
        className={"border bg-white  shadow-md opacity-100 px-3 py-3"}
        onClick={() => {
          if (props.page < props.maxPage) {
            props.setPage(props.page + 1);
          }
        }}
      >
        <ChevronRight className="text-black hover:text-white"></ChevronRight>
      </Button>
    </div>
  );
};

export default Pagination;
