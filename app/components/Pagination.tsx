"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  currentPage: number;
  pageCount: number;
  itemsCount: number;
}

const Pagination = ({ currentPage, pageCount, itemsCount }: Props) => {
  const pages = Math.ceil(itemsCount / pageCount);
  const searchParams = useSearchParams();
  const router = useRouter();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (pages <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Button
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Text>
        Page {currentPage} of {pages}
      </Text>
      <Button
        color="gray"
        disabled={currentPage === pages}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        disabled={currentPage === pages}
        onClick={() => changePage(pages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
