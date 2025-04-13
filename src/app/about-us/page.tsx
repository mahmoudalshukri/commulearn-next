import Accordion from "@/components/Accordion";
import MainNavbar from "@/components/MainNavbar";
import Image from "next/image";

interface AccordionItem {
  title: unknown;
  content: string;
}

const Page = () => {
  const accordionItems: AccordionItem[] = [
    {
      title: (
        <div className="flex gap-3 justify-center items-center text-lg font-bold">
          <Image src="/people.png" alt="people" width={20} height={20} />
          <p>About Us</p>
        </div>
      ),
      content:
        "The Community Skill Swap Platform is designed to facilitate skill-sharing among community members. It provides an online space where users can exchange skills, learn new things, and build stronger connections within their communities. By promoting collaboration, mutual support, and continuous learning, the platform fosters a culture of knowledge exchange in a seamless and accessible way.",
    },
    {
      title: (
        <div className="flex gap-3 justify-center items-center text-lg font-bold">
          <Image src="/goal.png" alt="vision" width={20} height={20} />
          <p>Vision</p>
        </div>
      ),
      content:
        "To create a connected and empowered community where individuals can freely share knowledge, learn from each other, and enhance their personal and professional growth through skill exchange.",
    },
    {
      title: (
        <div className="flex gap-3 justify-center items-center text-lg font-bold">
          <Image src="/mission.png" alt="mission" width={20} height={20} />
          <p>Mission</p>
        </div>
      ),
      content: `To bridge the gap between individuals who have skills to offer and those who want to learn.
                To create an inclusive, safe, and interactive platform for skill-sharing.
                To encourage lifelong learning and collaboration within communities.
                To provide opportunities for people to enhance their skills without financial barriers.
                To foster trust, engagement, and networking among users.
                Who Are We?
                We are a group of dedicated individuals passionate about fostering community-driven learning and collaboration. Our team consists of software engineers and researchers from the University of Palestine(Ahmed Abu Hani, Ayah Anber, Shahd Abu Salah, Malak Abu Salman, Huda Musallam), working under the guidance of Dr. Abdalhamid Zughbor. Through our platform, we aim to revolutionize the way people connect and exchange skills, making learning more accessible, cost-effective, and socially enriching.`,
    },
  ];

  return (
    <div className="">
      <MainNavbar />
      <div className="bg-gray-100">
        {/* About Us Banner */}
        <div className="bg-[url(/about-img.png)] h-[475px] bg-cover flex justify-center items-center text-white text-4xl sm:text-5xl font-extrabold px-4">
          About Us
        </div>

        {/* Accordion Section */}
        <div className="px-4 sm:px-8 py-6">
          <Accordion items={accordionItems} />
        </div>
      </div>
    </div>
  );
};

export default Page;
