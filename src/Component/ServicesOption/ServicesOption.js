import React, { useState } from "react";
import style from "./ServicesOption.module.css";
import { getAllArticleCategoy, getAllSubArticleCategoy, getArticle } from "../../Api/Api";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

export default function ServicesOptionList() {
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate=useNavigate()

  useEffect(() => {
    handleAllCategory();
  }, []);

  const handleAllCategory = async () => {
    try {
      const response = await getAllArticleCategoy();

      if (response.status === true) {
        setAllCategory(response.data);
      } else {
        console.error('Error fetching categories:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const handleAllSubCategory = async (id) => {
    try {
      const response = await getAllSubArticleCategoy(id);
      setSubCategory(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error.message);
    }
  };
  const handleArticle = async (id) => {
    try {
      const response = await getArticle(id);
      localStorage.setItem("article",JSON.stringify(response.data))
      navigate("/SubArticle")
    } catch (error) {
      console.error('Error fetching subcategories:', error.message);
    }
  };

  return (
    <div className={style.main}>
      <div  className={style.Loader}>
      {allCategory.length === 0 ? <Loader /> : null}
      </div>
      <ul className={style.category}>
        {allCategory.map((item, index) => (
          <li
            key={item._id}
            onMouseEnter={() => {
              setSelectedCategory(item._id);
              handleAllSubCategory(item._id);
            }}
          >
            {item.category}
          </li>
        ))}
      </ul>
      <div className={style.option_box}>
        <ul className={style.option_list}>
          {allSubCategory.map((item, index) => (
            <li key={item._id} onClick={()=>handleArticle(item._id)}>{item.subCategory}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
