"use client";
import Image from "next/image";
import { useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="w-[80%] flex flex-col bg-white rounded-lg ring-1 ring-gray-300">
          <div
            className="bg-white flex justify-between items-center  h-[60px] m-4"
            onClick={() => toggleAccordion(index)}>
            {item.title}
            {openIndex === index ? (
              <Image src="/up.png" alt="up icon" width={16} height={16} />
            ) : (
              <Image src="/down.png" alt="down icon" width={16} height={16} />
            )}{" "}
          </div>
          {openIndex === index && (
            <div className="px-4 pb-4">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
