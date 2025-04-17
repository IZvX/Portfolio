document.addEventListener('DOMContentLoaded', () => {
    const skillGrid = document.getElementById('skill-grid');

    const skills = [
        { name: 'HTML', icon: 'fab fa-html5', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { name: 'CSS', icon: 'fab fa-css3-alt', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
        { name: 'JS', icon: 'fab fa-js-square', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'Node.js', icon: 'fab fa-node-js', link: 'https://nodejs.org/' },
        { name: 'Python', icon: 'fab fa-python', link: 'https://www.python.org/' },
        { name: 'C#', icon: `<svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 25 2 C 24.285156 2 23.570313 2.179688 22.933594 2.539063 L 6.089844 12.003906 C 4.800781 12.726563 4 14.082031 4 15.535156 L 4 34.464844 C 4 35.917969 4.800781 37.273438 6.089844 37.996094 L 22.933594 47.460938 C 23.570313 47.820313 24.285156 48 25 48 C 25.714844 48 26.429688 47.820313 27.066406 47.460938 L 43.910156 38 C 45.199219 37.273438 46 35.917969 46 34.464844 L 46 15.535156 C 46 14.082031 45.199219 12.726563 43.910156 12.003906 L 27.066406 2.539063 C 26.429688 2.179688 25.714844 2 25 2 Z M 25 13 C 28.78125 13 32.277344 14.753906 34.542969 17.738281 L 30.160156 20.277344 C 28.84375 18.835938 26.972656 18 25 18 C 21.140625 18 18 21.140625 18 25 C 18 28.859375 21.140625 32 25 32 C 26.972656 32 28.84375 31.164063 30.160156 29.722656 L 34.542969 32.261719 C 32.277344 35.246094 28.78125 37 25 37 C 18.382813 37 13 31.617188 13 25 C 13 18.382813 18.382813 13 25 13 Z M 35 20 L 37 20 L 37 22 L 39 22 L 39 20 L 41 20 L 41 22 L 43 22 L 43 24 L 41 24 L 41 26 L 43 26 L 43 28 L 41 28 L 41 30 L 39 30 L 39 28 L 37 28 L 37 30 L 35 30 L 35 28 L 33 28 L 33 26 L 35 26 L 35 24 L 33 24 L 33 22 L 35 22 Z M 37 24 L 37 26 L 39 26 L 39 24 Z"/></svg>`,svg:true, link: 'https://docs.microsoft.com/en-us/dotnet/csharp/' },
        { name: 'Unity', icon: 'fab fa-unity', link: 'https://unity.com/' },
        { name: 'Linux', icon: 'fab fa-linux', link: 'https://www.linux.org/' },
        { name: 'Blender', icon: `<svg fill="currentcolor" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 25.783203 5.0195312 C 25.588141 5.0022187 25.390156 5.0024375 25.191406 5.0234375 C 24.394406 5.1104375 23.679734 5.5029531 23.177734 6.1269531 C 22.140734 7.4159531 22.346719 9.3087031 23.636719 10.345703 L 26.9375 13 L 9.9609375 13 C 8.3069375 13 6.9609375 14.346 6.9609375 16 C 6.9609375 17.654 8.3069375 19 9.9609375 19 L 17.396484 19 L 3.15625 30.509766 C 2.50925 31.032766 2.1055781 31.776516 2.0175781 32.603516 C 1.9305781 33.430516 2.1684062 34.243625 2.6914062 34.890625 C 3.2144063 35.537625 3.9581563 35.941297 4.7851562 36.029297 C 5.6121562 36.116297 6.4252656 35.878469 7.0722656 35.355469 L 13.998047 29.757812 C 14.577047 37.698812 21.963938 44 30.960938 44 C 40.334938 44 47.960938 37.159 47.960938 28.75 C 47.960938 23.554 45.051828 18.771359 40.173828 15.943359 L 27.396484 5.6699219 C 26.927734 5.2934219 26.368391 5.0714688 25.783203 5.0195312 z M 30.960938 20 C 35.922938 20 39.960938 23.364 39.960938 27.5 C 39.960938 31.636 35.922938 35 30.960938 35 C 25.998938 35 21.960937 31.636 21.960938 27.5 C 21.960938 23.364 25.998938 20 30.960938 20 z M 30.960938 22 A 6 5 0 0 0 30.960938 32 A 6 5 0 0 0 30.960938 22 z"/></svg>`, svg:true, link: 'https://www.blender.org/' },
        { name: 'Discord', icon: 'fab fa-discord', link: 'https://discord.js.org/' },
    ];

    skills.forEach(skill => {
        const skillLink = document.createElement('a');
        skillLink.href = skill.link;  // Or a relevant link
        skillLink.target = "_blank"
        
        if (skill.svg) {
            skillLink.innerHTML = skill.icon + " " + skill.name;
        }else{
            skillLink.innerHTML = `<i class="${skill.icon}"></i> ${skill.name}`;
        }
        skillGrid.appendChild(skillLink);
    });
});