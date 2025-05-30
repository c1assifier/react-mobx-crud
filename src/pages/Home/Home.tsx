import { Table } from "@/components/Table";
import { Container } from "../../components/Container";
import { ThemeToggle } from "@/components/ThemeToggle.tsx";

export const Home = () => {
  return (
    <Container>
      <ThemeToggle />
      <Table />
    </Container>
  );
};
