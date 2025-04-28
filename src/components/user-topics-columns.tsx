import { TopicL1 } from "./topic-preview";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, Globe, UserLock } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "./ui/button";

export const userTopicColumns: ColumnDef<TopicL1>[] = [
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
      return <div className="w-32 md:w-auto text-wrap">{title}</div>;
    },
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
          <Clock size={16} strokeWidth={3} />
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
  {
    accessorKey: "is_public",
    header: () => <div className="hidden md:block">Visibility</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.getValue("is_public") ? (
          <Globe className="mx-auto size-4 text-primary" />
        ) : (
          <UserLock className="mx-auto size-4" />
        )}
      </div>
    ),
  },
];
