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
		<Link to={`/post/${$id}`} className=" block w-full bg-gray-100 rounded-xl p-2">
			<div className="w-full justify-center mb-2">
				<img
					src={imageSrc}
					alt={title}
					className="rounded-xl"
				/>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
		</Link>
	)
}

export default PostCard;
