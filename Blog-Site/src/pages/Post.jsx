import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../appwrite/post";
import fileUploadService from "../appwrite/fileupload";
import { Button, Container } from "../components/componentsIndex";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
	const [post, setPost] = useState(null);
	const [image, setImage] = useState("");
	const { slug } = useParams();
	const navigate = useNavigate();

	const userData = useSelector((state) => state.userData);

	const isAuthor = post && userData ? post.createdby === userData.$id : false;

	useEffect(() => {
		const fetchPost = async () => {
			if (slug) {
				await postService.GetPost(slug).then((post) => {
					if (post) setPost(post);
					else navigate("/");
				});
			} else navigate("/");
		}
		fetchPost();
		console.log(isAuthor);
	}, [slug, navigate]);
	
	useEffect(() => {
		const fetchImage = async () => {
			const src = await fileUploadService.GetFilePreview(post.featuredImage);
			setImage(src);
		}
		fetchImage();
	}, [post]);

	const deletePost = async () => {
		await postService.DeletePost(post.$id).then((status) => {
			if (status) {
				fileUploadService.DeleteFile(post.featuredImage);
				navigate("/");
			}
		});
	};

	return post ? (
		<div className="py-8">
			<Container>
				<div className="w-full flex justify-between mb-4 relative rounded-xl p-2">
					<div className="w-3/5 p-2 border rounded">
						<img
							src={image}
							alt={post.title}
							className="rounded-xl "
						/>

						{isAuthor && (
							<div className="absolute left-6 top-6">
								<Link to={`/edit-post/${post.$id}`}>
									<Button bgColor="bg-green-500" className="mr-3 hover:bg-green-700 duration-200">
										Edit
									</Button>
								</Link>
								<Button bgColor="bg-red-500" className="hover:bg-red-700 duration-200" onClick={deletePost}>
									Delete
								</Button>
							</div>
						)}
					</div>
					<div className="w-2/5 pl-3 border rounded pt-3 bg-white">
						<div className="w-full mb-6">
							<h1 className="text-5xl font-bold">{post.title}</h1>
						</div>
						<div className="browser-css">{parse(post.content)}</div>
					</div>
				</div>
			</Container>
		</div>
	) : null;
}
