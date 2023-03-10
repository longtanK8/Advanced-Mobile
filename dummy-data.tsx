// Dummy Datas

import { icons, images } from "./constants";
import { CategoryData, CurrentLocation, Restaurant, LocationSet } from "./types";
import { GetLatitude, GetLongitude } from "./location";
import { location } from "./constants/icons";
import { Value } from "react-native-reanimated";

export const initialCurrentLocation: CurrentLocation = {
  streetName: 'Vo Van Kiet St',
  gps: {
    latitude: 12.0398155,
    longitude: 106.6412238,
  },
};

export const exactLocation: CurrentLocation = {
  streetName: 'Unknown St',
  gps: {
    latitude: Number(GetLatitude()),
    longitude: Number(GetLongitude()),
  },
};

export const categoryData: CategoryData[] = [
  {
    id: 1,
    name: 'Rice',
    icon: icons.rice_bowl,
  },
  {
    id: 2,
    name: 'Noodles',
    icon: icons.noodle,
  },
  {
    id: 3,
    name: 'Hot Dogs',
    icon: icons.hotdog,
  },
  {
    id: 4,
    name: 'Salads',
    icon: icons.salad,
  },
  {
    id: 5,
    name: 'Burgers',
    icon: icons.hamburger,
  },
  {
    id: 6,
    name: 'Pizza',
    icon: icons.pizza,
  },
  {
    id: 7,
    name: 'Snacks',
    icon: icons.fries,
  },
  {
    id: 8,
    name: 'Sushi',
    icon: icons.sushi,
  },
  {
    id: 9,
    name: 'Desserts',
    icon: icons.donut,
  },
  {
    id: 10,
    name: 'Drinks',
    icon: icons.drink,
  },
];

// price rating
export const affordable = 1;
export const fairPrice = 2;
export const expensive = 3;

