import React from "react";
import { Link } from "react-router-dom";
import fileUploadService from "../appwrite/fileupload";

function PostCard({ $id, featuredImage, title }) {
	return (
		<Link to={`/post/${$id}`} className="w-full bg-gray-100 rounded-xl p-4">
			<div className="w-full justify-center mb-4">
				<img
					src={fileUploadService.GetFilePreview(featuredImage)}
					alt={title}
					className="rounded-xl"
				/>
			</div>
			<h2 className="text-xl font-bold">{title}</h2>
		</Link>
	);
}

export default PostCard;
