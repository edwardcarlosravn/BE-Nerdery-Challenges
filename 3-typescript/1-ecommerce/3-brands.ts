/**
 *  Challenge 4: Get Countries with Brands and Amount of Products
 *
 * Create a function that takes an array of brands and products, and returns the countries with the amount of products available in each country.
 *
 * Requirements:
 * - The function should accept an array of Brand objects and an array of Product objects.
 * - Each brand should have a country property.
 * - Each product should have a brandId property that corresponds to the id of a brand.
 * - The function should return an array of objects, each containing a country and the amount of products available in that country.
 * - The amount of products should be calculated by counting the number of products that have a brandId matching the id of a brand in the same country.
 * - The return should be a type that allow us to define the country name as a key and the amount of products as a value.
 */
import { Brand, Product, Country } from './1-types';
export type CountryProductCount = {
  [key in Country]?: number;
};

export type StrictCountryProductCount = Record<Country, number>;
export function createBrandCountryMap(brands: Brand[]): Map<string, Country> {
  const map = new Map<string, Country>();
  
  for (const brand of brands) {
    const country = extractCountryFromHeadquarters(brand.headquarters);
    map.set(String(brand.id), country);
  }
  
  return map;
}

export function extractCountryFromHeadquarters(headquarters: string): Country {
  const parts = headquarters.split(', ');
  return parts[parts.length - 1] as Country;
}

export async function getCountriesWithBrandsAndProductCount(
  brands: Brand[],
  products: Product[],
): Promise<StrictCountryProductCount> {

  const brandCountryMap = createBrandCountryMap(brands);
  
  const result: StrictCountryProductCount = {} as StrictCountryProductCount;
  
  products.forEach(product => {
    const country = brandCountryMap.get(String(product.brandId));
    if (country) {
      result[country] = (result[country] || 0) + 1;
    }
  });
  return result;
}
