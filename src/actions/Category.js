import CategoryService from './../services/CategoryService';

export async function GetUserCategories() {
    return await CategoryService.getUserCategories();
}
export async function GetUserCategoriesStats() {
    return await CategoryService.GetUserCategoriesStats();
}