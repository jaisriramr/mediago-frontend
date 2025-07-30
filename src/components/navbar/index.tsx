"use client";

import Image from "next/image";
import "./index.css";
import Link from "next/link";
import { Button, Dropdown, Input, MenuProps, message } from "antd";
import {
  CaretDownOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = React.useState(false);
  const [notificationItems, setNotificationItems] = React.useState<any>();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchParams = useSearchParams();
  const query: any = searchParams.get("q");

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    if (query && query.length > 0) {
      setSearchQuery(query);
    }
    console.log({ query });
  }, [query]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      handleSearch();
    }
  }, [searchQuery]);

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href={"/account"} className="flex items-center gap-x-2">
          <UserOutlined />
          Account
        </Link>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "Logout",
      key: "3",
      onClick: () => {},
    },
  ];

  useEffect(() => {
    const fetchNotifications = [];

    const titles = [
      "Season Finale",
      "New Trailer",
      "Episode Out Now",
      "Don't Miss It",
      "Now Streaming",
    ];
    const times = [
      "1 day ago",
      "2 days ago",
      "3 weeks ago",
      "1 week ago",
      "Just now",
    ];

    for (let i = 0; i < 5; i++) {
      fetchNotifications.push({
        key: `${i}`,
        label: (
          <div className="notification-box flex gap-4 items-center p-2">
            <Image
              className="notification-image rounded-md"
              src="/assets/background-image.png"
              alt="Notification Icon"
              width={80}
              height={60}
            />
            <div className="notification-content text-sm">
              <h6 className="font-bold text-white">{titles[i]}</h6>
              <p className="text-gray-300 text-xs">{times[i]}</p>
            </div>
          </div>
        ),
      });
    }

    setNotificationItems(fetchNotifications);
  }, []);

  return (
    <nav className="h-[80px] px-[100px] flex items-center justify-between navbar-container">
      <div className="flex items-center justify-between gap-x-[40px]">
        <Link href={"/browse"}>
          <Image src="/assets/MediaGo.svg" alt="logo" width={120} height={40} />
        </Link>
        <Link href={"/browse"} className="text-[16px]">
          Home
        </Link>
        <Link href={"/browse/tv-shows"} className="text-[16px]">
          TV Shows
        </Link>
        <Link href={"/browse/movies"} className="text-[16px]">
          Movies
        </Link>
      </div>
      <div className="flex items-center justify-between gap-x-[20px]">
        {!isSearchVisible && searchQuery.length == 0 && (
          <Image
            src="/assets/search.svg"
            alt="Search Icon"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          />
        )}
        {(isSearchVisible || searchQuery.length > 0) && (
          <Input
            onBlur={() => setIsSearchVisible(!isSearchVisible)}
            prefix={<SearchOutlined />}
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        )}

        <Dropdown
          menu={{ items: notificationItems }}
          trigger={["click"]}
          placement="bottomRight"
          overlayClassName="notification-dropdown"
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <Image
              src="/assets/notification.svg"
              alt="Notification Icon"
              width={24}
              height={24}
            />
          </a>
        </Dropdown>

        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          placement="bottomRight"
          overlayClassName="profile-dropdown"
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <Image
              src="/assets/user-profile.svg"
              alt="User Icon"
              width={24}
              height={24}
            />
            <CaretDownOutlined />
          </a>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
