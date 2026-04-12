import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MenuItemEntity } from '../entities/menu-item.entity';
import { AdminEntity } from '../entities/admin.entity';
import { SiteConfigEntity } from '../entities/site-config.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(MenuItemEntity)
    private readonly menuRepository: Repository<MenuItemEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectRepository(SiteConfigEntity)
    private readonly configRepository: Repository<SiteConfigEntity>,
  ) {}

  async onModuleInit() {
    await this.seedMenu();
    await this.seedAdmin();
    await this.seedSiteConfig();
  }

  private async seedAdmin() {
    const count = await this.adminRepository.count();

    if (count > 0) {
      this.logger.log('Admin user already seeded');
      return;
    }

    this.logger.log('Seeding default admin user...');

    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const admin = this.adminRepository.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
    });

    await this.adminRepository.save(admin);
    this.logger.log(
      'Default admin created: username=admin, password=Admin@123',
    );
  }

  private async seedMenu() {
    const count = await this.menuRepository.count();

    if (count > 0) {
      this.logger.log('Menu items already seeded');
      return;
    }

    this.logger.log('Seeding initial menu items...');

    const initialMenuItems = [
      {
        name: 'Phở Bò Tái Nạm',
        description:
          'Nước dùng hầm xương 12 tiếng, bánh phở tươi, bò tái mềm, nạm gầu thơm béo.',
        price: '95.000đ',
        category: 'Món chính',
        tag: 'popular',
        image:
          'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop',
      },
      {
        name: 'Bún Chả Hà Nội',
        description:
          'Chả viên và chả miếng nướng than hoa, bún tươi, nước chấm chua ngọt, rau sống.',
        price: '89.000đ',
        category: 'Món chính',
        image:
          'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
      },
      {
        name: 'Cơm Tấm Sườn Bì Chả',
        description:
          'Sườn nướng mật ong, bì heo, chả trứng, kèm nước mắm pha và đồ chua.',
        price: '79.000đ',
        category: 'Món chính',
        image:
          'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
      },
      {
        name: 'Chè Bưởi Thập Cẩm',
        description:
          'Tôm cua bưởi thơm mát, hạt sen, đậu xanh, nước cốt dừa béo ngậy.',
        price: '45.000đ',
        category: 'Món thêm',
        image:
          'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
      },
      {
        name: 'Cà Phê Sữa Đá',
        description: 'Cà phê phin truyền thống pha sữa đặc, đá viên mát lạnh.',
        price: '35.000đ',
        category: 'Đồ uống',
        image:
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
      },
      {
        name: 'Bánh Xèo Miền Trung',
        description:
          'Bánh xèo giòn vàng, nhân tôm thịt, giá đỗ, chấm nước mắm chua ngọt.',
        price: '75.000đ',
        category: 'Ăn kèm',
        image:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      },
      {
        name: 'Trà Sen Tây Hồ',
        description: 'Trà ướp hương sen Tây Hồ, vị thanh tao, hậu ngọt nhẹ.',
        price: '55.000đ',
        category: 'Đồ uống',
        image:
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
      },
      {
        name: 'Bánh Flan Caramel',
        description:
          'Bánh flan mềm mịn với lớp caramel đắng nhẹ, thêm cà phê tùy chọn.',
        price: '40.000đ',
        category: 'Món thêm',
        image:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
      },
    ];

    await this.menuRepository.save(initialMenuItems);
    this.logger.log(
      `Seeded ${initialMenuItems.length} menu items successfully.`,
    );
  }

  private async seedSiteConfig() {
    const count = await this.configRepository.count();

    if (count > 0) {
      this.logger.log('Site config already seeded');
      return;
    }

    this.logger.log('Seeding default site config...');

    const defaults: { key: string; value: any }[] = [
      {
        key: 'hero',
        value: {
          badge: 'Đang mở cửa · 10:00 — 22:00',
          title: 'Trải Nghiệm',
          titleAccent: 'Ẩm Thực Tinh Tế',
          description:
            'Nơi hội tụ tinh hoa ẩm thực Việt Nam và quốc tế trong không gian thanh lịch, mang đến cho bạn những khoảnh khắc đáng nhớ bên gia đình và bạn bè.',
          ctaMenu: 'Xem Thực Đơn',
          ctaReserve: 'Đặt Bàn Ngay',
        },
      },
      {
        key: 'about',
        value: {
          eyebrow: 'Về Chúng Tôi',
          title: 'Câu Chuyện Của',
          titleLine2: 'Azure Kitchen',
          paragraph1:
            'Được thành lập từ niềm đam mê với ẩm thực Việt Nam, Azure Kitchen là nơi giao thoa giữa truyền thống và hiện đại. Mỗi món ăn là một câu chuyện, được chế biến từ những nguyên liệu tươi ngon nhất, theo công thức gia truyền đã được gìn giữ qua nhiều thế hệ.',
          paragraph2:
            'Không gian nhà hàng được thiết kế tinh tế với tông xanh dương nhẹ nhàng, mang đến cảm giác thư thái và thanh lịch cho mỗi bữa ăn của bạn.',
          image:
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=500&fit=crop',
          floatingNumber: '10+',
          floatingLabel: 'Năm kinh nghiệm',
          features: [
            {
              icon: '🥬',
              title: 'Nguyên Liệu Tươi',
              desc: 'Nhập hàng ngày từ nông trại',
            },
            {
              icon: '👨‍🍳',
              title: 'Đầu Bếp Tài Năng',
              desc: '15+ năm kinh nghiệm',
            },
            {
              icon: '🌿',
              title: 'Công Thức Gia Truyền',
              desc: 'Hương vị truyền thống',
            },
            {
              icon: '❤️',
              title: 'Phục Vụ Tận Tâm',
              desc: 'Sự hài lòng là ưu tiên',
            },
          ],
          cta: 'Ghé Thăm Nhà Hàng',
        },
      },
      {
        key: 'gallery',
        value: {
          title: 'Bộ Sưu Tập Hình Ảnh',
          subtitle:
            'Khám phá không gian ấm cúng và những món ăn tuyệt vời tại Azure Kitchen',
          images: [
            {
              src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
              label: 'Không gian nhà hàng',
            },
            {
              src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop',
              label: 'Quầy bar',
            },
            {
              src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
              label: 'Món khai vị',
            },
            {
              src: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=300&fit=crop',
              label: 'Bàn tiệc',
            },
            {
              src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
              label: 'Pizza đặc biệt',
            },
            {
              src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=300&fit=crop',
              label: 'Khu vực ngoài trời',
            },
          ],
          stats: [
            { number: '10K+', label: 'Khách hàng hài lòng' },
            { number: '50+', label: 'Món ăn đặc sắc' },
            { number: '15+', label: 'Đầu bếp tài năng' },
            { number: '4.9', label: 'Đánh giá trung bình' },
          ],
        },
      },
      {
        key: 'contact',
        value: {
          address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
          phone: '(028) 3823 4567',
          hours: '10:00 — 22:00 hàng ngày',
          email: 'hello@azurekitchen.vn',
        },
      },
      {
        key: 'footer',
        value: {
          brandDesc:
            'Nơi hội tụ tinh hoa ẩm thực trong không gian thanh lịch. Chúng tôi mang đến trải nghiệm ẩm thực đáng nhớ cho mỗi thực khách.',
          morningHours: '06:00 — 12:00',
          eveningHours: '16:00 — 22:00',
          socials: {
            facebook: '#',
            instagram: '#',
            tiktok: '#',
            youtube: '#',
          },
        },
      },
    ];

    for (const item of defaults) {
      const config = this.configRepository.create(item);
      await this.configRepository.save(config);
    }

    this.logger.log(
      `Seeded ${defaults.length} site config entries successfully.`,
    );
  }
}
