import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const mockNotifications = [
  { id: 1, title: "New comment", message: "New comment on your post", read: false },
  { id: 2, title: "A new follower", message: "You have a new follower", read: true },
  { id: 3, title: "Password changed", message: "Your password was changed", read: false },
];

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-xl text-white"
          style={{ backgroundColor: "#FF6767" }}
        >
          <Bell className="w-5 h-5" />
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="absolute -top-1 -right-1 text-black bg-white text-xs rounded-xl w-4 h-4 flex items-center justify-center">
              {notifications.filter((n) => !n.read).length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((n) => (
          <div key={n.id}>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault(); // giữ menu không đóng
                handleToggle(n.id);
              }}
              className={n.read ? "text-gray-500" : "font-semibold"}
            >
              {n.title}
            </DropdownMenuItem>

            {/* Chi tiết hiển thị khi mở */}
            {expandedId === n.id && (
              <div className="px-4 py-2 text-sm text-gray-600 bg-gray-50 border-t">
                {n.message}
              </div>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
