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

export async function getCountriesWithBrandsAndProductCount(
  brands: Brand[],
  products: Product[],
): Promise<StrictCountryProductCount> {
  const brandCountryMap = new Map<string | number, Country>();
  
  brands.forEach(brand => {
    const parts = brand.headquarters.split(', ');
    const country = parts[parts.length - 1] as Country;
    
    brandCountryMap.set(String(brand.id), country);
  });
  
  const countryCount: Partial<Record<Country, number>> = {};
  
  products.forEach(product => {
    const brandId = String(product.brandId);
    const country = brandCountryMap.get(brandId);
    if (country) {  
      countryCount[country] = (countryCount[country] || 0) + 1;
    }
  });
  return Object.entries(countryCount).reduce((result, [country, count]) => {
    result[country as Country] = count || 0;
    return result;
  }, {} as StrictCountryProductCount);
}
