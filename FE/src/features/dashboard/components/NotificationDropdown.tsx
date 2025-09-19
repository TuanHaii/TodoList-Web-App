import { useState } from 'react';
import { DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from '@/shared/components/ui/dropdown-menu';
import { Bell } from "lucide-react";
import { Button } from '@/shared/components/ui/button';
import { title } from 'process';

// mock data for notifications
const mockNotifications = [
  { id: 1,title:'New comment', message: 'New comment on your post', read: false },
  { id: 2,title:'A new follower', message: 'You have a new follower', read: true },
  { id: 3,title:'Password changed', message: 'Your password was changed', read: false },
];
export default function NotificationDropdown() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [selectedNotification, setSelectedNotification] = useState<(typeof mockNotifications)[0] | null>(null);
    const handleSelect = (id: number) =>
      {
        const noti = notifications.find(n => n.id ===id) || null
        if(noti){
          setNotifications((prev) =>
          prev.map((n) => (n.id === id)))
        }
      } 
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
          {/* Badge hiển thị số lượng chưa đọc */}
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="absolute -top-1 -right-1 text-black bg-white text-xs rounded-xl w-4 h-4 flex items-center justify-center">
              {notifications.filter((n) => !n.read).length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50">
        <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((n) => (
          <DropdownMenuItem
            key={n.id}
            className={n.read ? "text-gray-500" : "font-semibold"}
          >
            {n.message}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}