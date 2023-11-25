const header = document.createElement('template');
header.innerHTML = `
<header>
    <h1 id="Weather">Погода на месяц</h1>
    <img id="logo" src="../../images/logo.png" alt="Погода" width="200" height="200">
        <img src="../../images/logo.png" alt="Погода" width="40" height="40" id="fixedLogo">
</header>
<input type="checkbox" id="burger">
    <label for="burger"></label>
    <div id="nav">
        <nav>
            <ul class="horizontal-list">
                <li><a href="../forecast/index.html"><span>Прогноз погоды</span></a></li>
                <li><a href="../shop/index.html"><span>Магазин</span></a></li>
                <li><a href="#2"><span>Климат России</span></a></li>
                <li><a href="#map"><span>Карта погоды</span></a></li>
            </ul>
        </nav>
    </div>
`;
document.body.prepend(header.content);