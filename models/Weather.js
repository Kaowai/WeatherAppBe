export class Weather {
    constructor(location, current) {
      this.location = new Location(
        location.name,
        location.region,
        location.country,
        location.lat,
        location.lon,
        location.tz_id,
        location.localtime_epoch,
        location.localtime
      );
      this.current = {
        last_updated_epoch: current.last_updated_epoch,
        last_updated: current.last_updated,
        temp_c: current.temp_c,
        temp_f: current.temp_f,
        is_day: current.is_day,
        condition: new Condition(
          current.condition.text,
          current.condition.icon,
          current.condition.code
        ),
        wind_mph: current.wind_mph,
        wind_kph: current.wind_kph,
        wind_degree: current.wind_degree,
        wind_dir: current.wind_dir,
        pressure_mb: current.pressure_mb,
        pressure_in: current.pressure_in,
        precip_mm: current.precip_mm,
        precip_in: current.precip_in,
        humidity: current.humidity,
        cloud: current.cloud,
        feelslike_c: current.feelslike_c,
        feelslike_f: current.feelslike_f,
        windchill_c: current.windchill_c,
        windchill_f: current.windchill_f,
        heatindex_c: current.heatindex_c,
        heatindex_f: current.heatindex_f,
        dewpoint_c: current.dewpoint_c,
        dewpoint_f: current.dewpoint_f,
        vis_km: current.vis_km,
        vis_miles: current.vis_miles,
        uv: current.uv,
        gust_mph: current.gust_mph,
        gust_kph: current.gust_kph,
      };
    }
  }