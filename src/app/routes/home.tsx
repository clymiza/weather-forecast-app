import { Link } from "react-router-dom";

const regions = {
	Tokyo: "東京",
	Hyogo: "兵庫",
	Oita: "大分",
	Hokkaido: "北海道",
} as const;

/**
 * 地域名を日本語名に変換
 * @param region
 * @returns
 */
export function regionToLocationName(region?: string): string {
	return region && Object.keys(regions).includes(region)
		? regions[region as keyof typeof regions]
		: (region ?? "none");
}

export const HomeRoute = () => {
	return (
		<div className="home-container p-4">
			<h1 className="title text-2xl font-bold mb-4">天気予報アプリ</h1>
			<ul className="region-list list-disc pl-5">
				{Object.entries(regions).map(([region, locationName]) => (
					<li key={region} className="region-item mb-2">
						<RegionComponent region={region} locationName={locationName} />
					</li>
				))}
			</ul>
		</div>
	);
};

const RegionComponent = ({
	region,
	locationName,
}: { region: string; locationName: string }) => {
	return <Link to={`${region}`}>{locationName}の天気</Link>;
};
