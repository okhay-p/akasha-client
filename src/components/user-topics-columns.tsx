import { TopicL1 } from "./topic-preview";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, Globe, UserLock } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import api from "@/util/interceptor";
import { toast } from "sonner";

interface UserTopicColumnsProps {
  refreshData: () => Promise<void>;
}

export const getUserTopicColumns = ({ refreshData }: UserTopicColumnsProps): ColumnDef<TopicL1>[] => [
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
  {
    accessorKey: "is_public",
    header: () => <div className="hidden md:block">Visibility</div>,
    cell: ({ row }) => (
      <div className="text-right">
        {row.getValue("is_public") ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="z-10 mx-auto w-full">
              <Globe className="mx-auto size-4 text-primary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={async ()=>{
                try {
                  await api.put(`/topic/${row.original.id}/private`)
                } catch (error) {
                  toast.error("Error updating the topic visibility")
                  console.log(error)
                }
                await refreshData();
              }}>
                Mark as private
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="z-10 mx-auto w-full">
                <UserLock className="mx-auto size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={async ()=>{
                try {
                  await api.put(`/topic/${row.original.id}/public`)
                } catch (error) {
                  toast.error("Error updating the topic visibility")
                  console.log(error)
                }
                await refreshData();
              }}>
                Mark as public
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    ),
  },
];
