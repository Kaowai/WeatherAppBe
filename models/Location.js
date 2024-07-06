export class Location {
  constructor(name, region, country, lat, lon, tz_id, localtime_epoch, localtime) {
    this.name = name;
    this.region = region;
    this.country = country;
    this.lat = lat;
    this.lon = lon;
    this.tz_id = tz_id;
    this.localtime_epoch = localtime_epoch;
    this.localtime = localtime;
  }
}