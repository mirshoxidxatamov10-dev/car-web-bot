"use client";
import {
  Button,
  Container,
  Grid,
  NumberInput,
  Paper,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const page = () => {
  const {
    data: category,
    error,
    isLoading,
  } = useSWR("https://lesson-bot-node.onrender.com/api/categories", fetcher);

  const catSellect = category?.map((item) => {
    return { value: item._id, label: item.name };
  });

  const navigate = useRouter();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      image: "",
      category: "",
      price: "",
      quantity: "",
    },
    validate: {
      name: (value) =>
        value.length <= 2
          ? "Maxsulot nomi 2 ta harfdan ko'p bo'lishi kerak"
          : null,
      image: (value) =>
        value.length <= 2 ? "Maxsulot Rasmi bo'lishi kerak" : null,
      category: (value) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return "Kategoriya tanlanishi shart";
        }
      },
      price: (value) => {
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
          return "Maxsulot narxi to'g'ri kiritilishi kerak";
        }
        return null;
      },

      quantity: (value) => {
        if (value === "" || isNaN(Number(value)) || Number(value) <= 0) {
          return "Miqdor kiritilishi kerak";
        }
        return null;
      },
    },
  });

  const CreateProduct = async (values) => {
    try {
      let res = await fetch(
        "https://lesson-bot-node.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Xatolik yuz berdi");
      }

      navigate.push("/dashboard");

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <Container>failed to load</Container>;
  if (isLoading) return <Container>loading...</Container>;

  return (
    <Container size={"xl"} py={"sm"}>
      <Link href={"/dashboard"}>
        <Button variant="light">Ortga Qaytish</Button>
      </Link>
      <form onSubmit={form.onSubmit(CreateProduct)}>
        <Paper p={"md"} mt={"md"} withBorder>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                withAsterisk
                label="Maxsluot nomi"
                placeholder="Maxsluot nomi"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                withAsterisk
                label="Image url"
                placeholder="Image url"
                key={form.key("image")}
                {...form.getInputProps("image")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput
                withAsterisk
                label="Narxi"
                placeholder="Narxi"
                key={form.key("price")}
                {...form.getInputProps("price")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput
                withAsterisk
                label="Miqdor"
                placeholder="Miqdor"
                key={form.key("quantity")}
                {...form.getInputProps("quantity")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                withAsterisk
                label="Kategoriya"
                placeholder="kategoriya tanlang"
                data={catSellect}
                key={form.key("category")}
                {...form.getInputProps("category")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Textarea
                resize="vertical"
                label="Tarif"
                placeholder="Qisqacha malumot"
                key={form.key("description")}
                {...form.getInputProps("description")}
              />
            </Grid.Col>
          </Grid>
          <Button type="submit" mt={"md"}>
            Elonni qo'shish
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default page;
