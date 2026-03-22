export const categories = [
  {
    name: 'Pizzas',
  },
  {
    name: 'Breakfast',
  },
  {
    name: 'Snacks',
  },
  {
    name: 'Milkshakes',
  },
  {
    name: 'Drinks',
  },
];

export const _ingredients = [
  {
    name: 'Cheese Stuffed Crust',
    price: 2.0,
    imageUrl:
      'https://pizza-shop-next.vercel.app/assets/images/ingredients/99f5cb91225b4875bd06a26d2e842106.png',
  },
  {
    name: 'Creamy Mozzarella',
    price: 1.0,
    imageUrl:
      'https://pizza-shop-next.vercel.app/assets/images/ingredients/cdea869ef287426386ed634e6099a5ba.png',
  },
  {
    name: 'Cheddar & Parmesan',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A22FA54A81411E9AFA69C1FE796.png',
  },
  {
    name: 'Jalapeño Peppers',
    price: 1.0,
    imageUrl:
      'https://pizza-shop-next.vercel.app/assets/images/ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
  },
  {
    name: 'Tender Chicken',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A39D824A82E11E9AFA5B328D35A.png',
  },
  {
    name: 'Mushrooms',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A22FA54A81411E9AFA67259A324.png',
  },
  {
    name: 'Ham',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A39D824A82E11E9AFA61B9A8D61.png',
  },
  {
    name: 'Spicy Pepperoni',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A22FA54A81411E9AFA6258199C3.png',
  },
  {
    name: 'Spicy Chorizo',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A22FA54A81411E9AFA62D5D6027.png',
  },
  {
    name: 'Pickled Cucumbers',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A21DA51A81211E9EA89958D782B.png',
  },
  {
    name: 'Fresh Tomatoes',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A39D824A82E11E9AFA7AC1A1D67.png',
  },
  {
    name: 'Red Onion',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A22FA54A81411E9AFA60AE6464C.png',
  },
  {
    name: 'Pineapple Chunks',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A21DA51A81211E9AFA6795BA2A0.png',
  },
  {
    name: 'Italian Herbs',
    price: 0.5,
    imageUrl:
      'https://pizza-shop-next.vercel.app/assets/images/ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
  },
  {
    name: 'Bell Pepper',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A22FA54A81411E9AFA63F774C1B.png',
  },
  {
    name: 'Feta Cheese Cubes',
    price: 1.0,
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/ingredients/000D3A39D824A82E11E9AFA6B0FFC349.png',
  },
  {
    name: 'Meatballs',
    price: 1.0,
    imageUrl:
      'https://pizza-shop-next.vercel.app/assets/images/ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Ham & Mushroom Omelette',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE7970321044479C1D1085457A36EB.webp',
    categoryId: 2,
  },
  {
    name: 'Pepperoni Omelette',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE94ECF33B0C46BA410DEC1B1DD6F8.webp',
    categoryId: 2,
  },
  {
    name: 'Latte',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 2,
  },
  {
    name: 'Ham & Cheese Sandwich',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE796FF0059B799A17F57A9E64C725.webp',
    categoryId: 3,
  },
  {
    name: 'Chicken Nuggets',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE7D618B5C7EC29350069AE9532C6E.webp',
    categoryId: 3,
  },
  {
    name: 'Oven-Baked Potatoes with Sauce 🌱',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EED646A9CD324C962C6BEA78124F19.webp',
    categoryId: 3,
  },
  {
    name: 'Dodster',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE796F96D11392A2F6DD73599921B9.webp',
    categoryId: 3,
  },
  {
    name: 'Spicy Dodster 🌶️🌶️',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE796FD3B594068F7A752DF8161D04.webp',
    categoryId: 3,
  },
  {
    name: 'Oreo Milkshake',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/milk-shake.webp',
    categoryId: 4,
  },
  {
    name: 'Berry Milkshake',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/milk-shake-oreo.webp',
    categoryId: 4,
  },
  // {
  //   name: 'Oreo Cookie Milkshake',
  //   imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE796FA1F50F8F8111A399E4C1A1E3.webp',
  //   categoryId: 4,
  // },
  // {
  //   name: 'Classic Milkshake 👶',
  //   imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE796F93FB126693F96CB1D3E403FB.webp',
  //   categoryId: 4,
  // },
  {
    name: 'Irish Cappuccino',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE7D61999EBDA59C10E216430A6093.webp',
    categoryId: 5,
  },
  {
    name: 'Caramel Cappuccino',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE7D61AED6B6D4BFDAD4E58D76CF56.webp',
    categoryId: 5,
  },
  {
    name: 'Coconut Latte',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE7D61B19FA07090EE88B0ED347F42.webp',
    categoryId: 5,
  },
  {
    name: 'Americano',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE7D61B044583596548A59078BBD33.webp',
    categoryId: 5,
  },
  {
    name: 'Latte',
    imageUrl: 'https://pizza-shop-next.vercel.app/assets/images/products/11EE7D61B0C26A3F85D97A78FEEE00AD.webp',
    categoryId: 5,
  },
];

export const sortOptions = [
  { label: 'Price ↑', value: 'price_asc' },
  { label: 'Price ↓', value: 'price_desc' },
  { label: 'Name A-Z', value: 'name_asc' },
  { label: 'Name Z-A', value: 'name_desc' },
];