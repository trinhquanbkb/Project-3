import React from "react";
import { Card } from "react-bootstrap";

interface ICard {
	_id: string;
	url: string;
	product_name: string;
	quantity: number;
}

interface IProps {
	data: ICard;
	handleView?: any;
}

export default function ItemProduct({ data, handleView }: IProps) {
	return (
		<div>
			<Card className="product-item">
				<Card.Body className="product-item-body">
					<img
						src={data.url}
						className="product-img"
						alt={data._id}
					/>
				</Card.Body>
				<Card.Footer className="product-item-footer d-flex flex-column justify-content-between">
					<div>
						<div className="product-item-title">
							{data.product_name}
						</div>
						<div className="product-item-content">
							Số lượng: {data.quantity}
						</div>
					</div>
					<div className="mt-1 d-flex justify-content-end">
						<p
							className="product-view-detail"
							onClick={() => handleView(data._id)}
						>
							Xem chi tiết{" "}
							<i className="uil  uil-angle-double-right"></i>
						</p>
					</div>
				</Card.Footer>
			</Card>
		</div>
	);
}
