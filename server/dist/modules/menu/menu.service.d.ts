export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: string;
    category: string;
    tag?: string;
    image: string;
}
export declare class MenuService {
    private readonly menuItems;
    findAll(): MenuItem[];
    findByCategory(category: string): MenuItem[];
    getCategories(): string[];
}
