import { Outlet, useRouteError } from "react-router-dom";

export const AppRoot = () => {
	return <Outlet />;
};

/**
 * エラーに関する型ガード
 */
const isError = (
	error: unknown,
): error is { status: number; message: string } => {
	return (
		typeof error === "object" &&
		error !== null &&
		"status" in error &&
		"message" in error
	);
};

/**
 * エラーページを表示
 */
export const AppRootErrorBoundary = () => {
	const error = useRouteError();

	if (isError(error)) {
		// 5xxはエラーページに遷移
		if (error.status.toString().startsWith("5")) {
			return <ErrorPage {...error} />;
		}
	}

	return <div>Something went wrong!</div>;
};

const ErrorPage = ({
	status,
	message,
}: { status: number; message: string }) => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="text-center bg-white shadow-lg p-6 rounded-lg max-w-md">
				<h1 className="text-6xl font-bold text-red-500">{status}</h1>
				<p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
			</div>
		</div>
	);
};
