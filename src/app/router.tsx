import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppRoot, AppRootErrorBoundary } from "./routes/root";

/**
 * ルーティングの設定
 */
const router = createBrowserRouter([
	{
		path: "/weather-forecast-app",
		element: <AppRoot />,
		ErrorBoundary: AppRootErrorBoundary,
		children: [
			{
				index: true,
				ErrorBoundary: AppRootErrorBoundary,
				lazy: async () => {
					const { HomeRoute } = await import("./routes/home");
					return { Component: HomeRoute };
				},
			},
			{
				path: ":region",
				ErrorBoundary: AppRootErrorBoundary,
				lazy: async () => {
					const { WeatherRoute } = await import("./routes/weather");
					return { Component: WeatherRoute };
				},
			},
		],
	},
]);

/**
 * ルーターを提供するコンポーネント
 */
export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
