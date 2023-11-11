import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategoryUser } from "../../actions";

import "./style.category.css";
const Categories = () => {
  const categoryUser = useSelector((state) => state.categoryUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoryUser());
  }, []);

  useEffect(() => {
    console.log("category cat====>", categoryUser);
  }, [categoryUser]);
  return (
    <div className="categories-div">
      <h2 className="pb-4">Categories</h2>
      <div className="category-wrapper">
        {categoryUser?.categoriesUser?.map((category, index) => {
          if (category.categoryImage)
            return (
              <div className="category flex" data-aos="zoom-in" key={index}>
                {category.categoryImage && (
                  <a href={`/${category.slug}?cid=${category._id}`}>
                    <div className="rounded-circle z-depth-2 shadow category-img">
                      <img
                        alt="category"
                        src={category.categoryImage}
                        data-holder-rendered="true"
                      ></img>
                    </div>
                  </a>
                )}
                <p>{category.name}</p>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Categories;
