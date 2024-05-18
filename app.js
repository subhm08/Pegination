// import data from './collection.json';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './card-style.css';
const Display = (props) => {
    const { title, id, thumbnail, price, brand, category, stock, rating, discountPercentage } = props;

    return (
        <div className="card-container">
            <div className="image-container">
                <img src={thumbnail} alt="image" />
            </div>
            <div className="specifications">
                <div className="title-container">
                    <div className="model-name">
                        <h2>{title}</h2>
                    </div>
                    <div className="model-year"><b>{stock}</b></div>
                </div>
                <div className="details-container">
                    <span className="detail capacity"><i className="icon bi bi-people"></i>{brand}</span>
                    <span className="detail fuel-type"><i className="icon bi bi-fuel-pump"></i>{category}</span>
                    <span className="detail milage"><i className="icon bi bi-speedometer"></i>{rating}</span>
                    <span className="detail mechenigm"><i className="icon bi bi-car-front-fill"></i> {discountPercentage}</span>
                </div>

                <div className="price-container">
                    <span className="rent"><b>$</b>{price}</span>
                    <button className="like"><i className="bi bi-heart"></i></button>
                    <button className="rent-btn">Rent now</button>
                </div>
            </div>

        </div>
    )
}

const Element = () => {
    const [Page, setPage] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [param] = useState(["title", "brand"]);

    const fetchData = async () => {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setDataList(data.products);
    }
    const product = Object.values(dataList);



    const pagination = (index) => {
        if (index >= 1 && index <= dataList.length / 6) {
            setPage(index);
            console.log(Page);
        }
    }

    function search(items) {
        return items.filter((item) => {
            return param.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchText.toLowerCase()) > -1
                );
            });
        });
    }
    console.log(search(dataList))

    useEffect(() => { fetchData() }, []);

    return (
        <div className="page">

            <div class="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => {

                        setSearchText(e.target.value)
                    }}
                />
            </div>

            <div className="products">
                {
                    search(dataList).slice(Page * 6 - 6, Page * 6).map((data) => <Display{...data} />)
                }
            </div>
            <div class="pagination-container">
                <div class="info"><p>{Page * 6 - 6 + 1} to {Page * 6} from {dataList.length}</p></div>
                <div class="paginate">
                    <button className={Page > 1 ? "index" : "disabled"} onClick={() => pagination(Page - 1)}><i class="bi bi-arrow-left"></i></button>
                    {
                        [...Array(Math.floor(dataList.length / 6)).keys()].map((i) =>
                            <button className={Page === i + 1 ? "page_selected" : "index"} onClick={() => pagination(i + 1)} >{i + 1}</button>)
                    }

                    <button className={Page < dataList.length / 6 ? "index" : "disabled"} onClick={() => pagination(Page + 1)}><i class="bi bi-arrow-right"></i></button>
                </div>
            </div>
        </div>

    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Element />);