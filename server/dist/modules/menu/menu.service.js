"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
let MenuService = class MenuService {
    menuItems = [
        {
            id: 1,
            name: 'Gỏi Cuốn Tôm Thịt',
            description: 'Bánh tráng cuộn tôm sú, thịt ba chỉ, bún tươi, rau sống, chấm mắm nêm đậm đà.',
            price: '85.000đ',
            category: 'Khai vị',
            tag: 'popular',
            image: 'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400&h=300&fit=crop',
        },
        {
            id: 2,
            name: 'Phở Bò Tái Nạm',
            description: 'Nước dùng hầm xương 12 tiếng, bánh phở tươi, bò tái mềm, nạm gầu thơm béo.',
            price: '95.000đ',
            category: 'Món chính',
            tag: 'popular',
            image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop',
        },
        {
            id: 3,
            name: 'Bún Chả Hà Nội',
            description: 'Chả viên và chả miếng nướng than hoa, bún tươi, nước chấm chua ngọt, rau sống.',
            price: '89.000đ',
            category: 'Món chính',
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
        },
        {
            id: 4,
            name: 'Cơm Tấm Sườn Bì Chả',
            description: 'Sườn nướng mật ong, bì heo, chả trứng, kèm nước mắm pha và đồ chua.',
            price: '79.000đ',
            category: 'Món chính',
            image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
        },
        {
            id: 5,
            name: 'Chè Bưởi Thập Cẩm',
            description: 'Tôm cua bưởi thơm mát, hạt sen, đậu xanh, nước cốt dừa béo ngậy.',
            price: '45.000đ',
            category: 'Tráng miệng',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
        },
        {
            id: 6,
            name: 'Cà Phê Sữa Đá',
            description: 'Cà phê phin truyền thống pha sữa đặc, đá viên mát lạnh.',
            price: '35.000đ',
            category: 'Đồ uống',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
        },
        {
            id: 7,
            name: 'Bánh Xèo Miền Trung',
            description: 'Bánh xèo giòn vàng, nhân tôm thịt, giá đỗ, chấm nước mắm chua ngọt.',
            price: '75.000đ',
            category: 'Khai vị',
            image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
        },
        {
            id: 8,
            name: 'Trà Sen Tây Hồ',
            description: 'Trà ướp hương sen Tây Hồ, vị thanh tao, hậu ngọt nhẹ.',
            price: '55.000đ',
            category: 'Đồ uống',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
        },
        {
            id: 9,
            name: 'Bánh Flan Caramel',
            description: 'Bánh flan mềm mịn với lớp caramel đắng nhẹ, thêm cà phê tùy chọn.',
            price: '40.000đ',
            category: 'Tráng miệng',
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        },
    ];
    findAll() {
        return this.menuItems;
    }
    findByCategory(category) {
        return this.menuItems.filter((item) => item.category === category);
    }
    getCategories() {
        const categories = [...new Set(this.menuItems.map((item) => item.category))];
        return ['Tất cả', ...categories];
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)()
], MenuService);
//# sourceMappingURL=menu.service.js.map