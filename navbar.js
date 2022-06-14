BuildNavBar();

function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

function BuildNavBar() {
    document.write('        <!-- popup for mobile view -->');
    document.write('        <div id="myNav" class="overlay">');
    document.write('            <a class="closebtn" onclick="closeNav()">&times;</a>');
    document.write('            <div class="overlay-content">');
    document.write('                <a href="index.html">Home</a>');
    document.write('                <a href="PageList.html">Explore</a>');
    document.write('                <a href="About.html">About</a>');
    document.write('            </div>');
    document.write('        </div>');
    document.write('');
    document.write('        <!-- Navbar for mobile and desktop -->');
    document.write('        <div class="header">');
    document.write('            <div class="inner_header">');
    document.write('                <a href="index.html">');
    document.write('                    <div class="logo_container">');
    document.write('                        <h1>WelcomeTo<span>Whipple</span></h1>');
    document.write('                    </div>');
    document.write('                </a>');
    document.write('');
    document.write('                <ul class="Navigation">');
    document.write('                    <div class="hide-desktop">');
    document.write('                        <a href="PageList.html">');
    document.write('                            <li>Explore</li>');
    document.write('                        </a>');
    document.write('                        <a href="About.html">');
    document.write('                            <li>Learn More</li>');
    document.write('                        </a>');
    document.write('                    </div>');
    document.write('');
    document.write('                    <div class="hide-mobile">');
    document.write('                        <a>');
    document.write('                            <li id="dropdown_nav" onclick="openNav()">&#9660');
    document.write('                            </li>');
    document.write('                        </a>');
    document.write('');
    document.write('                    </div>');
    document.write('                </ul>');
    document.write('            </div>');
    document.write('        </div>');
}