import constantsData from './constants.json';

export const COMPANY_INFO = constantsData.COMPANY_INFO;
export const SERVICES = constantsData.SERVICES;
export const SEO_CONFIG = constantsData.SEO_CONFIG;
export const VALIDATION_RULES = constantsData.VALIDATION_RULES;
export const PROJECT_CATEGORIES = constantsData.PROJECT_CATEGORIES;

// Convertir las expresiones regulares de string a RegExp
export const VALIDATION_RULES_WITH_REGEX = {
  ...constantsData.VALIDATION_RULES,
  email: new RegExp(constantsData.VALIDATION_RULES.email),
  phone: new RegExp(constantsData.VALIDATION_RULES.phone)
}; 