export const restaurantData: Restaurant[] = [
  {
    id: 1,
    name: 'Burger',
    rating: 4.8,
    categories: [5, 7],
    priceRating: affordable,
    photo: images.burger_restaurant_1,
    duration: '30 - 45 min',
    location: {
      latitude: 11.0523437,
      longitude: 106.6343313,
    },
    courier: {
      avatar: images.avatar_1,
      name: 'Amy',
    },
    menu: [
      {
        menuId: 1,
        name: 'Crispy Chicken Burger',
        photo: images.crispy_chicken_burger,
        description: 'Burger with crispy chicken, cheese and lettuce',
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: 'Crispy Chicken Burger with Honey Mustard',
        photo: images.honey_mustard_chicken_burger,
        description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: 'Crispy Baked French Fries',
        photo: images.baked_fries,
        description: 'Crispy Baked French Fries',
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 2,
    name: 'Pizza',
    rating: 4.8,
    categories: [2, 4, 6],
    priceRating: expensive,
    photo: images.pizza_restaurant,
    duration: '15 - 20 min',
    location: {
      latitude: 11.056737,
      longitude: 106.901871,
    },
    courier: {
      avatar: images.avatar_2,
      name: 'Jackson',
    },
    menu: [
      {
        menuId: 4,
        name: 'Hawaiian Pizza',
        photo: images.hawaiian_pizza,
        description: 'Canadian bacon, homemade pizza crust, pizza sauce',
        calories: 250,
        price: 15,
      },
      {
        menuId: 5,
        name: 'Tomato & Basil Pizza',
        photo: images.pizza,
        description:
          'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
        calories: 250,
        price: 20,
      },
      {
        menuId: 6,
        name: 'Tomato Pasta',
        photo: images.tomato_pasta,
        description: 'Pasta with fresh tomatoes',
        calories: 100,
        price: 10,
      },
      {
        menuId: 7,
        name: 'Mediterranean Chopped Salad ',
        photo: images.salad,
        description: 'Finely chopped lettuce, tomatoes, cucumbers',
        calories: 100,
        price: 10,
      },
    ],
  },
  {
    id: 3,
    name: 'Hotdogs',
    rating: 4.8,
    categories: [3],
    priceRating: expensive,
    photo: images.hot_dog_restaurant,
    duration: '20 - 25 min',
    location: {
      latitude: 11.054438,
      longitude: 106.671871,
    },
    courier: {
      avatar: images.avatar_3,
      name: 'James',
    },
    menu: [
      {
        menuId: 8,
        name: 'Chicago Style Hot Dog',
        photo: images.chicago_hot_dog,
        description: 'Fresh tomatoes, all beef hot dogs',
        calories: 100,
        price: 20,
      },
    ],
  },
  {
    id: 4,
    name: 'Sushi',
    rating: 4.8,
    categories: [8],
    priceRating: expensive,
    photo: images.japanese_restaurant,
    duration: '10 - 15 min',
    location: {
      latitude: 11.052837,
      longitude: 106.666313,
    },
    courier: {
      avatar: images.avatar_4,
      name: 'Ahmad',
    },
    menu: [
      {
        menuId: 9,
        name: 'Sushi sets',
        photo: images.sushi,
        description: 'Fresh salmon, sushi rice, fresh juicy avocado',
        calories: 100,
        price: 50,
      },
    ],
  },
  {
    id: 5,
    name: 'Cuisine',
    rating: 5.0,
    categories: [1, 2],
    priceRating: affordable,
    photo: images.noodle_shop,
    duration: '15 - 20 min',
    location: {
      latitude: 11.0398,
      longitude: 106.6411,
    },
    courier: {
      avatar: images.avatar_4,
      name: 'Muthu',
    },
    menu: [
      {
        menuId: 10,
        name: 'Kolo Mee',
        photo: images.kolo_mee,
        description: 'Noodles with char siu',
        calories: 200,
        price: 5,
      },
      {
        menuId: 11,
        name: 'Sarawak Laksa',
        photo: images.sarawak_laksa,
        description: 'Vermicelli noodles, cooked prawns',
        calories: 300,
        price: 8,
      },
      {
        menuId: 12,
        name: 'Nasi Lemak',
        photo: images.nasi_lemak,
        description: 'A traditional Malay rice dish',
        calories: 300,
        price: 8,
      },
      {
        menuId: 13,
        name: 'Nasi Briyani with Mutton',
        photo: images.nasi_briyani_mutton,
        description: 'A traditional Indian rice dish with mutton',
        calories: 300,
        price: 8,
      },
    ],
  },
  {
    id: 6,
    name: 'Dessets',
    rating: 4.9,
    categories: [9, 10],
    priceRating: affordable,
    photo: images.kek_lapis_shop,
    duration: '35 - 40 min',
    location: {
      latitude: 11.05234238,
      longitude: 106.45978313,
    },
    courier: {
      avatar: images.avatar_1,
      name: 'Jessie',
    },
    menu: [
      {
        menuId: 14,
        name: 'Teh C Peng',
        photo: images.teh_c_peng,
        description: 'Three Layer Teh C Peng',
        calories: 100,
        price: 2,
      },
      {
        menuId: 15,
        name: 'ABC Ice Kacang',
        photo: images.ice_kacang,
        description: 'Shaved Ice with red beans',
        calories: 100,
        price: 3,
      },
      {
        menuId: 16,
        name: 'Kek Lapis',
        photo: images.kek_lapis,
        description: 'Layer cakes',
        calories: 300,
        price: 20,
      },
    ],
  },
  {
    id: 7,
    name: 'Milk Tea',
    rating: 4.8,
    categories: [10],
    priceRating: affordable,
    photo: images.Okinawa_Milk_Tea,
    duration: '30 - 45 min',
    location: {
      latitude: 11.0523437,
      longitude: 106.6342213,
    },
    courier: {
      avatar: images.avatar_1,
      name: 'Amy',
    },
    menu: [
      {
        menuId: 17,
        name: 'Okainawa Milktea',
        photo: images.Okinawa_Milk_Tea,
        description: 'Fresh Milktea from Okinawa of Japan',
        calories: 200,
        price: 10,
      },
      {
        menuId: 18,
        name: 'Blueberry lced Tea',
        photo: images.blueberry_iced_tea,
        description: 'Blueberry and Tea, cold with Crushed Ice',
        calories: 250,
        price: 8,
      },
      {
        menuId: 19,
        name: 'Chocolate Pudding Cereal Drink',
        photo: images.chocolate_pudding,
        description: 'Chocolate with sweet pudding and cream',
        calories: 250,
        price: 11,
      },
    ],
  },
  {
    id: 8,
    name: 'Salad',
    rating: 5.0,
    categories: [4],
    priceRating: affordable,
    photo: images.vietnamese_salad,
    duration: '20 - 35 min',
    location: {
      latitude: 11.0523737,
      longitude: 106.6342253,
    },
    courier: {
      avatar: images.avatar_3,
      name: 'James',
    },
    menu: [
      {
        menuId: 20,
        name: 'Vietnamese Salad',
        photo: images.vietnamese_salad,
        description: 'Vietnamese Chicken Salad',
        calories: 110,
        price: 20,
      },
      {
        menuId: 21,
        name: 'Japanese Salad',
        photo: images.japanese_salad,
        description: 'Japanese Salad with salmon and eggs',
        calories: 100,
        price: 25,
      },
      {
        menuId: 22,
        name: 'Thai Salad',
        photo: images.thai_salad,
        description: 'Thai spicy salad with mango',
        calories: 120,
        price: 23,
      },
    ],
  },
];

export const categoriesMap: {[key: number]: string} = categoryData.reduce(
  (categoryMap, category: CategoryData) =>
    (categoryMap = {
      ...categoryMap,
      [category.id]: category.name,
    }),
  {},
);

export const restaurantsWithCategories: Restaurant[] = restaurantData.map((restaurant) => ({
  ...restaurant,
  categoryNames: restaurant.categories.map(
    (category: number) => categoriesMap[category],
  ),
}));