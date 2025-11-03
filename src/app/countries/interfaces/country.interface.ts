export interface CountryInterface {
  common: string;
  official: string;
  flag: string;
}
export interface RawCountry {
  flags: { png: string };
  name: { common: string; official: string };
}
