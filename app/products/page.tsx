import Navbar from "@/components/Navbar/Navbar";
import { ProductCard } from "@/components/ProductCard";
import ProductSidebar from "@/components/ProductSidebar";
import { getBooks, getBooksCount } from "@/lib/getBooks";
import { Books } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Footer from "@/components/Footer/Footer";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const page = parseInt((params.page as string) || "1");
  const category = params.category as string | undefined;
  const sort = params.sort as string | undefined;
  const search = params.search as string | undefined;
  const productPerPage = 12;

  const books: Books[] = await getBooks({
    page,
    productPerPage,
    category,
    sort,
    search,
  });
  const numberofPages = Math.ceil(await getBooksCount({search , category})/productPerPage);

  return (
    <div className="w-full min-h-[100vh] bg-background">
      <Navbar />
      <div className="w-full bg-background flex lg:flex-row flex-col">
        <ProductSidebar />
        <div className="w-full flex flex-wrap gap-4 p-4 lg:p-8 justify-center md:justify-start md:gap-5">
          {books.length === 0 && (
            <div className="w-full text-center text-gray-500">
              <p>No products found.</p>
            </div>
          )}
          {books.map((book) => (
            <div
              key={book.id}
              className="md:mt-3 lg:w-[23%] md:w-[31%] sm:w-[100%] w-full"
            >
              <ProductCard item={book}></ProductCard>
            </div>
          ))}
          {numberofPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                  className={page === 1 ? "hidden" : ""}
                    href={`products/?page=${page - 1}${
                      category ? `&category=${category}` : ""
                    }${sort ? `&sort=${sort}` : ""}${
                      search ? `&search=${search}` : ""
                    }`}
                  />
                </PaginationItem>
                {Array.from({ length: numberofPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href={`/products?page=${i + 1}${
                        category ? `&category=${category}` : ""
                      }${sort ? `&sort=${sort}` : ""}${
                        search ? `&search=${search}` : ""
                      }`}
                      isActive={i + 1 === page}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {numberofPages > 5 && page < numberofPages - 2 && (
                  <PaginationEllipsis />
                )}
                <PaginationItem>
                  <PaginationNext
                    href={`/products?page=${page + 1}${
                      category ? `&category=${category}` : ""
                    }${sort ? `&sort=${sort}` : ""}${
                      search ? `&search=${search}` : ""
                    }`}
                    className={page >= numberofPages ? "hidden" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
