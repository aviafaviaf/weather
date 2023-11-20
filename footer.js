const template = document.createElement('template');
template.innerHTML = `
<footer>
    <address>
        <h3>Контакты</h3>
        <p>
            Телефон:
            <a href="tel: +79398523931"> +7(939)852-39-31</a><br>
            Почта:
            <a href="mailto: vlad2004ik04@mail.ru">vlad2004ik04@mail.ru</a>
        </p>
    </address>
    <div id="social_networks">
        <h3>Соцсети</h3>
        <div id="icons">
            <div class="icon">
                <i class="fa-brands fa-vk fa-xl" style="color: #ffffff; z-index: 3;"></i>
            </div>
            <div class="icon">
                <i class="fa-brands fa-youtube fa-xl" style="color: #ffffff; z-index: 3;"></i>
            </div>
            <div class="icon">
                <i class="fa-brands fa-telegram fa-xl" style="color: #ffffff; z-index: 3;"></i>
            </div>
        </div>
    </div>
    <div id="footer_nav">
        <h3>Навигация</h3>
        <ul>
            <li><a href="#reg">Регистрация</a></li>
            <li><a href="#1">Что такое прогноз погоды</a></li>
            <li><a href="#2">Климат России</a></li>
            <li><a href="#map">Карта погоды</a></li>
        </ul>
    </div>
    <div id="about_us">
        <h3>О нас</h3>
        <p>С помощью этого сайта пользователи могут узнать о температуре, осадках, скорости ветра и других погодных условиях на определенную дату и время в течение месяца.</p>
    </div>
</footer>`;
document.body.append(template.content);