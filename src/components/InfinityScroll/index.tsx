import React, { useEffect, ReactNode } from "react";

interface InfinityScrollPropsTypes {
	children: ReactNode;
	loadMore: () => void;
}

const InfinityScroll: React.FC<InfinityScrollPropsTypes> = ({ children, loadMore }) => {
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const SumHeight: number = document.documentElement.scrollTop + window.innerHeight;
			const TotalHeight: number = document.documentElement.offsetHeight;

			let bottomOfWindow = SumHeight > TotalHeight || SumHeight === TotalHeight;

			if (bottomOfWindow) {
				loadMore();
			}
		});
	}, []);

	return <>{children}</>;
};

export default InfinityScroll;
