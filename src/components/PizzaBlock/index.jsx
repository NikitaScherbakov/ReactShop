import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import LoadingBlock from "./LoadingBlock";
import Button from "../Button";

const PizzaBlock = ({
  id,
  name,
  imageUrl,
  price,
  types,
  sizes,
  isLoaded,
  onAddPizza,
  addedInCartCount
}) => {
  const availableDuffTypes = ["тонкое", "традиционное"];
  const availablePizzaSizes = [26, 30, 40];
  const [activeDuffType, setActiveDuffType] = useState(types[0]);
  const [activePizzaSize, setActivePizzaSize] = useState(0);

  const onSelectDuffType = index => {
    setActiveDuffType(index);
  };

  const onSelectPizzaSize = index => {
    setActivePizzaSize(index);
  };

  const handleAddPizza = () => {
    const item = {
      id,
      name,
      imageUrl,
      price,
      size: availablePizzaSizes[activePizzaSize],
      type: availableDuffTypes[activeDuffType]
    };
    onAddPizza(item);
  };

  if (!isLoaded) {
    return <LoadingBlock />;
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {availableDuffTypes.map((type, index) => (
            <li
              key={type}
              className={classNames({
                active: activeDuffType === index,
                disabled: !types.includes(index)
              })}
              onClick={() => onSelectDuffType(index)}
            >
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {availablePizzaSizes.map((size, index) => (
            <li
              key={size}
              className={classNames({
                active: activePizzaSize === index,
                disabled: !sizes.includes(size)
              })}
              onClick={() => onSelectPizzaSize(index)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <Button onClick={handleAddPizza} className="button--add" outline>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedInCartCount && <i>{addedInCartCount}</i>}
        </Button>
      </div>
    </div>
  );
};

PizzaBlock.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  types: PropTypes.arrayOf(PropTypes.number).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
  isLoaded: PropTypes.bool,
  onAddPizza: PropTypes.func,
  addedInCartCount: PropTypes.number
};

PizzaBlock.defaultProp = {
  isLoaded: false
};

export default PizzaBlock;
