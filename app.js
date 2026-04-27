document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    let cartCount = 0;

    // --- DỮ LIỆU SẢN PHẨM ---
    const baseProducts = [
        { name: "AXE Apollo", price: 95000, img: "https://www.axe.com/content/dam/unilever/axe/vietnam/pack_shot/8934839154687-1215160-png.png", desc: "Hương Gỗ Đàn Hương & Xô Thơm" },
        { name: "Dark Temptation", price: 95000, img: "https://www.axe.com/content/dam/unilever/axe/vietnam/pack_shot/8934839154724-1215168-png.png", desc: "Hương Sô-cô-la đen ngọt ngào" },
        { name: "AXE Black", price: 95000, img: "https://www.axe.com/content/dam/unilever/axe/vietnam/pack_shot/8934839154700-1215164-png.png", desc: "Hương Cam Bergamot lịch lãm" },
        { name: "AXE Ice Chill", price: 95000, img: "https://www.axe.com/content/dam/unilever/axe/vietnam/pack_shot/8934839154748-1215171-png.png", desc: "Hương Bạc Hà & Chanh Tuyết" },
        { name: "Gold Temptation", price: 95000, img: "https://www.axe.com/content/dam/unilever/axe/vietnam/pack_shot/8934839154762-1215175-png.png", desc: "Hương Cam Citrus & Hổ Phách" },
        { name: "AXE Click", price: 95000, img: "https://www.axe.com/content/dam/unilever/axe/global/pack_shot/8717163693245.png", desc: "Hương Gia Vị & Gỗ Ấm" }
    ];

    // Tạo 24 sản phẩm bằng cách nhân bản và thêm số thứ tự
    const products = [];
    for (let i = 1; i <= 24; i++) {
        let base = baseProducts[(i - 1) % baseProducts.length];
        products.push({
            id: i,
            name: `${base.name} (Vol.${i})`,
            price: base.price,
            img: base.img,
            desc: base.desc
        });
    }

    // --- LOGIC PHÂN TRANG (PAGINATION) ---
    const itemsPerPage = 8;
    let currentPage = 1;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const productGrid = document.getElementById('product-grid');
    const paginationContainer = document.getElementById('pagination');

    function renderProducts(page) {
        productGrid.innerHTML = '';
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentProducts = products.slice(startIndex, endIndex);

        currentProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = "bg-white p-6 rounded-xl border border-slate-200 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group";
            card.innerHTML = `
                <div>
                    <img src="${product.img}" alt="${product.name}" class="w-full h-48 object-contain mb-6 group-hover:scale-105 transition-transform duration-500">
                    <h3 class="text-lg font-bold mb-1 text-slate-800">${product.name}</h3>
                    <p class="text-sm text-slate-500 mb-4 h-10">${product.desc}</p>
                </div>
                <div>
                    <div class="text-2xl font-black text-primary mb-4">${product.price.toLocaleString('vi-VN')}₫</div>
                    <button class="add-to-cart-btn w-full bg-slate-100 text-slate-800 font-bold py-3 uppercase rounded hover:bg-primary hover:text-white transition-colors border border-slate-200">
                        Thêm vào giỏ
                    </button>
                </div>
            `;
            productGrid.appendChild(card);
        });

        attachCartEvents();
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.innerText = i;
            // Áp dụng style khác nhau cho trang hiện tại
            if (i === currentPage) {
                btn.className = "w-10 h-10 flex items-center justify-center rounded bg-primary text-white font-bold shadow";
            } else {
                btn.className = "w-10 h-10 flex items-center justify-center rounded bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 font-bold transition-colors";
            }
            
            btn.addEventListener('click', () => {
                currentPage = i;
                renderProducts(currentPage);
                renderPagination();
                // Cuộn mượt lên đầu danh sách sản phẩm
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(btn);
        }
    }

    // --- LOGIC GIỎ HÀNG (Chỉ tăng số, không mở popup) ---
    function attachCartEvents() {
        const btns = document.querySelectorAll('.add-to-cart-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                cartCount++;
                cartCountElement.innerText = cartCount;
                
                // Đổi trạng thái nút
                const originalText = this.innerText;
                this.innerText = 'Đã Thêm ✓';
                this.classList.replace('bg-slate-100', 'bg-green-500');
                this.classList.replace('text-slate-800', 'text-white');

                // Trả về bình thường sau 1.5s
                setTimeout(() => {
                    this.innerText = originalText;
                    this.classList.replace('bg-green-500', 'bg-slate-100');
                    this.classList.replace('text-white', 'text-slate-800');
                }, 1500);
            });
        });
    }

    // Navbar Sticky Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

    // Khởi tạo ban đầu
    renderProducts(currentPage);
    renderPagination();
});
