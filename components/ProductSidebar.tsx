"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ListFilter } from "lucide-react";

export default function ProductSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "none";
  const sort = searchParams.get("sort") || "none";

  function handleCategoryChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "none") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`/products?${params.toString()}`);
  }

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "none") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="">
      <div className="hidden lg:flex lg:flex-col w-[100%] p-4 h-[100vh] sticky top-0 bg-gray-100 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl">Filter</h2>
        <h4 className="text-lg mt-3">Category</h4>
        <RadioGroup
          value={category}
          onValueChange={handleCategoryChange}
          className="mt-2 space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="none"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="none">None</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Hindi-literature"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="Hindi-literature">Hindi-literature</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Biography"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="Biography">Biography</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Finance"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="Finance">Finance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Fiction"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="Fiction">Fiction</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Classic"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="Classic">Classic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Religious"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="Religious">Religious</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="Business"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="Business">Business</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="History"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="History">History</Label>
          </div>
        </RadioGroup>
        <h4 className="text-lg mt-5">Sort By</h4>
        <RadioGroup
          value={sort}
          onValueChange={handleSortChange}
          className="mt-2 space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="none"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="none">None</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="low-high"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="low-high">Price: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="high-low"
              className="text-gray-500 border-gray-500 dark:border-gray-200"
            />
            <Label htmlFor="high-low">Price: High to Low</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="cursor-pointer bg-gray-100 dark:bg-gray-700 p-2">
            <ListFilter></ListFilter>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[50%]">
            <SheetHeader>
              <SheetTitle>Filter</SheetTitle>
            </SheetHeader>
            <RadioGroup
              value={category}
              onValueChange={handleCategoryChange}
              className="pl-4 space-y-1"
            >
              <h4 className="text-lg">Category</h4>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="none"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="none">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Hindi-literature"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="Hindi-literature">Hindi-literature</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Biography"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="Biography">Biography</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Finance"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="Finance">Finance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Fiction"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="Fiction">Fiction</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Classic"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="Classic">Classic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Religious"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="Religious">Religious</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="Business"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="Business">Business</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="History"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="History">History</Label>
              </div>
            </RadioGroup>
            <RadioGroup
              value={sort}
              onValueChange={handleSortChange}
              className="mt-2 pl-4 space-y-1"
            >
              <h4 className="text-lg mt-5">Sort By</h4>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="none"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="none">None</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="low-high"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="low-high">Price: Low to High</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="high-low"
                  className="text-gray-500 border-gray-500 dark:border-gray-200"
                />
                <Label htmlFor="high-low">Price: High to Low</Label>
              </div>
            </RadioGroup>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
