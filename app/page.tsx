import { Topbar } from '@/components/shared';
import { Categories } from '@/components/shared/categories';
import { Container } from '@/components/shared/container';
import { Filters } from '@/components/shared/filters';

import { Header } from '@/components/shared/header';
import { Pagination } from '@/components/shared/pagination';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { SortPopup } from '@/components/shared/sort-popup';
import { Title } from '@/components/shared/title';

import { prisma } from '@/libs/prisma';
// import { GetSearchParams, findPizzas } from '@/shared/lib/find-pizzas';

export default async function Home({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const products = await prisma.product.findMany();
  //   const categories = await findPizzas(searchParams);
  console.log('prisma', products);

  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-5">
        <Title size="lg" text="All pizzas" className="font-extrabold" />
      </Container>

      <Topbar />

      <Container className="pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Список товаров */}
          <div className="flex-1">
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
function findPizzas(searchParams: URLSearchParams) {
  throw new Error('Function not implemented.');
}
