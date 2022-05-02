import React, { useEffect, ReactNode } from "react";

interface InfinityScrollPropsTypes {
	children: ReactNode;
	loadMore: () => void;
}

const InfinityScroll: React.FC<InfinityScrollPropsTypes> = ({ children, loadMore }) => {
	const handleScrollEvent = () => {
		const SumHeight: number = document.documentElement.scrollTop + window.innerHeight;
		const TotalHeight: number = document.documentElement.offsetHeight;

		let bottomOfWindow = SumHeight > TotalHeight || SumHeight === TotalHeight;

		if (bottomOfWindow) {
			loadMore();
		}
	};
	
	useEffect(() => {
		window.addEventListener("scroll", handleScrollEvent);
		
		return () => window.removeEventListener("scroll", handleScrollEvent);
	}, []);

	return <>{children}</>;
};

export default InfinityScroll;
