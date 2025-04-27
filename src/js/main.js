function initBurgerMenu() {
    const burger = document.querySelector('.burger');
    const headerMenu = document.querySelector('.header-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!burger || !headerMenu) {
        console.error('Burger или HeaderMenu не найдены в DOM.');
        return;
    }

    function openMenu() {
        burger.classList.add('burger--active');
        headerMenu.classList.add('header-menu--active');
        document.body.classList.add('page--noscroll');
    }

    function closeMenu() {
        burger.classList.remove('burger--active');
        headerMenu.classList.remove('header-menu--active');
        document.body.classList.remove('page--noscroll');
    }

    function toggleMenu() {
        if (window.innerWidth < 992) {
            if (burger.classList.contains('burger--active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    }

    burger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
            closeMenu();
        }
    });
}

// Вызов функции
initBurgerMenu();


// send message
const TOKEN = '7672192313:AAGwBul7qH8qcdvxGIUrdQcK3PDQK1tWFy8';
const CHAT_ID = '-1002587624085';
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const typeBuild = document.getElementById('type-build');
    const comment = document.getElementById('comment');

    const popup = document.getElementById('popup');

    const text = `Новая заявка через сайт ЭлектроПрофи:
Тип здания: ${typeBuild.value.trim()}
Имя: ${name.value.trim()}
Телефон: ${phone.value.trim()}
Сообщение: ${comment.value.trim()}
Email: ${email.value.trim()}`;


    name.value = '';
    phone.value = '';
    email.value = '';
    typeBuild.value = '';
    comment.value = '';


    // Отправляем в Telegram
    await fetch(TELEGRAM_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    })
        .then(response => {
            if (response.ok) {
                console.warn('Сообщение отправлено в Telegram!');
                // Показываем попап
                popup.style.display = 'block';

                // Через 3 секунды скрываем попап
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 3000);
            } else {
                console.warn('Ошибка отправки в Telegram');
            }
        });

    // Генерируем ссылку на WhatsApp
    const phoneNumber = '9520355758';
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(waLink, '_blank');
});

