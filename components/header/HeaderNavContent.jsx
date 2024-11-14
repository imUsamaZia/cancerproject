"use client";

import Link from "next/link";

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

const HeaderNavContent = () => {
  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          {menus?.map((menu) => (
            <li key={menu.id}>
              <Link href={menu?.href}>
                <span>{menu?.title}</span>
              </Link>
            </li>
          ))}

          {/* End homepage menu items */}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
