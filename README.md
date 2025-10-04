# Next.js Starter Kit

A modern, full-stack boilerplate for building web applications with Next.js, MongoDB, DaisyUI, and Better-auth for authentication.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS, DaisyUI
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Better-auth with social providers (GitHub, Google)
- **Payments**: Stripe integration
- **Styling**: TailwindCSS v4 + DaisyUI

## Features

- 🔐 **Authentication System**
  - Email/password authentication
  - Social login (GitHub, Google)
  - Protected routes
  - Session management
- 💳 **Stripe Integration**
  - Payment processing
  - Customer creation on signup
  - Subscription support (configurable)
- 🎨 **UI Components**
  - Pre-built landing page sections
  - Responsive design
  - Dark/light theme toggle
  - DaisyUI component library
- 🛡️ **Security**
  - Middleware protection
  - Environment variable validation
  - Secure session handling

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- GitHub OAuth App (for social login)
- Google OAuth App (for social login)
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd next-starter
```

2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your actual values in `.env.local` using the provided `.env.example` template as a reference.

**🔒 Important Security Setup:**

Before adding your secrets, ensure your `.gitignore` file includes these lines to prevent accidentally committing sensitive data:

```gitignore
# Environment files with secrets
.env
.env*.local
.env.production
.env.development
```

The `.env.example` file is safe to commit as it contains no actual secrets - only placeholder values and helpful comments.

4. Start the development server:
```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Configuration

### Database Setup

1. Install and start MongoDB locally, or use MongoDB Atlas
2. Update the `MONGO_URI` in your `.env.local` file
3. The database will be automatically created when you first run the app

### Authentication Setup

#### GitHub OAuth:
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy Client ID and Client Secret to your `.env.local`

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials with:
   - Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Client Secret to your `.env.local`

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your test API keys from the Stripe dashboard
3. Set up webhook endpoint pointing to `/api/checkout_sessions`
4. Copy webhook secret to your `.env.local`

## Project Structure

```
next-starter/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Better-auth endpoints
│   │   └── checkout_sessions/ # Stripe webhooks
│   ├── dashboard/        # Protected dashboard page
│   ├── sign-in/         # Authentication pages
│   └── sign-up/
├── components/           # Reusable components
│   ├── auth/            # Authentication components
│   └── home/            # Landing page sections
├── lib/                 # Utility libraries
│   ├── auth.js         # Better-auth configuration
│   ├── auth-client.js  # Client-side auth
│   ├── db.js           # MongoDB connection
│   └── stripe.js       # Stripe configuration
└── middleware.js       # Route protection
```

## Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Adding New Pages

1. Create new page in `app/` directory
2. Add route protection in `middleware.js` if needed
3. Use `WithAuth` component for client-side protection

### Customizing Authentication

Edit `lib/auth.js` to:
- Add new social providers
- Configure session settings
- Enable/disable features

### Styling

- Global styles: `app/globals.css`
- TailwindCSS v4 configuration via CSS imports
- DaisyUI themes and components available out of the box

#### Customizing DaisyUI Themes and Colors

DaisyUI configuration is handled in `app/globals.css`. To customize themes and colors:

1. **Change default theme**: Add theme configuration to `globals.css`:
```css
@import "tailwindcss";
@plugin "daisyui" theme(dark);
```

2. **Custom color palette**: Define custom CSS variables in `globals.css`:
```css
:root {
  --color-primary: your-color-here;
  --color-secondary: your-color-here;
}
```

3. **Multiple themes**: Configure theme switching:
```css
@plugin "daisyui" theme(light dark cupcake);
```

Available DaisyUI themes: `light`, `dark`, `cupcake`, `bumblebee`, `emerald`, `corporate`, `synthwave`, `retro`, `cyberpunk`, `valentine`, `halloween`, `garden`, `forest`, `aqua`, `lofi`, `pastel`, `fantasy`, `wireframe`, `black`, `luxury`, `dracula`, `cmyk`, `autumn`, `business`, `acid`, `lemonade`, `night`, `coffee`, `winter`, `dim`, `nord`, `sunset`

## Deployment

### Environment Variables for Production

Update these variables for production:

```env
BETTER_AUTH_URL=https://yourdomain.com
NODE_ENV=production
```

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
