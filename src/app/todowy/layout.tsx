import { SideNavLayout } from "@/layouts/sidenav-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <SideNavLayout>{children}</SideNavLayout>;
};

export default Layout;
