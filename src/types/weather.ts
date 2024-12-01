/** Weather API response */
export interface WeatherProps {
	/** Internal parameter */
	cod: string;
	/** Internal parameter */
	message: number;
	/** A number of timestamps returned in the API response */
	cnt: number;
	/** An array of forecast data */
	list: List[];
	/** City information */
	city: City;
}

/** City information */
interface City {
	/** City ID. */
	id: number;
	/** City name. */
	name: string;
	/** City geo location. */
	coord: Coord;
	/** Country code. */
	country: string;
	/** Population of the city. */
	population: number;
	/** Shift in seconds from UTC. */
	timezone: number;
	/** Sunrise time, Unix, UTC. */
	sunrise: number;
	/** Sunset time, Unix, UTC. */
	sunset: number;
}

/** City geo location */
interface Coord {
	/** Latitude. */
	lat: number;
	/** Longitude. */
	lon: number;
}

/** An array of forecast data */
interface List {
	/** Time of data calculation, Unix, UTC. */
	dt: number;
	/** Main weather data. */
	main: Main;
	/** Weather conditions. */
	weather: Weather[];
	/** Cloudiness data. */
	clouds: Clouds;
	/** Wind data. */
	wind: Wind;
	/** Visibility, meter. */
	visibility: number;
	/** Probability of precipitation. */
	pop: number;
	/** Rain data. */
	rain?: Rain;
	/** System data. */
	sys: Sys;
	/** Data/time of calculation, ISO, UTC. */
	dt_txt: string;
}

/** System data */
interface Sys {
	/** Part of the day (n - night, d - day). */
	pod: string;
}

/** Rain data */
interface Rain {
	/** Rain volume for the last 3 hours. */
	"3h": number;
}

/** Wind data */
interface Wind {
	/** Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour. */
	speed: number;
	/** Wind direction, degrees (meteorological). */
	deg: number;
	/** Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour. */
	gust: number;
}

/** Cloudiness data */
interface Clouds {
	/** Cloudiness, %. */
	all: number;
}

/** Weather conditions */
interface Weather {
	/** Weather condition ID. */
	id: number;
	/** Group of weather parameters (Rain, Snow, Extreme etc.). */
	main: string;
	/** Weather condition within the group. */
	description: string;
	/** Weather icon ID. */
	icon: string;
}

/** Main weather data */
interface Main {
	/** Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
	temp: number;
	/** This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
	feels_like: number;
	/** Minimum temperature at the moment of calculation. This is minimal forecasted temperature (within large megalopolises and urban areas), use this parameter optionally. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
	temp_min: number;
	/** Maximum temperature at the moment of calculation. This is maximal forecasted temperature (within large megalopolises and urban areas), use this parameter optionally. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit. */
	temp_max: number;
	/** Atmospheric pressure on the sea level by default, hPa. */
	pressure: number;
	/** Atmospheric pressure on the sea level, hPa. */
	sea_level: number;
	/** Atmospheric pressure on the ground level, hPa. */
	grnd_level: number;
	/** Humidity, %. */
	humidity: number;
	/** Internal parameter. */
	temp_kf: number;
}
