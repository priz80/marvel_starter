# Marvel Starter

Starter template for a Marvel Comics information portal built with React.

## 🚀 Tech Stack

| Technology | Version |
|---|---|
| **React** | 18.3.1 |
| **Build tool** | react-scripts (Create React App) 5.0.1 |
| **CSS preprocessor** | Sass 1.77.2 |
| **Testing** | @testing-library/react, jest-dom, user-event |
| **API** | Marvel Gateway API |

## 📦 Installation

```bash
npm install
```

## ▶️ Scripts

| Command | Description |
|---|---|
| `npm start` | Run dev server (localhost:3000) |
| `npm run build` | Build for production |
| `npm test` | Run tests |
| `npm run eject` | Eject CRA config |

## 📁 Project Structure

```
marvel_starter/
├── public/
└── src/
    ├── index.js
    ├── services/
    │   └── MarvelServices.js    # Marvel API wrapper
    ├── components/
    │   ├── app/                 # Root component
    │   ├── appHeader/           # Navigation header
    │   ├── appBanner/           # Promotional banner
    │   ├── randomChar/          # Random character hero section
    │   ├── charList/            # Character grid
    │   ├── charInfo/            # Character detail view
    │   ├── comicsList/          # Comics grid
    │   ├── singleComic/         # Comic detail view
    │   └── skeleton/            # Loading placeholder
    ├── style/
    │   ├── style.scss           # Global styles
    │   ├── variables.scss       # SCSS variables
    │   └── button.scss          # Reusable button styles
    └── resources/
        └── img/                 # Static images
```

## 🎨 Features

- **Character List** — Grid of character cards
- **Character Detail** — Photo, name, description, comics
- **Comics List** — Comic books with covers, titles, prices
- **Single Comic View** — Detailed comic info (description, pages, language, price)
- **Random Character** — Hero section with featured character
- **Skeleton Loading** — Pulsing animation for loading states

## ⚙️ API Setup

The project uses the [Marvel Gateway API](https://developer.marvel.com/).

1. Register at [developer.marvel.com](https://developer.marvel.com/)
2. Get your **Personal Access Token**
3. Add it to `src/services/MarvelServices.js`:

```js
class MarvelService {
    _apiBase = 'https://gateway.marvel.com/v1/public';
    _token = 'ВАШ_ТОКЕН';

    // ...
}
```

## 📝 Notes

- All component styles are co-located in SCSS files
- Main color: `#9F0013` (Marvel red)
- Fixed-width container: 1100px
- UI components are currently static (placeholder data)
- No routing library installed
