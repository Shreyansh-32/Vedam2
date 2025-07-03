import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { prisma } from "@/lib/prisma";
import Card from "../Card";

const MostPopular = async () => {
  const grouped = await prisma.order.groupBy({
    by: "productId",
    _sum:{
        quantity : true,
    },
    orderBy: {
      _sum : {
        quantity : "desc"
      }
    },
    take: 6,
  });

  const productIds = grouped.map((g) => g.productId);

  const items = await prisma.product.findMany({
    where: {
      id: { in: productIds },
    },
  });

  return (
    <div className="bg-background my-4 ml-4 p-4 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-amber-400 inline-block pb-1">
        Most Popular
      </h2>
      <Carousel className="relative">
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="mt-2 basis-3/6 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <Card {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-black shadow-md" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 text-black shadow-md" />
      </Carousel>
    </div>
  );
};

export default MostPopular;
