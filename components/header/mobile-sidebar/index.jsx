"use client";

import { Sidebar } from "react-pro-sidebar";

import Link from "next/link";

import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

const menus = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Cancers",
    href: "/cancers",
  },
  {
    id: 4,
    title: "Find a doctor",
    href: "/doctors",
  },
  {
    id: 6,
    title: "News Feed",
    href: "/news",
  },
  {
    id: 5,
    title: "Blog",
    href: "/blog",
  },
];

const Index = () => {
  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      <Sidebar>
        <ul className="px-3">
          {menus?.map((menu) => (
            <li className="p-2 list_itm">
              <Link href={menu?.href}>{menu?.title}</Link>
            </li>
          ))}
        </ul>
        <div className="px-3  pt-3">

        {/* <div className="btn-box ">
          <Link href="/contact" className="theme-btn btn-style-one">
            Contact Us
          </Link>
        </div> */}
        </div>
      </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;
