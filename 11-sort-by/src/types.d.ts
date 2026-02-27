declare module "sort-by" {
  import objectPath from "object-path";

  /**
   * Filters arguments based on their type
   * @param type - Type of property to filter by (e.g., 'string', 'function')
   * @returns Function that checks if argument is of specified type
   */
  const type: <T extends string>(type: T) => (arg: any) => boolean;

  /**
   * Returns a comparator function for a single property
   * @param property - The key to sort by (prefix with '-' for descending order)
   * @param map - Optional function to transform values before comparison
   * @returns Comparator function for two objects
   */
  const sort: {
    <T>(
      property: string,
      map?: (property: string, value: any) => any,
    ): (a: T, b: T) => number;
  };

  /**
   * Returns a comparator function that sorts by multiple keys
   * Accepts property names (with optional '-' prefix for descending) and optional mapper function
   * @example
   * sortBy('age', '-salary')
   * sortBy('name', (prop, value) => value.toUpperCase())
   * @returns Comparator function that applies sorting rules in sequence
   */
  function sortBy<T = any>(
    ...args: (
      | string // property name (use '-' prefix for descending order)
      | ((property: string, value: any) => any) // value mapper function
    )[]
  ): (a: T, b: T) => number;

  // Export as default (compatibility with module.exports = sortBy)
  export = sortBy;
}
