# mmam-website

Official website for MMAM (Media Multicast Address Manager) project.

## 🌐 Live Site

Visit: [https://taqq505.github.io/mmam-website](https://taqq505.github.io/mmam-website)

## 📝 Overview

This is a static website for the MMAM project, built with:

- **Pure HTML/CSS/JavaScript** - No build process required
- **Vue.js 3 (CDN)** - For language switching and reactivity
- **Tailwind CSS (CDN)** - For styling
- **GitHub Pages** - For hosting

## 🚀 Local Development

Simply open `index.html` in a browser:

```bash
# Using Python's built-in server
python3 -m http.server 8000

# Or using PHP
php -S localhost:8000

# Then open http://localhost:8000
```

## 🌍 Language Support

The site supports:
- **English** (default)
- **日本語** (Japanese)

Language is auto-detected from browser settings and saved to localStorage.

## 📁 Project Structure

```
mmam-website/
├── index.html          # Main landing page
├── css/
│   └── styles.css      # Shared styles for index.html
├── js/
│   ├── app.js          # Vue.js app with i18n + content
│   └── scroll.js       # UI effects (parallax, modal, slider)
├── guide/              # HOW TO USE multi-page guide (sidebar layout)
├── mock/               # 新規: バックエンド無しのデモ/モックサイト
├── images/             # Landing page + mock用スクリーンショット
└── README.md
```

### Mock demo

`mock/` ディレクトリ以下に、API呼び出しやUIスクリーンショットを一覧化した静的ページ（`mock/index.html`）を追加しました。  
バックエンドを持たない「受け渡し用デモ」として単独配布でき、curlサンプルをコピーするための`mock/mock.js`と専用スタイルを含みます。

## 🖼️ Adding Screenshots

Replace placeholder images by adding screenshots to `images/screenshots/`:

1. Take screenshots of MMAM UI
2. Optimize images (recommended: WebP format, ~1920x1080)
3. Update `index.html` to reference actual images instead of placeholders

Example:
```html
<!-- Replace this -->
<div class="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
    <p class="text-gray-400 text-sm">{{ screenshot.placeholder }}</p>
</div>

<!-- With this -->
<img src="images/screenshots/flow-list.webp" alt="Flow List View" class="rounded-lg shadow-lg">
```

## 🔗 GitHub Links

Update GitHub URLs in `index.html` and `js/app.js`:

```javascript
// Current placeholder
https://github.com/your-org/mmam-docker

// Replace with actual repository
https://github.com/actual-org/mmam-docker
```

## 🚢 GitHub Pages Deployment

1. Push to GitHub repository
2. Go to repository Settings > Pages
3. Set Source to `main` branch, `/` (root) directory
4. Site will be published at `https://your-org.github.io/mmam-website`

## 📄 License

MIT License - Same as the main MMAM project
