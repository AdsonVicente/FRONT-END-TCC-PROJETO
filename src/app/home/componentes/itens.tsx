"use client";
import React from "react";
import { FaBook, FaBible } from "react-icons/fa";
import Link from "next/link";

const IconsSection: React.FC = () => {
  const items = [
    {
      icon: <FaBible size={30} />,
      label: "Liturgia",
      link: "/liturgia-diaria",
    },
    {
      icon: <FaBook size={30} />,
      label: "Formações",
      link: "/formacao",
    },
  ];

  return (
    <section className="flex justify-center flex-wrap gap-8 py-8">
      {items.map((item, idx) => {
        const content = (
          <div
            className="flex flex-col items-center justify-center w-28 h-28 bg-white rounded-full shadow-md hover:shadow-lg transition"
          >
            {item.icon}
            <span className="text-center text-sm mt-2">{item.label}</span>
          </div>
        );

        return item.link ? (
          <Link href={item.link} key={idx}>
            {content}
          </Link>
        ) : (
          <div key={idx}>{content}</div>
        );
      })}
    </section>
  );
};

export default IconsSection;
