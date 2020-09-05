import React from "react";
import PropTypes from "prop-types";

const Categories = ({ activeCategory, items, onClickCategory }) => {
  const handleChangeActiveItem = index => {
    onClickCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? "active" : ""}
          onClick={() => handleChangeActiveItem(null)}
        >
          Все
        </li>
        {items &&
          items.map((name, index) => (
            <li
              key={`${name}_${index}`}
              className={activeCategory === index ? "active" : ""}
              onClick={() => handleChangeActiveItem(index)}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  //activeCategory: PropTypes.oneOf([PropTypes.number, null]).isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func
};

Categories.defaultProps = { activeCategory: null };

export default Categories;
