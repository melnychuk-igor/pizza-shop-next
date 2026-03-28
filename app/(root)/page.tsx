import {
  Container,
  Filters,
  Title,
  TopBar,
  ProductsGroupList,
  Stories,
} from '@/shared/components/shared';
import { Suspense } from 'react';
import { GetSearchParams, findPizzas } from '@/shared/lib/find-pizzas';

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const categories = await findPizzas(searchParams);

  return (
    <>
      <Container className="mt-10 hidden lg:block">
        <Title text="All pizzas" size="lg" className="font-extrabold leading-[1.2]" />
      </Container>

      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Stories />

      <Container className="mt-10 pb-14">
        <div className="flex justify-between gap-12">
          {/* Filters */}
          <div className="w-[250px] fixed lg:static top-0 left-0 bg-white pl-4 pt-4 z-5 hidden lg:block">
            <Suspense>
              <Filters className="" />
            </Suspense>
          </div>

          {/* Products list */}
          <div className="flex-1 mx-auto max-w-[720px] lg:max-w-full">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
