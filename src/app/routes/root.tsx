import { Outlet } from "react-router-dom";

export const AppRoot = () => {
	return <Outlet />;
};

/**
 * エラーページを表示
 */
export const AppRootErrorBoundary = () => {
	return <div>Something went wrong!</div>;
};
