import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory, getAllCategoryUser } from "../../actions";

/**
 * @author
 * @function MenuHeader
 **/

const MenuHeader = (props) => {
  const category = useSelector((state) => state.category);
  // const categoryUser = useSelector((state) => state.categoryUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    // dispatch(getAllCategoryUser());
  }, []);

  // useEffect(() => {
  //   console.log("category====>", categoryUser);
  // }, [categoryUser]);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a href={`/${category.slug}?cid=${category._id}`}>
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children?.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  return (
    <div className="menuHeader">
      <ul>
        {category.categories?.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
