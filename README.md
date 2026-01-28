# Web Tools

A collection of useful web development tools built with React and Vite. This static web application can be hosted on GitHub Pages.

## Features

- **JSON Tool** - Format, minify, and validate JSON data
- **Base64 Tool** - Encode and decode Base64 strings with UTF-8 support
- **JavaScript Tool** - Minify, beautify, and validate JavaScript code
- **CSS Tool** - Minify, beautify, and validate CSS code
- **JWT Tool** - Decode and inspect JSON Web Tokens

## Development

### Prerequisites

- Node.js 18+ 
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This project includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages when you push to the `main` branch.

### Setup GitHub Pages

1. Push this repository to GitHub
2. Go to your repository Settings → Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. Push to `main` branch to trigger the deployment

The app will be available at `https://<username>.github.io/<repository-name>/`

## License

MIT
