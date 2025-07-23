# Team Achieve Login Page

A professional, responsive login page built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI/UX**: Clean, professional interface matching the provided design
- **Form Validation**: Client-side validation with real-time feedback
- **API Integration**: Ready for backend authentication
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Password Toggle**: Show/hide password functionality

## 🎨 Design

- **Colors**: 
  - Primary: `#F8EAFF` (light purple background)
  - Secondary: `#FFFFFF` (white)
  - Accent: Purple gradient for buttons and branding
- **Typography**: Clean, modern font stack
- **Layout**: Split-screen design with hero section and login form

## 🛠️ Technologies

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Heroicons** for icons
- **React Hooks** for state management

## 📱 Responsive Breakpoints

- **Desktop**: Full split-screen layout with hero image
- **Mobile**: Stacked layout with mobile-optimized header

## 🔧 Getting Started

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run the development server**:
   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to `http://localhost:3001`

## 🔐 Demo Credentials

For testing the login functionality, use:
- **Email**: `demo@teamachieve.com`
- **Password**: `password123`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/login/route.ts    # Demo login API endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main login page
└── components/
    └── LoginForm.tsx              # Reusable login form component
```

## 🎯 Key Components

### LoginForm Component
- Form validation with real-time feedback
- Password visibility toggle
- Loading states
- Error handling
- TypeScript interfaces for type safety

### Main Page
- Responsive layout
- Mobile navigation header
- Hero section with placeholder graphics
- API integration ready

## 🔄 API Integration

The login form is ready to connect to your backend API. Update the API endpoint in `LoginForm.tsx`:

```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
    rememberMe: formData.rememberMe,
  }),
});
```

## 🎨 Customization

### Colors
Update the colors in `tailwind.config.js` or directly in the components:
- `#F8EAFF` - Light purple background
- `#7C3AED` - Purple accent color
- `#F97316` - Orange accent color

### Hero Image
Replace the placeholder hero section in `page.tsx` with your actual image:
```jsx
<Image 
  src="/your-hero-image.jpg" 
  alt="Team Achieve Hero" 
  width={320} 
  height={240}
  className="rounded-2xl shadow-2xl"
/>
```

## 📝 Form Validation

The form includes:
- Email format validation
- Password length requirements (min 6 characters)
- Required field validation
- Real-time error feedback
- Submit button loading states

## 🚀 Production Ready

This application is built with production best practices:
- TypeScript for type safety
- Error boundaries
- Proper form validation
- Responsive design
- SEO-friendly structure
- Performance optimized

## 📋 Todo for Production

1. Connect to real authentication API
2. Add proper error logging
3. Implement session management
4. Add forgot password functionality
5. Add social login options (if needed)
6. Replace placeholder hero image with actual image
7. Add proper loading animations
8. Implement proper routing after login

---

**Built for recruitment screening test** - demonstrating modern React/Next.js development skills with professional UI/UX design.
