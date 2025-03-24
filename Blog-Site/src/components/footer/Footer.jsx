import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
	return (
		<section className="flex flex-wrap justify-center align-middle overflow-hidden py-4 w-full bg-white shadow">
			<div className="text-gray-700">
			© 2025 ThoughtStream. Developed By <a href="https://github.com/Aditya-0703-Dev" className=" decoration-0 hover:text-teal-600 duration-150" target="new">Aditya Dev</a>.
			</div>
		</section>
	);
}

export default Footer;
