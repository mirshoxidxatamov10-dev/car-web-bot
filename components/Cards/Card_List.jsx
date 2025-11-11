import { Card, Grid, Image, Group, Text, Button } from "@mantine/core";
import React from "react";

const Card_List = ({ data }) => {
  return (
    <>
      <Grid gutter={"xs"}>
        {data?.map((item) => {
          return (
            <Grid.Col key={item._id} span={{ base: 6, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="xs" radius="sm" withBorder>
                <Card.Section>
                  <Image
                    height={160}
                    fit="cover"
                    src={
                      item.image ||
                      "https://mma.prnewswire.com/media/1420527/Logo.jpg?p=facebook"
                    }
                    alt="Norway"
                  />
                </Card.Section>

                <Text fw={500} size="sm" mt={"xs"} lineClamp={1}>
                  {item.name}
                </Text>
                <Text fw={"bold"} size="sm" mt={"xs"}>
                  {item.price} so'm
                </Text>

                <Group mt={"md"} grow gap={"xs"}>
                  <Button color="red" size="compact-xs">
                    Remove
                  </Button>
                  <Button color="blue" size="compact-xs">
                    Add
                  </Button>
                </Group>
              </Card>
            </Grid.Col>
          ); 
        })}
      </Grid>
    </>
  );
};

export default Card_List;
