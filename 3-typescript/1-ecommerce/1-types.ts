/**
 * Challenge 1: Type Definitions for Product Catalog
 *
 * You need to define proper TypeScript types for the product catalog data.
 * These types should accurately represent the structure of the JSON data and establish
 * the relationships between different entities (e.g., products and brands).
 *
 * The JSON data is provided in the `data` folder.
 *
 * Consider:
 * - Handle all of the properties in the JSON data as accurately as possible in typescript types
 * - Use appropriate types for each property (e.g., string, number, boolean, etc.)
 * - Optional properties and mandatory properties
 * - The use of union types for properties that can have multiple types
 * - The use of enums for properties that can have a limited set of values
 * - The use of interfaces and type aliases to create a clear and maintainable structure
 */
export type ProductId = number;
export type BrandId = number | string;
export type CategoryId = number;
export type DepartmentId = number;
export type Nullable<T> = T | null;

export enum Countries{
    USA = 'USA',
    GERMANY = 'Germany',
    JAPAN = 'Japan',
    FRANCE = 'France',
    UK = 'United Kingdom',
}
export type Country = Countries;
export type Headquarters = `${string}, ${Country}`;

export enum ProductTag {
    Trail = "Trail",
    Performance = "Performance",
    NewArrival = "New Arrival", 
    Tennis = "Tennis",
    Court = "Court",
    Premium = "Premium",
    Sustainable = "Sustainable",
    Comfort = "Comfort",
    Casual = "Casual",
    Urban = "Urban",
    Boots = "Boots",
    Trending = "Trending",
    Basketball = "Basketball",
    Classic = "Classic",
    BusinessCasual = "Business Casual",
    Minimalist = "Minimalist",
    ZeroDrop = "Zero Drop",
    NaturalRunning = "Natural Running",
    Walking = "Walking",
    Everyday = "Everyday",
    Training = "Training",
    CrossFit = "CrossFit",
    Versatile = "Versatile",
    Formal = "Formal",
    Dress = "Dress",
    Kids = "Kids",
    EasyOn = "Easy-On",
    Durable = "Durable",
    Hiking = "Hiking",
    Winter = "Winter",
    Waterproof = "Waterproof",
    NightEdition = "Night Edition",
    Alpine = "Alpine",
    Summer = "Summer",
    LimitedEdition = "Limited Edition",
    Camo = "Camo",
    Outdoors = "Outdoors",
    Bright = "Bright"
}

export interface BaseProductSpecifications{
    material: string;
    weight: string;
    cushioning: string;
    closure: string;
}
export interface AthleticSpecifications extends BaseProductSpecifications {
    archSupport?: string;
    heelDrop?: string;
    heelHeight?: string;
    ankleSupport?: string;
}
export interface BootSpecifications extends BaseProductSpecifications {
    shaftHeight: string;
    waterproofing?: string;
    insulation?: string;
}
export interface FormalSpecifications extends BaseProductSpecifications{
    lining: string;
}

export interface KidsSpecifications extends BaseProductSpecifications{
    flexibility: string;
}

export type ProductSpecifications = | BaseProductSpecifications | AthleticSpecifications | BootSpecifications | FormalSpecifications | KidsSpecifications;

export type ProductImage = {
    id: number;
    url: string;
    alt: string;
    isMain : boolean;
}

export type CategoryFilter = {
    name: string;
    values: string[];
}
export interface SocialMedia {
    instagram? : string;
    twitter? : string;
    facebook? : string;
}
// PRODUCTS JSON

//! Add necessary type definitions for the products json file
export interface Product{
    id: ProductId;
    name: string;
    departmentId : DepartmentId;
    categoryId : CategoryId;
    brandId: BrandId;
    linkId : string;
    refId: string;
    isVisible: boolean;
    description: string;
    descriptionShort: string;
    releaseDate: string;
    keywords: string;
    title: string;
    isActive : boolean;
    taxCode: string;
    metaTagDescription: string;
    supplierId: number;
    showWithoutStock: boolean;
    adWordsRemarketingCode?: string
    lomadeeCampaignCode?: string;
    score: number;
    price: number;
    salePrice: Nullable<number>;
    onSale: boolean;
    colors  : string[];
    sizes: number[];
    tags: string[] | ProductTag[];
    images: ProductImage[];
    specifications: ProductSpecifications;
}
// CATEGORIES JSON

//! Add necessary type definitions for the brands json file
export interface Category{
    id : CategoryId;
    name: string;
    departmentId : DepartmentId;
    description: string;
    keywords: string;
    isActive : boolean;
    iconUrl: string;
    bannerUrl: string;
    displayOrder: number;
    metaDescription: string;
    filters: CategoryFilter[];
}
// BRANDS JSON

//! Add necessary type definitions for the brands json file
export interface Brand{
    id : BrandId;
    name : string;
    logo: string;
    description: string;
    foundedYear: number;
    website: string;
    isActive: boolean;
    headquarters: Headquarters;
    signature: string;
    socialMedia : SocialMedia;
}
// DEPARTMENTS JSON
//! Add necessary type definitions for the departments json file
export interface Department{
    id : DepartmentId;
    name : string; 
    description : string;
    isActive : boolean;
    displayOrder: number;
    iconUrl : string;
    bannerUrl : string;
    metaDescription : string;
    featuredCategories : CategoryId[];
    slug : string;
}
