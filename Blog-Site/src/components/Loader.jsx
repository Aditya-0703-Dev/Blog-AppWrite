import React from 'react';

const Loader = ({
    className = '',
    ...props
}) => {
	return (
		<div className={`flex items-center justify-center bg-transparent ${className}`} {...props}>
			<div className="w-16 h-7 flex justify-between">
				{["#754fa0", "#09b7bf", "#90d36b", "#f2d40d", "#fcb12b", "#ed1b72"].map(
					(color, index) => (
						<div
							key={index}
							className="w-2 h-full bg-opacity-75 animate-bar-scale"
							style={{
								backgroundColor: color,
								animationDelay: `-${0.1 * (6 - index)}s`,
							}}
						></div>
					)
				)}
			</div>
			<style>
				{`
                    @keyframes bar-scale {
                        0%, 40%, 100% { transform: scaleY(0.2); }
                        20% { transform: scaleY(1); }
                    }
                    .animate-bar-scale {
                        animation: bar-scale 0.8s infinite ease-in-out;
                    }
                `}
			</style>
		</div>
	);
};

export default Loader;

