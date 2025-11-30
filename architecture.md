# Architecture Documentation

## System Overview

The **Vani Membership System** is a web-based membership management application designed for community organizations, specifically tailored for South Indian coastal village associations. It provides comprehensive tools for managing memberships, fee collection, user profiles, and administrative functions.

### Project Type

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Radix UI Components + Tailwind CSS
- **State Management**: React Hooks (useState)
- **Routing**: Client-side navigation via state management

---

## Architecture Pattern

### Frontend Architecture

The application follows a **Component-Based Architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│                   (Root Component)                           │
│              State Management & Routing                      │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────────┐
        │                  │                      │
   ┌────▼─────┐      ┌─────▼──────┐      ┌──────▼─────┐
   │  Auth    │      │   Admin    │      │    User    │
   │  Layer   │      │ Dashboard  │      │  Dashboard │
   └──────────┘      └────────────┘      └────────────┘
        │                  │                      │
    ┌───┴───┐         ┌────┴─────┐          ┌────┴────┐
    │Login  │         │ Member   │          │Profile  │
    │Register│        │ Fee Mgmt │          │Payments │
    │Forgot │         │ Settings │          │History  │
    └───────┘         └──────────┘          └─────────┘
```

---

## Core Components

### 1. Application Entry Points

#### **main.tsx**

- Application bootstrap
- DOM rendering setup
- Global styles import

#### **App.tsx**

- Root component and state container
- Client-side routing logic
- Page state management (`login`, `register`, `forgot-password`, `user-dashboard`, `admin-dashboard`)
- Authentication flow orchestration
- Global toast notifications (Sonner)

---

### 2. Authentication Layer

#### **LoginPage.tsx**

- User authentication interface
- Email/password form validation
- Mock authentication logic (admin detection via email)
- Navigation to registration and password recovery
- Responsive design with background imagery

**Key Features:**

- Admin vs. User role detection
- Form validation
- Visual feedback with gradient overlays
- Brand identity integration (Waves icon)

#### **RegistrationPage.tsx**

- New user registration
- Multi-field form with validation
- Terms and conditions acceptance
- Password strength requirements

#### **ForgotPasswordPage.tsx**

- Password recovery workflow
- Email-based reset process
- Navigation back to login

---

### 3. User Dashboard

#### **UserDashboard.tsx**

Main member portal with three primary sections:

**A. Overview Tab**

- Membership status display
- Payment due information
- Quick stats cards
- Outstanding fees alerts

**B. Profile Tab**

- Personal information display
- Contact details
- Membership information
- Profile editing capability

**C. Payment History Tab**

- Historical payment records
- Receipt viewing
- Outstanding fees tracking
- Payment status badges

**Sub-Components:**

- `EditProfileModal.tsx` - Profile update interface
- `ViewReceiptModal.tsx` - Payment receipt display
- `ChangePasswordModal.tsx` - Password management
- `ProfileDropdown.tsx` - User menu with logout

---

### 4. Admin Dashboard

#### **AdminDashboard.tsx**

Comprehensive administrative control panel with five main sections:

**A. Overview Tab**

- Key metrics dashboard
  - Total members count
  - New registrations
  - Active members
  - Revenue statistics
- Pending registration approvals
- Quick action cards

**B. Members Tab**

- Complete member directory
- Search and filter functionality
- Member status management
- Bulk operations support

**C. Fee Management Tab**

- Fee structure configuration
- Outstanding payment tracking
- Payment reminder system
- Revenue analytics

**D. Registrations Tab**

- Pending approval queue
- Registration review workflow
- Approval/rejection actions

**E. Settings Tab**

- System configuration
- Organization details
- Notification preferences
- Payment gateway setup

**Sub-Components:**

- `AddMemberModal.tsx` - New member creation
- `EditMemberModal.tsx` - Member data editing
- `ChangeRoleModal.tsx` - Membership type management
- `DeleteMemberModal.tsx` - Member removal
- `TableActionsDropdown.tsx` - Batch actions menu
- `AdminSettings.tsx` - System configuration
- `FeeManagement.tsx` - Fee structure management

---

### 5. Fee Management System

#### **FeeManagement.tsx**

Dedicated fee management interface:

**Features:**

- Fee structure definition by membership type
- Outstanding payment tracking
- Payment reminder system
- Revenue analytics
- Manual payment recording

**Membership Types:**

1. **Standard** - Basic membership (RM 150/year)
2. **Premium** - Enhanced benefits (RM 300/year)
3. **Committee** - Leadership role (RM 100/year)

**Sub-Components:**

- `EditFeeModal.tsx` - Fee structure editing

---

### 6. Settings & Configuration

#### **AdminSettings.tsx**

Comprehensive system configuration with five categories:

**A. Organization Settings**

- Basic information (name, contact, address)
- Branding details
- Website information

**B. Notification Settings**

- Email notifications toggle
- SMS notifications
- Payment reminders configuration
- System alerts management

**C. Payment Gateway Settings**

- Billplz integration
- API key management
- Test mode toggle
- Currency settings
- Auto-receipt generation

**D. Security Settings**

- Two-factor authentication
- Password policies
- Session management
- Login attempt limits

**E. System Settings**

- Maintenance mode
- Backup configuration
- Data retention policies
- Language and date format

---

## UI Component Library

### Design System

Built on **Radix UI** primitives with **Tailwind CSS** styling.

### Component Categories

#### 1. **Layout Components**

- `card.tsx` - Content containers
- `separator.tsx` - Visual dividers
- `tabs.tsx` - Tab navigation
- `accordion.tsx` - Collapsible sections
- `scroll-area.tsx` - Custom scrollbars

#### 2. **Form Components**

- `input.tsx` - Text input fields
- `textarea.tsx` - Multi-line text
- `select.tsx` - Dropdown selection
- `checkbox.tsx` - Boolean input
- `radio-group.tsx` - Single selection
- `switch.tsx` - Toggle control
- `slider.tsx` - Range input
- `calendar.tsx` - Date picker
- `input-otp.tsx` - OTP entry
- `form.tsx` - Form wrapper with validation

#### 3. **Feedback Components**

- `alert.tsx` - Information messages
- `alert-dialog.tsx` - Confirmation dialogs
- `toast` (via Sonner) - Toast notifications
- `badge.tsx` - Status indicators
- `progress.tsx` - Progress bars
- `skeleton.tsx` - Loading states

#### 4. **Navigation Components**

- `button.tsx` - Action buttons
- `dropdown-menu.tsx` - Context menus
- `navigation-menu.tsx` - Site navigation
- `menubar.tsx` - Menu bar
- `breadcrumb.tsx` - Breadcrumb navigation
- `pagination.tsx` - Page navigation

#### 5. **Overlay Components**

- `dialog.tsx` - Modal dialogs
- `sheet.tsx` - Side panels
- `drawer.tsx` - Bottom drawers
- `popover.tsx` - Floating popovers
- `tooltip.tsx` - Hover tooltips
- `hover-card.tsx` - Rich hover content
- `context-menu.tsx` - Right-click menus

#### 6. **Data Display Components**

- `table.tsx` - Data tables
- `avatar.tsx` - User avatars
- `chart.tsx` - Data visualization (Recharts)
- `carousel.tsx` - Image carousel
- `collapsible.tsx` - Expandable content

#### 7. **Utility Components**

- `aspect-ratio.tsx` - Aspect ratio container
- `resizable.tsx` - Resizable panels
- `command.tsx` - Command palette
- `toggle.tsx` - Toggle button
- `toggle-group.tsx` - Toggle button group

#### 8. **Custom Components**

- `ImageWithFallback.tsx` - Image loading with fallback
- `ProfileDropdown.tsx` - User profile menu
- `TableActionsDropdown.tsx` - Table row actions

---

## Data Management

### State Management Strategy

- **Local Component State**: React useState hooks
- **Prop Drilling**: Parent-to-child data flow
- **No Global State**: Currently using mock data

### Data Models

#### **User Profile**

```typescript
{
  name: string
  email: string
  phone: string
  membershipStatus: 'Active' | 'Inactive'
  membershipType: 'Standard' | 'Premium' | 'Committee'
  joinDate: string
  address?: string
  city?: string
  state?: string
  postalCode?: string
}
```

#### **Member Record**

```typescript
{
  id: number;
  name: string;
  email: string;
  phone: string;
  membershipType: "Standard" | "Premium" | "Committee";
  status: "Active" | "Inactive";
  joinDate: string;
  balance: string;
}
```

#### **Payment Record**

```typescript
{
  id: number
  date: string
  amount: string
  status: 'Paid' | 'Outstanding'
  invoice: string
  dueDate?: string
}
```

#### **Fee Structure**

```typescript
{
  id: number
  membershipType: string
  annualFee: number
  registrationFee: number
  description: string
  color: string
  benefits: string[]
}
```

---

## Styling Architecture

### Design System

- **Primary Colors**: Cyan, Blue, Teal gradient scheme
- **Typography**: System font stack
- **Spacing**: Tailwind CSS spacing scale
- **Breakpoints**: Responsive design with mobile-first approach

### Theme Implementation

- **Gradient Backgrounds**: `from-cyan-50 via-blue-50 to-teal-50`
- **Sidebar**: `from-cyan-700 via-blue-700 to-teal-700`
- **Accent Colors**: Cyan for primary actions
- **Status Colors**:
  - Success: Green
  - Warning: Yellow
  - Error: Red
  - Info: Blue

### CSS Structure

- `index.css` - Global styles and Tailwind imports
- `globals.css` - Additional global styles
- Inline Tailwind classes for component styling
- Radix UI theming integration

---

## Navigation Flow

### User Journey Map

#### **Authentication Flow**

```
Login Page
├─→ Register → Login
├─→ Forgot Password → Login
├─→ User Dashboard (Member)
└─→ Admin Dashboard (Admin)
```

#### **Member Flow**

```
User Dashboard
├─→ Overview
│   ├─→ View Membership Info
│   └─→ Check Payment Due
├─→ Profile
│   ├─→ Edit Profile
│   └─→ Change Password
└─→ Payment History
    ├─→ View Receipts
    └─→ Check Outstanding Fees
