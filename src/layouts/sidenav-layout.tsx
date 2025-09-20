import { Grid, GridItem } from "@chakra-ui/react";
import { Header, SideNav } from "@components/ui";
import { sideNavItems } from "@/data/sidenav";

export const SideNavLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      templateAreas={`"nav header"
                            "nav main"`}
      gridTemplateRows="90px auto"
      gridTemplateColumns="250px 1fr"
      minHeight="100dvh"
      maxWidth="1540px"
      mx="auto"
    >
      <GridItem area="header">
        <Header />
      </GridItem>
      <GridItem area="nav">
        <SideNav items={sideNavItems} />
      </GridItem>
      <GridItem area="main" background="var(--light-purple-300)">
        {children}
      </GridItem>
    </Grid>
  );
};
