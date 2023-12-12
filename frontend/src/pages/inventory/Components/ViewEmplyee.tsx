import { Button, Col, Form, Row } from "react-bootstrap";
import Loading from "../../../components/Loading";
import { useEffect, useState } from "react";
import { getRequest, putRequest } from "../../../api/baseApi";
import ImageUpload from "../../../components/ImageUpload";

const ViewEmployee = ({
    id,
    handleClose,
    isClass,
}: {
    id: string;
    handleClose: () => void;
    isClass: string;
}) => {
    const [product, setProduct] = useState<any>({})
    const [productItems, setProductItems] = useState<Array<any>>([])
    const [url, setUrl] = useState<any>('')
    useEffect(() => {
        if (id) {
            let fillterProducts = {
                _id: id
            }
            getRequest('/products', `filter=${JSON.stringify(fillterProducts)}&pageSize=1&page=1`)
                .then(data => {
                    setProduct(data.data[0])
                    setUrl(data.data[0].url)
                    if (data.data[0]?.products_items_item?.length > 0) {
                        let filter = { "_id": data.data[0]?.products_items_item }
                        getRequest('/product_items', `filter=${JSON.stringify(filter)}&pageSize=10&page=1`)
                            .then(data => setProductItems(data.data))
                    }
                })
        }
    }, [])

    const changeImage = () => {
        putRequest('/products/' + id, {
            url
        })
            .then(() => console.log('first'))
    }
    return (
        <>
            <div
                className={`popup-info main-view-order ${isClass === "active" ? "opened" : ""
                    }`}
            >
                <div className="popup-info-inner">
                    <div className="title-popup">
                        <h2>Thông tin nhân viên</h2>
                        <span className="close" onClick={handleClose}></span>
                    </div>
                    <div style={{padding: 12}}>
                        <div>Sản phẩm</div>
                        <div>{product?.product_name}</div>
                        <div>{product?.quantity}</div>
                        <div>{product?.category}</div>
                        <img src={url} />
                        <ImageUpload url={url} setUrl={setUrl} />
                        <Button onClick={changeImage}>Thay đổi ảnh</Button>
                        <div>Sản phẩm Items</div>
                        {
                            productItems.map((p, index) => <div key={index} style={{ border: '1px solid black', padding: 12 }}>
                                <div>Sản phẩm {index + 1}</div>
                                <div>Số lượng {p.quantity}</div>
                                <div>Giá {p.price}</div>
                                <div>Kho hàng {p.warehouse_id}</div>
                                <div>Đối tác {p.supplier_id}</div>
                            </div>)
                        }
                    </div>
                </div>
                <div
                    className={`popup-overlay ${isClass}`}
                    onClick={handleClose}
                ></div>
            </div>
        </>
    );
};

export default ViewEmployee;
