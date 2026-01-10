
        // Datos del menú
        const menuItems = [
            {
                id: 1,
                name: "Gordita de Chicharrón",
                description: "Gordita de maíz rellena de chicharrón prensado con salsa roja o verde, acompañada de lechuga o nopales, queso y crema.",
                price: "$25",
                category: "gorditas",
                image: "images/gordita-chicharron.jpg"
            },
            {
                id: 2,
                name: "Gordita de Tinga",
                description: "Deliciosa gordita rellena de tinga de pollo, con lechuga, queso fresco, crema y salsa al gusto.",
                price: "$25",
                category: "gorditas",
                image: "images/gordita-tinga.jpg"
            },
            {
                id: 3,
                name: "Quesadilla de Flor de Calabaza",
                description: "Tortilla de maíz rellena de queso Oaxaca y flor de calabaza, cocida en comal.",
                price: "$30",
                category: "quesadillas",
                image: "images/quesadilla-flor.jpg"
            },
            {
                id: 4,
                name: "Quesadilla de Huitlacoche",
                description: "Tortilla de maíz rellena de huitlacoche y queso, acompañada de salsa verde.",
                price: "$35",
                category: "quesadillas",
                image: "images/quesadilla-huitlacoche.jpg"
            },
            {
                id: 5,
                name: "Huarache de Chorizo",
                description: "Masa delgada en forma de huarache, cubierta de frijoles, chorizo, lechuga, queso, crema y salsa.",
                price: "$45",
                category: "huaraches",
                image: "images/huarache-chorizo.jpg"
            },
            {
                id: 6,
                name: "Huarache de Bistec",
                description: "Base de masa con frijoles, bistec en tiras, cebolla, cilantro, queso y aguacate.",
                price: "$50",
                category: "huaraches",
                image: "images/huarache-bistec.jpg"
            },
            {
                id: 7,
                name: "Sope de Pollo",
                description: "Base gruesa de masa con frijoles, pollo deshebrado, lechuga, queso, crema y salsa.",
                price: "$28",
                category: "otros",
                image: "images/sope-pollo.jpg"
            },
            {
                id: 8,
                name: "Torta de Milanesa",
                description: "Bolillo con milanesa de pollo o res, aguacate, lechuga, jitomate, mayonesa y frijoles.",
                price: "$55",
                category: "otros",
                image: "images/torta-milanesa.jpg"
            }
        ];
        
        // Cargar menú
        const menuGrid = document.getElementById('menuGrid');
        const categoryBtns = document.querySelectorAll('.category-btn');
        
        function loadMenuItems(category = 'all') {
            menuGrid.innerHTML = '';
            
            const filteredItems = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            filteredItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.dataset.category = item.category;
                
                menuItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="menu-img">
                    <div class="menu-content">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <span class="price">${item.price}</span>
                        <button class="btn order-item-btn" style="padding: 8px 20px; font-size: 0.9rem;">Ordenar</button>
                    </div>
                `;
                
                menuGrid.appendChild(menuItem);
            });
            
            // Añadir eventos a los botones de ordenar
            document.querySelectorAll('.order-item-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemName = this.closest('.menu-item').querySelector('h3').textContent;
                    const whatsappMsg = `Hola Señora Ana, me gustaría ordenar: ${itemName}`;
                    const whatsappUrl = `https://wa.me/525632087016?text=${encodeURIComponent(whatsappMsg)}`;
                    window.open(whatsappUrl, '_blank');
                });
            });
        }
        
        // Filtrado por categoría
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                loadMenuItems(this.dataset.category);
            });
        });
        
        // Cargar todos los items inicialmente
        loadMenuItems();
        
        // Menú móvil
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Mapa (Leaflet - OpenStreetMap - NO requiere API Key)
        function initMap() {
            // Coordenadas de Puebla, México (puedes cambiarlas por la ubicación real)
            const location = [19.591056, -98.978611];
            
            
            // Crear mapa
            const map = L.map('map').setView(location, 15);
            
            // Añadir capa de OpenStreetMap (gratis, no requiere API key)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // Añadir marcador
            L.marker(location)
                .addTo(map)
                .bindPopup('<b>Antojitos Ana</b><br>Aquí nos encontramos<br>¡Te esperamos!')
                .openPopup();
        }
        
        // Inicializar mapa cuando la página cargue
        document.addEventListener('DOMContentLoaded', initMap);