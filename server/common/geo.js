const EARTH_RADIUS_KM = 6371;

/**
 * SQL expression for the great-circle (haversine) distance in kilometres
 * between a table's latitude/longitude columns and a given point.
 * Uses only built-in PostgreSQL math functions (no PostGIS required).
 *
 * @param {import("sequelize").Sequelize} sequelize - used to escape the inputs
 * @param {string} table - quoted table alias, e.g. "Drivers"
 * @param {number} latitude
 * @param {number} longitude
 */
const haversineDistanceSql = (sequelize, table, latitude, longitude) => {
  const lat = sequelize.escape(Number(latitude));
  const lng = sequelize.escape(Number(longitude));
  const rowLat = `"${table}"."latitude"`;
  const rowLng = `"${table}"."longitude"`;

  // LEAST(1, ...) guards ASIN against floating-point values slightly above 1.
  return `(${EARTH_RADIUS_KM} * 2 * ASIN(LEAST(1, SQRT(
    POWER(SIN(RADIANS(${rowLat} - ${lat}) / 2), 2) +
    COS(RADIANS(${lat})) * COS(RADIANS(${rowLat})) *
    POWER(SIN(RADIANS(${rowLng} - ${lng}) / 2), 2)
  ))))`;
};

module.exports = { haversineDistanceSql };
