import Image from "next/image";

function Card({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col justify-center w-full sm:w-[45%] md:w-[45%] lg:w-[22%] h-64 items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-amber-100">
      <Image
        src={`/${icon}`}
        alt={title}
        width={100}
        height={100}
        className="text-black"
      />
      <h3 className="mt-4 text-xl text-center font-semibold dark:text-black">{title}</h3>
      <p className="mt-2 text-center dark:text-black">{description}</p>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      title: "Affordable books",
      description: "Quality read at accessible prices.",
      icon: "FeatBook.svg",
    },
    {
      title: "Wide selection",
      description: "From classics to contemporary reads.",
      icon: "Featstack.svg",
    },
    {
      title: "Sustainable Mission",
      description: "Giving new life to old books.",
      icon: "Featsus.svg",
    },
    {
      title: "Empowering Communities",
      description: "Supporting ragpickers through every purchase.",
      icon: "Featcom.svg",
    },
  ];

  return (
    <div className="w-full px-4 py-10 flex flex-wrap gap-6 justify-center mt-12 ">
      {features.map((feature, index) => (
        <Card
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </div>
  );
}
