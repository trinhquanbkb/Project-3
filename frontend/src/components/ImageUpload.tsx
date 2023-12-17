import React, { useState } from "react";

const ImageUpload = ({ url, setUrl }: { url: any; setUrl: any }) => {
	const [loading, setLoading] = useState(false);

	const uploadImage = async (image: any) => {
		setLoading(true);
		const data = new FormData();
		data.append("file", image);
		data.append(
			"upload_preset",
			"" + process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
		);
		data.append(
			"cloud_name",
			"" + process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
		);
		data.append("folder", "Cloudinary-React");

		try {
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
				{
					method: "POST",
					body: data,
				}
			);
			const res = await response.json();
			setUrl(res.secure_url);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		uploadImage(file);
	};

	return (
		<div className="h-screen sm:px-8 md:px-16 sm:py-8">
			<div className="container mx-auto max-w-screen-lg h-full">
				<header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
					<input
						id="hidden-input"
						type="file"
						className="hidden"
						onChange={handleImageChange}
						accept="image/*"
					/>
				</header>
				{loading && (
					<div className="flex items-center justify-center gap-2">
						<div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
						<span>Processing...</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageUpload;
