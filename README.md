A high-performance, feature-rich E-commerce application built with **Angular 17**, featuring Server-Side Rendering (SSR), multi-language support, and a responsive design.

## ✨ Features

- 🔐 **Authentication**: Secure Login, Registration, and Forgot Password flow (with OTP/Verification).
- 🛍️ **Product Catalog**: Dynamic product listing with search and filtering by brands and categories.
- 📦 **Order Management**: Comprehensive order tracking and history.
- 🛒 **Shopping Cart**: Advanced cart management with real-time updates.
- 🌍 **Multi-language**: Seamless language switching powered by `ngx-translate`.
- ⚡ **Performance**: SSR (Server-Side Rendering) for faster SEO and page loads.
- 📱 **Responsive**: Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack

- **Core**: Angular 17 (Standalone Components)
- **UI Architecture**: Bootstrap 5.3 + FontAwesome 6
- **Animations**: `ngx-spinner`, `ngx-toastr`, `ngx-owl-carousel-o`
- **Utilities**: RxJS, JWT-decode, Bootstrap

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mostafasayed0/E-commerce.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`.

## 🏗️ Building & Deployment

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### SSR Build
To build for Server-Side Rendering:
```bash
npm run build
```

### Serve SSR
```bash
npm run serve:ssr:ecommerce
```

## 📂 Project Structure

```text
src/
├── app/
│   ├── components/   # UI Features (Home, Cart, Auth, etc.)
│   ├── core/         # Services, Guards, Interceptors, Pipes
│   ├── layouts/      # Main and Auth layout wrappers
│   └── interfaces/   # TypeScript Data Models
├── assets/           # Images, i18n JSON files, styles
└── index.html        # App entry point
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