```

#### **Admin Flow**

```
Admin Dashboard
├─→ Overview
│   ├─→ View Stats
│   └─→ Approve Registrations
├─→ Members
│   ├─→ Add Member
│   ├─→ Edit Member
│   ├─→ Change Role
│   └─→ Delete Member
├─→ Fee Management
│   ├─→ Edit Fee Structure
│   ├─→ Track Outstanding Payments
│   └─→ Send Reminders
├─→ Registrations
│   ├─→ Approve/Reject
│   └─→ View Details
└─→ Settings
    ├─→ Organization
    ├─→ Notifications
    ├─→ Payment Gateway
    ├─→ Security
    └─→ System
```

---

## Feature Modules

### 1. Authentication Module

- **Components**: LoginPage, RegistrationPage, ForgotPasswordPage
- **Features**:
  - Email/password authentication
  - Role-based access control
  - Password recovery
  - Mock authentication (client-side)

### 2. Member Management Module

- **Components**: AdminDashboard (Members Tab), AddMemberModal, EditMemberModal, DeleteMemberModal
- **Features**:
  - CRUD operations for members
  - Search and filter
  - Bulk actions
  - Member status management
  - Role assignment

### 3. Fee Management Module

- **Components**: FeeManagement, EditFeeModal
- **Features**:
  - Fee structure configuration
  - Outstanding payment tracking
  - Payment reminders
  - Revenue analytics
  - Manual payment recording

### 4. Payment Module

- **Components**: UserDashboard (Payments Tab), ViewReceiptModal
- **Features**:
  - Payment history viewing
  - Receipt generation
  - Outstanding fee tracking
  - Payment status updates

### 5. Profile Management Module

- **Components**: EditProfileModal, ChangePasswordModal
- **Features**:
  - Profile editing
  - Password management
  - Contact information updates

### 6. Settings Module

- **Components**: AdminSettings
- **Features**:
  - Organization configuration
  - Notification preferences
  - Payment gateway integration
  - Security policies
  - System maintenance

### 7. Registration Approval Module

- **Components**: AdminDashboard (Registrations Tab)
- **Features**:
  - Pending registration queue
  - Approval workflow
  - Rejection with notes
  - Member onboarding

---

## Technical Stack

### Core Technologies

- **React**: 18.3.1
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework

### UI Libraries

- **Radix UI**: Accessible component primitives
  - Dialog, Dropdown, Select, Tabs, and 20+ components
- **Lucide React**: Icon library (0.487.0)
- **Sonner**: Toast notifications (2.0.3)
- **Recharts**: Chart library (2.15.2)

### Form Management

- **React Hook Form**: 7.55.0
- **Input OTP**: OTP input component

### Utilities

- **class-variance-authority**: Component variants
- **clsx**: Conditional classnames
- **tailwind-merge**: Tailwind class merging
- **cmdk**: Command menu
- **next-themes**: Theme management
- **vaul**: Drawer component

### Carousel

- **Embla Carousel React**: 8.6.0

### Development Tools

- **Vite**: Build tool
- **@types/node**: Node.js type definitions
- **SWC**: Fast TypeScript/JavaScript compiler

---

## Build Configuration

### Vite Configuration

- **Base Path**: `/vani_membership_system/`
- **Plugin**: @vitejs/plugin-react-swc (SWC for faster compilation)
- **Path Aliases**: Extensive alias configuration for all dependencies
- **Resolve Extensions**: .js, .jsx, .ts, .tsx, .json

### Project Structure

```
vani_membership_system/
├── index.html                 # Entry HTML
├── package.json               # Dependencies
├── vite.config.ts            # Build configuration
├── README.md                  # Project documentation
├── architecture.md            # This file
├── src/
│   ├── main.tsx              # Application entry
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles
│   ├── components/           # React components
│   │   ├── [Auth Components]
│   │   ├── [Dashboard Components]
│   │   ├── [Modal Components]
│   │   ├── figma/           # Design-imported components
│   │   └── ui/              # UI primitives
│   ├── guidelines/          # Development guidelines
│   └── styles/              # Additional styles
└── [Config files]
```

---

## Security Considerations

### Current Implementation

⚠️ **Note**: This is a frontend-only prototype with mock authentication

### Recommended Backend Integration

1. **Authentication**: JWT-based authentication
2. **Authorization**: Role-based access control (RBAC)
3. **Data Validation**: Server-side input validation
4. **API Security**: HTTPS, CORS, rate limiting
5. **Payment Security**: PCI-DSS compliance for payment processing
6. **Data Protection**: Encryption at rest and in transit

### Security Features (Planned)

- Two-factor authentication
- Password policies
- Session timeout
- Login attempt limits
- Audit logging

---

## Future Enhancements

### Backend Integration

- [ ] RESTful API or GraphQL backend
- [ ] Database integration (PostgreSQL/MySQL)
- [ ] Real authentication system
- [ ] Payment gateway integration (Billplz)

### Features

- [ ] Email notification system
- [ ] SMS reminders
- [ ] Advanced reporting and analytics
- [ ] Document management
- [ ] Event management
- [ ] Communication portal
- [ ] Mobile app (React Native)

### Technical Improvements

- [ ] Global state management (Redux/Zustand)
- [ ] Client-side routing (React Router)
- [ ] Progressive Web App (PWA)
- [ ] Offline support
- [ ] Performance optimization
- [ ] Automated testing (Jest, React Testing Library)
- [ ] E2E testing (Playwright/Cypress)

---

## Development Guidelines

### Component Development

1. Use TypeScript for type safety
2. Follow React best practices and hooks
3. Utilize Radix UI primitives for accessibility
4. Apply Tailwind CSS for consistent styling
5. Extract reusable logic into custom hooks
6. Keep components focused and modular

### Code Organization

- **Components**: One component per file
- **Naming**: PascalCase for components, camelCase for utilities
- **Props**: Define explicit TypeScript interfaces
- **State**: Keep state as local as possible
- **Side Effects**: Use useEffect appropriately

### Styling Conventions

- Use Tailwind utility classes
- Apply consistent color scheme (cyan/blue/teal)
- Maintain responsive design
- Use gradient backgrounds for visual appeal
- Ensure accessibility (WCAG 2.1 AA)

### Testing Strategy

- Unit tests for utility functions
- Component tests for UI components
- Integration tests for user flows
- E2E tests for critical paths

---

## Deployment

### Build Process

```bash
npm install          # Install dependencies
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview production build
```

### Production Considerations

- Environment variables for API endpoints
- CDN for static assets
- Error monitoring (Sentry)
- Analytics integration
- SEO optimization (meta tags)

---

## API Integration Points (Future)

### Recommended API Endpoints

#### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - New registration
- `POST /api/auth/forgot-password` - Password reset
- `POST /api/auth/logout` - User logout

#### Members

- `GET /api/members` - List all members
- `GET /api/members/:id` - Get member details
- `POST /api/members` - Create member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

#### Fees

- `GET /api/fees/structure` - Get fee structure
- `PUT /api/fees/structure` - Update fees
- `GET /api/fees/outstanding` - Outstanding payments
- `POST /api/fees/payment` - Record payment
- `POST /api/fees/reminder` - Send reminder

#### Payments

- `GET /api/payments` - Payment history
- `GET /api/payments/:id` - Payment details
- `POST /api/payments/receipt` - Generate receipt

#### Settings

- `GET /api/settings` - Get all settings
- `PUT /api/settings/organization` - Update org settings
- `PUT /api/settings/notifications` - Update notifications
- `PUT /api/settings/security` - Update security

---

## Performance Optimization

### Current Optimizations

- Vite with SWC for fast builds
- Code splitting via dynamic imports (potential)
- Lazy loading of images with fallback
- Optimized bundle size with tree shaking

### Recommended Optimizations

- React.memo for expensive components
- useMemo/useCallback for expensive computations
- Virtual scrolling for large lists
- Image optimization and lazy loading
- Code splitting by routes
- CDN for static assets

---

## Accessibility

### Current Implementation

- Radix UI components (built-in accessibility)
- Semantic HTML structure
- ARIA attributes via Radix
- Keyboard navigation support
- Focus management

### Recommendations

- Screen reader testing
- Color contrast validation
- Keyboard-only navigation testing
- ARIA landmarks
- Skip links for navigation

---

## Browser Support

### Target Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Mobile Support

- iOS Safari
- Chrome Mobile
- Responsive design for all screen sizes

---

## License & Attribution

**Original Design**: Figma design at https://www.figma.com/design/etROxrT8btYgWGwxNJ2qrC/Membership-system-test

**Dependencies**: See package.json for full list of open-source libraries used.

---

## Support & Maintenance

### Version

Current Version: 0.1.0

### Contact

For questions or issues, please refer to the project repository.

---

**Last Updated**: November 29, 2025
