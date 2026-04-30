const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace svc-ic with svc-img
html = html.replace(/<div class=\"svc-ic\"><img src=\"(.*?)\" alt=\"(.*?)\".*?><\/div>/g, '<div class=\"svc-img\"><img src=\"$1\" alt=\"$2\"></div>');

// Remove the old svc-ic CSS and add svc-img CSS
const cssToReplace = `.svc-ic {
      width: 52px;
      height: 52px;
      flex-shrink: 0;
      background: linear-gradient(135deg, var(--navy), var(--navy2));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      font-size: 1.3rem;
      transition: transform var(--t)
    }

    .svc-card:hover .svc-ic {
      transform: scale(1.1)
    }`;

const newCss = `.svc-img {
      width: 100%;
      height: 200px;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    
    .svc-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--t);
    }
    
    .svc-card:hover .svc-img img {
      transform: scale(1.05);
    }`;

html = html.replace(cssToReplace, newCss);

// Fix the mobile slider back to a normal grid if the user just wanted it responsive
const oldMobileCss = `.svc-g {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 16px;
        padding-bottom: 24px;
        margin: 0 -24px;
        padding: 0 24px 24px 24px;
        -webkit-overflow-scrolling: touch;
      }
      .svc-g::-webkit-scrollbar {
        display: none;
      }
      .svc-card {
        min-width: 85vw;
        flex-shrink: 0;
        scroll-snap-align: center;
      }`;

const newMobileCss = `.svc-g {
        grid-template-columns: 1fr
      }`;

html = html.replace(oldMobileCss, newMobileCss);

fs.writeFileSync('index.html', html);
console.log('Updated index.html');
