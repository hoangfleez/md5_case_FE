import React, {useEffect, useState} from 'react';
import {deleteProduct, getProduct,editProduct} from "../../sevives/productService.js";
import {useDispatch, useSelector} from "react-redux";
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalEdit from "./ModalEdit.jsx";
import './List.css'
import AddProduct from "./AddProduct.jsx";


const List = () => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState()
    const handleClose = () => {
        setIsShowModalAddNew(false)
    }

    const dispatch = useDispatch();

    const [showEditModal, setShowEditModal] = useState(false);
    const [dataProductEdit, setDataProductEdit] = useState({});
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalPages, setTotalPages] = useState(0)


    const products = useSelector(({products}) => {
        return products.list;
    });




    const handleUpdateProduct = (product) => {
        const clonedProducts = [...products];
        const index = clonedProducts.findIndex((item) => item.id === product.id);
        if (index >= 0) {
            clonedProducts[index] = product;
            dispatch(getProduct(clonedProducts));
        }
    };


    useEffect(() => {
        dispatch(getProduct());
    }, [])


    const handleEditProduct = (product) => {
        setDataProductEdit(product);
        setShowEditModal(true);

    }

    return (
        <>




            <button
            className="btn-btn-success"
            onClick={() => setIsShowModalAddNew(true)}
            >Add new Product</button>
            <div style={{display:"flex", flexWrap:"wrap"}}>
            {products && products.map(item => (
                <div className="grid__column-2-4" key={item.id}>
                        <a className="home-product-item" style={{textDecoration:"none"}}>
                            <div className="home-product-item__img" style={{backgroundImage: `url(${item.image})`}}></div>
                            <h4 className="home-product-item__name">{item.name}</h4>

                            <div className="home-product-item__price" style={{justifyContent:"space-between"}}>
                                <span className="home-product-item__price-old">${item.price}</span>
                                <span style={{marginLeft:"100px"}} className="home-product-item__price-current">Số lượng {item.quantity}</span>
                            </div>


                            <div className="home-product-item__action">

                                <div className="home-product-item__rating">
                                    <i className="home-product-item__star--gold fa-solid fa-star"></i>
                                    <i className="home-product-item__star--gold fa-solid fa-star"></i>
                                    <i className="home-product-item__star--gold fa-solid fa-star"></i>
                                    <i className="home-product-item__star--gold fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div className="home-product-item_origin">
                                <span className="home-product-item__brand">{item.category.name}</span>
                                <span className="home-product-item_origin-name">Nhật bản</span>
                            </div>
                            <div className="home-product-item__favourite">
                                <i className="fa-solid fa-check"></i>
                                <span>Yêu thích</span>

                            </div>
                            <div className="home-product-item_sale-off">
                                <span className="home-product-item_sale-off-percent">10%</span>
                                <span className="home-product-item_sale-off-label"> Giảm</span>
                            </div>

                        <div style={{display:"flex", justifyContent:"space-around", padding:10}}>
                        <button style={{border:"none", backgroundColor:"transparent"}} onClick={()=>dispatch(deleteProduct(item.id))}><i style={{fontSize:30, color:"red"}} className="fa-solid fa-trash-can"></i></button>
                        <button
                        onClick={() => handleEditProduct(item)}
                        style={{border:"none", backgroundColor:"transparent"}}
                        >
                        <i style={{fontSize:30}} className="fa-solid fa-pen-to-square"></i>
                        </button>
                            </div>
                        </a>
                        
                        
                    </div>

            ))}
            </div>
            <AddProduct
                show ={isShowModalAddNew}
                handleClose={handleClose}

            />

            <ModalEdit
            show = {showEditModal}
            dataProductEdit={dataProductEdit}
            handleClose={handleClose}
            handleUpdateProduct={handleUpdateProduct}
            />

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={6}
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </>
    );
};

export default List;