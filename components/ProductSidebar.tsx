"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
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
    params.delete("page");
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
      <div className="hidden lg:flex lg:flex-col w-[100%] p-6 h-[100vh] sticky top-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent mb-2">
            Filter
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full"></div>
        </div>
        
        <div className="space-y-8 overflow-y-auto flex-1 pr-2">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              Category
            </h4>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <RadioGroup
                value={category}
                onValueChange={handleCategoryChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="none"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="none" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    All Categories
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="Hindi-literature"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="Hindi-literature" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Hindi Literature
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="Biography"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="Biography" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Biography
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="Finance"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="Finance" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Finance
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="Fiction"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="Fiction" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Fiction
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="Classic"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="Classic" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Classic
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="Religious"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="Religious" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Religious
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="Business"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="Business" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Business
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="History"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="History" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    History
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              Sort By
            </h4>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <RadioGroup
                value={sort}
                onValueChange={handleSortChange}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="none"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="none" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Default
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="low-high"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="low-high" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Price: Low to High
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                  <RadioGroupItem
                    value="high-low"
                    className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                  />
                  <Label htmlFor="high-low" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Price: High to Low
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger className="cursor-pointer bg-gradient-to-r p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium">
            <ListFilter className="w-5 h-5" />
            <span>Filters</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[50%] bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                <ListFilter className="w-6 h-6 text-amber-500" />
                Filter
              </SheetTitle>
              <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-500 rounded-full"></div>
            </SheetHeader>
            
            <div className="space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Category
                </h4>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <RadioGroup
                    value={category}
                    onValueChange={handleCategoryChange}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="none"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="none" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        All Categories
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="Hindi-literature"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="Hindi-literature" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Hindi Literature
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="Biography"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="Biography" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Biography
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="Finance"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="Finance" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Finance
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="Fiction"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="Fiction" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Fiction
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="Classic"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="Classic" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Classic
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="Religious"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="Religious" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Religious
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="Business"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="Business" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Business
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="History"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="History" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        History
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Sort By
                </h4>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                  <RadioGroup
                    value={sort}
                    onValueChange={handleSortChange}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="none"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="none" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Default
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="low-high"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="low-high" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Price: Low to High
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group">
                      <RadioGroupItem
                        value="high-low"
                        className="border-2 border-gray-300 dark:border-gray-500 text-amber-600 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500"
                      />
                      <Label htmlFor="high-low" className="text-gray-700 dark:text-gray-300 font-medium cursor-pointer group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Price: High to Low
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}