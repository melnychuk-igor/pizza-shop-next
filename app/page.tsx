import { Topbar } from '@/components/shared';
import { Categories } from '@/components/shared/categories';
import { Container } from '@/components/shared/container';
import { Filters } from '@/components/shared/filters';

import { Header } from '@/components/shared/header';
import { Pagination } from '@/components/shared/pagination';
import { ProductsGroupList } from '@/components/shared/products-group-list';
import { SortPopup } from '@/components/shared/sort-popup';
import { Title } from '@/components/shared/title';

import { prisma } from '@/libs/prisma'

export default async  function Home() {
  const users = await prisma.user.findMany()

  

  return (
    <>
      <Container className="mt-5">
        <Title size="lg" text="All pizzas" className="font-extrabold" />

        <ul>
      {users.map(u => (
        <li key={u.id}>{u.email}</li>
      ))}
    </ul>

      </Container>

      {/* <div style={{ height: '100px' }}></div> */}

      <Topbar />

      <Container className="pb-14">
        <div className="flex gap-[60px]">
          <div className='w-[250px]'>
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
            {/* items={[1, 2, 3, 4, 5]} */}
              <ProductsGroupList title="Pizzas" categoryId={1} items={[
                {
                  id: 1,
                  name: 'Маргарита',
                  price: 390,
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                  items: [{ price : 390 }],
                },
                {
                  id: 2,
                  name: 'Маргарита',
                  price: 390,
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                  items: [{ price : 390 }],
                },
                {
                  id: 3,
                  name: 'Маргарита',
                  price: 390,
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                  items: [{ price : 390 }],
                },
                {
                  id: 4,
                  name: 'Маргарита',
                  price: 390,
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                  items: [{ price : 390 }],
                },
              ]} />
              <ProductsGroupList title="Combo" categoryId={2} items={[
                {
                  id: 1,
                  name: 'Маргарита',
                  price: 390,
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                  items: [{ price : 390 }],
                },
                {
                  id: 2,
                  name: 'Маргарита',
                  price: 390,
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                  items: [{ price : 390 }],
                },
                {
                  id: 3,
                  name: 'Маргарита',
                  price: 390,
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                  items: [{ price : 390 }],
                },
                {
                  id: 4,
                  name: 'Маргарита',
                  price: 390,
                  imageUrl: 'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                  items: [{ price : 390 }],
                },
              ]} />
            </div>

            <div className="flex items-center gap-6 mt-12">
              <Pagination pageCount={3} />
              <span className="text-sm text-gray-400">5 из 65</span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
