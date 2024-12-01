import useSWR from "swr";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { WeatherProps } from "@/types/weather";
import { regionToLocationName } from "@/app/routes/home";

const fetcher = async (url: string) => {
	const response = await axios.get(url);
	return response.data as WeatherProps;
};

/**
 * 天気データを取得するURLを生成する関数
 */
const generateWeatherUrl = (region: string) =>
	`https://api.openweathermap.org/data/2.5/forecast?q=${region}&APPID=${import.meta.env.VITE_API_KEY}&units=metric&lang=ja`;

/**
 * 指定された地域の天気データを取得するカスタムフック
 *
 * @param region 天気データを取得する地域
 * @returns {WeatherProps | undefined} data - 取得された天気データ
 * @returns {boolean} isLoading - データがまだ読み込まれているかどうか
 */
function useWeather(region?: string) {
	const { data, error } = useSWR<WeatherProps>(
		region ? generateWeatherUrl(region) : null,
		fetcher,
		{
			revalidateIfStale: false,
		},
	);

	if (error) {
		throw error;
	}

	return {
		data,
		isLoading: !error && !data,
	};
}

export const WeatherRoute = () => {
	const { region } = useParams();
	const { data, isLoading } = useWeather(region);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">{`${regionToLocationName(region)}の天気`}</h1>
			{isLoading ? (
				<div className="text-center text-gray-500">読み込み中...</div>
			) : data ? (
				<WhetherComponent data={data} />
			) : (
				<div className="text-center text-red-500">データがありません</div>
			)}
		</div>
	);
};

const WhetherComponent = ({ data }: { data: WeatherProps }) => {
	const weatherData = data.list.map((item) => ({
		icon: item.weather[0].icon,
		/**
		 * 気温
		 */
		temp: item.main.temp,
		/**
		 * Unix時間を日本時間に変換
		 */
		time: new Date(item.dt * 1000).toLocaleString("ja-JP"),
		key: item.dt,
	}));

	return (
		<ul className="space-y-4">
			{weatherData.map((data) => (
				<li key={data.key} className="flex items-center space-x-4">
					<img
						src={`http://openweathermap.org/img/wn/${data.icon}.png`}
						alt="weather icon"
						className="w-12 h-12"
					/>
					<span className="text-lg font-medium">
						{data.time}: {data.temp}°C
					</span>
				</li>
			))}
		</ul>
	);
};
