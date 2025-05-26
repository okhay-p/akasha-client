import { TopicL1 } from "./topic-preview";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, User } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const columns: ColumnDef<TopicL1>[] = [
  {
    accessorKey: "emoji",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <div className="size-6 shadow-sm rounded-sm grid place-items-center">
          {row.getValue("emoji")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      if (!title) return null;
      return (
        <Link
          to={`/topic/${(row.original as TopicL1).id}`}
          className="contents"
        >
          <div className="w-32 md:w-auto text-wrap hover:underline">{title}</div>
        </Link>)
    },
  },
  {
    accessorKey: "created_by",
    header: () => (
      <User className="hidden md:block" size={16} strokeWidth={2} />
    ),
    cell: ({ row }) => (
      <div className="hidden md:block">
        {row.getValue("created_by")}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          <Clock size={16} strokeWidth={2} />
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const time = DateTime.fromISO(row.getValue("created_at"));

      return (
        <div className="max-w-12">
          {time.toRelative({ style: "narrow" })}
        </div>
      );
    },
  },
];
