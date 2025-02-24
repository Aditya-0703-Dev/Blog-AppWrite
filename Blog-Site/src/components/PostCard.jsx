import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import fileUploadService from "../appwrite/fileupload";

function PostCard({ $id, featuredImage, title }) {
	const [imageSrc, setImageSrc] = useState("");

	useEffect(() => {
		const fetchImage = async () => {
			const src = await fileUploadService.GetFilePreview(featuredImage);
			setImageSrc(src);
		};

		fetchImage();
	}, [featuredImage]);

	return(
		<Link to={`/post/${$id}`} className="w-full bg-gray-100 rounded-xl p-4">
			<div className="w-full justify-center mb-4">
				<img
					src={imageSrc}
					alt={title}
					className="rounded-xl"
				/>
			</div>
			<h2 className="text-xl font-bold">{title}</h2>
		</Link>
	)
}

export default PostCard;
