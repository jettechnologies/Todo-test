import {
  Home,
  Document,
  TaskSquare,
  Setting2,
  Stickynote,
  Folder2,
  People,
  Note,
  Call,
  NotificationBing,
  MenuBoard,
  MessageEdit,
  Edit,
} from "iconsax-reactjs";
import type { SidenavItem } from "@/components/ui";
import { Newspaper } from "lucide-react";

export const sideNavItems: SidenavItem[] = [
  { label: "Home", to: "/", icon: <Home size={18} /> },
  { label: "MKVanBinnen", to: "#", icon: <Stickynote size={18} /> },
  { label: "Document Management", to: "#", icon: <Folder2 size={18} /> },
  { label: "Patient Information", to: "#", icon: <People size={18} /> },
  { label: "Agenda", to: "#", icon: <Note size={18} /> },
  {
    label: "My Department",
    to: "#",
    icon: <Newspaper size={18} />,
    children: [
      { label: "News", to: "#" },
      { label: "Members", to: "#" },
      { label: "To-Do", to: "/todowy" },
      { label: "Form Task", to: "#" },
      { label: "Agenda", to: "#" },
      { label: "Follow up system", to: "#" },
      { label: "Group system", to: "#" },
    ],
  },
  { label: "Phone numbers", to: "#", icon: <Call size={18} /> },
  { label: "My to do Protocols", to: "#", icon: <TaskSquare size={18} /> },
  { label: "My Notifications", to: "#", icon: <NotificationBing size={18} /> },
  { label: "Knowledge Base", to: "#", icon: <MenuBoard size={18} /> },
  { label: "Super Admin", to: "#", icon: <MessageEdit size={18} /> },
  {
    label: "Admin",
    to: "#",
    icon: <Edit size={20} />,
    children: [
      { label: "Agenda", to: "#" },
      { label: "News", to: "#" },
      { label: "Poll", to: "#" },
      { label: "Department Rules", to: "#" },
      { label: "Follow up system ", to: "#" },
    ],
  },
];

// import type { SidenavItem } from "@/components/ui";

// export const sideNavItems: SidenavItem[] = [
//   {
//     label: "Todo",
//     to: "/todowy",
//   },
// ];
