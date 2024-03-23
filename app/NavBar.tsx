"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { FaRegUser } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import Spinner from "./components/Spinner";
import { data } from "autoprefixer";
import { TbLogout, TbLogout2 } from "react-icons/tb";
import { IoLogInOutline } from "react-icons/io5";

const NavBar = () => {
  return (
    <nav className="border-2 mb-5 px-4 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const curentPage = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <ul className="flex space-x-6 ">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === curentPage,
            })}
            // className={`${
            //   link.href === curentPage ? "text-zinc-1000" : "text-zinc-500"
            // } hover:text-zinc-800 transition-colors`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Spinner />;

  if (status === "unauthenticated")
    return (
      <Flex align="center">
        <TbLogout />
        <Link
          href="/api/auth/signin"
          onClick={() => signIn(undefined, { callbackUrl: "/" })}
        >
          Login
        </Link>
      </Flex>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {session?.user?.image ? (
            <Avatar
              src={session?.user?.image!}
              size="2"
              radius="full"
              fallback="?"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          ) : (
            <IconButton radius="full" color="gray">
              <FaRegUser />
            </IconButton>
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session?.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Flex align="center">
              <TbLogout2 />
              <Link
                href="/api/auth/signout"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                LogOut
              </Link>
            </Flex>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      {/* <Button onClick={() => signOut()}></Button> */}
    </Box>
  );
};

export default NavBar;
