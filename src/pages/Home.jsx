import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Categories, SortPopup, PizzaBlock } from "../components";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { fetchPizzas } from "../redux/actions/pizzas";
import { addPizzaToCart } from "../redux/actions/cart";

const categories = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];
const sortItems = [
  { name: "популярности", type: "popular", order: "desc" },
  { name: "цене", type: "price", order: "desc" },
  { name: "алфавиту", type: "name", order: "asc" }
];

const Home = () => {
  const dispatch = useDispatch();
  const pizzas = useSelector(state => state.pizzas.items);
  const cartItems = useSelector(state => state.cart.items);
  const isLoaded = useSelector(state => state.pizzas.isLoaded);
  const category = useSelector(state => state.filters.category);
  const sortBy = useSelector(state => state.filters.sortBy);

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [dispatch, category, sortBy]);

  const onSelectCategory = useCallback(
    index => {
      dispatch(setCategory(index));
    },
    [dispatch]
  );

  const onSelectSortType = useCallback(
    type => {
      dispatch(setSortBy(type));
    },
    [dispatch]
  );

  const handleAddPizzaToCart = item => {
    dispatch(addPizzaToCart(item));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categories}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map(item => (
          <PizzaBlock
            onAddPizza={handleAddPizzaToCart}
            key={item.id}
            addedInCartCount={cartItems[item.id] && cartItems[item.id].items.length}
            isLoaded={isLoaded}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
