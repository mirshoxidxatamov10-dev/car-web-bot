"use client";
import Card_List from "@/components/Cards/Card_List";
import App_Nav from "@/components/Nav/App_Nav";
import { Container } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const page = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://lesson-bot-node.onrender.com/api/products/category/${id}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Container>loading...</Container>;
  return (
    <div>
      <App_Nav />
      <Container size={"xl"} py={"md"}>
        <Card_List data={data} />
      </Container>
    </div>
  );
};

export default page;
