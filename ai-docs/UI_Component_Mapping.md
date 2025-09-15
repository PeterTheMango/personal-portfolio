# UI Component Implementation Plan

Based on the UX Structure Portfolio document, this file maps the appropriate Magic UI and shadcn/ui components for each section of the personal portfolio.

## Global Components

### App Shell & System
- **App Shell**: shadcn `@shadcn/scroll-area` for smooth scrolling
- **Theme System**: Magic UI `animated-theme-toggler` for dark/light mode switching
- **Background Effects**: Magic UI `grid-pattern` or `dot-pattern` for decorative backgrounds
- **Page Transitions**: Magic UI `blur-fade` for section transitions

## Floating Dock (Global Navigation)

- **Main Container**: Magic UI `dock` (perfect match for MacOS-style dock)
- **Tooltips**: shadcn `@shadcn/tooltip`
- **Separators**: shadcn `@shadcn/separator`
- **Navigation Items**: shadcn `@shadcn/button` (ghost variant)
- **Micro-interactions**: Magic UI `ripple` for button interactions

## Section 01 — Hero (Full Screen)

- **Animated Text**: Magic UI `typing-animation` or `word-rotate` for role morphing
- **Background Effects**: Magic UI `particles` or `meteors` for visual flair
- **CTA Buttons**: Magic UI `shimmer-button` or `shiny-button`
- **Text Effects**: Magic UI `animated-gradient-text` for welcome banner
- **Scroll Indicator**: Custom with Magic UI `blur-fade` animation
- **Alternative Text Effects**: Magic UI `hyper-text` for scrambling effects

## Section 02 — About (Bento Grid)

- **Grid Layout**: Magic UI `bento-grid` (exact match)
- **Cards**: React Bits `tilted-card` for interactive 3D tilt effects on hover
- **Icons Display**: Magic UI `icon-cloud` for toolstack visualization
- **Badge Components**: shadcn `@shadcn/badge` for expertise chips
- **Animated Elements**: Magic UI `border-beam` for card borders
- **Hover Effects**: Built-in tilted card 3D transforms with perspective effects

## Section 03 — Experience (Tabs + Two-Column Detail)

### Tab System
- **Tab Container**: shadcn `@shadcn/tabs` for Professional • Hackathon • Education tabs
- **Tab Triggers**: Built-in with shadcn tabs component
- **Tab Content**: shadcn tabs TabsContent for each tab panel

### Left Column (Organization Selector)
- **Organization List**: shadcn `@shadcn/scroll-area` for scrollable org list on desktop
- **List Items**: shadcn `@shadcn/button` (ghost variant) for selectable organization items
- **Active Indicator**: Custom CSS rail indicator with shadcn styling
- **Mobile Accordion**: shadcn `@shadcn/collapsible` for mobile organization collapse

### Right Column (Detail Panel)
- **Detail Container**: shadcn `@shadcn/card` for experience detail display
- **Header Content**: Built-in card header for position and organization
- **Date Chips**: shadcn `@shadcn/badge` for date range display
- **Bullet Points**: Custom list with shadcn typography classes
- **Loading State**: shadcn `@shadcn/skeleton` for detail panel loading
- **Crossfade Animation**: Magic UI `blur-fade` for content transitions

### Interactive Elements
- **Hover Effects**: shadcn `@shadcn/hover-card` for enhanced organization previews
- **Focus Management**: Built-in shadcn focus utilities
- **Keyboard Navigation**: Native shadcn tabs keyboard support

## Section 04 — Projects (Responsive Grid Cards)

### Grid Layout
- **Grid Container**: CSS Grid with responsive breakpoints (3-2-1 columns)
- **Project Cards**: React Bits `tilted-card` for interactive 3D tilt effects
- **Aspect Ratio**: Built-in tilted card aspect ratio handling for consistent heights

### Project Card Components
- **Media Container**: React Bits tilted card content area for video/image display
- **Video Controls**: Native HTML5 video with custom styling
- **CTA Buttons**: shadcn `@shadcn/button` (outline variant) for Source/Live Demo
- **Title Display**: React Bits tilted card header for project titles
- **Description**: React Bits tilted card content with text clamping
- **Tech Stack**: Magic UI `marquee` for auto-scrolling tech icons
- **Loading States**: shadcn `@shadcn/skeleton` for card loading

### Interactive Elements
- **Card Hover**: React Bits tilted card 3D tilt effects with perspective transforms
- **Button Icons**: Lucide React icons for GitHub and browser icons
- **Focus States**: Built-in tilted card focus management
- **Keyboard Navigation**: Enhanced with custom Left/Right marquee controls

## Section 05 — Testimonials (Carousel)

### Carousel System
- **Main Carousel**: shadcn `@shadcn/carousel` for testimonial slideshow
- **Carousel Content**: Built-in carousel content container (2 cards on desktop, 1 on mobile)
- **Navigation**: shadcn carousel prev/next buttons
- **Indicators**: shadcn carousel pagination dots
- **Auto-advance**: Built-in carousel autoplay functionality

### Testimonial Cards
- **Card Structure**: Magic UI `tweet-card` styling adapted for testimonials
- **Quote Display**: shadcn card content for testimonial text
- **Author Info**: shadcn `@shadcn/avatar` for author avatars
- **Author Details**: Custom typography with shadcn text classes
- **Loading States**: shadcn `@shadcn/skeleton` for testimonial loading

### Interactive Elements
- **Touch/Drag**: Native shadcn carousel touch support
- **Keyboard Navigation**: Built-in carousel Left/Right arrow support
- **Hover Pause**: Custom hover handlers for autoplay pause
- **Focus Trapping**: Enhanced focus management within active slides

## Section 06 — Contact (CTA + Email Input + Interactive Hover Button)

### Layout Components
- **Section Container**: Custom responsive container with accent background
- **Content Stack**: CSS flexbox layout for copy and form alignment

### Form Components
- **Form Container**: shadcn `@shadcn/form` with React Hook Form integration
- **Email Input**: shadcn `@shadcn/input` with email type and validation
- **Input Label**: shadcn `@shadcn/label` for accessibility
- **Submit Button**: shadcn `@shadcn/button` with custom interactive effects
- **Form Validation**: Built-in form validation with error display

### Interactive States & Effects
- **Button Hover**: Custom magnetic/tilt effects with CSS transforms
- **Success States**: Magic UI `confetti` for form submission celebration
- **Loading States**: Built-in button loading state with spinner
- **Error Handling**: shadcn `@shadcn/alert` for validation errors
- **Toast Notifications**: shadcn `@shadcn/sonner` for success/error messages
- **Honeypot**: Custom hidden input for spam protection

### Accessibility & UX
- **ARIA Labels**: Proper form labeling and error associations
- **Focus Management**: shadcn form focus utilities
- **Validation Messages**: Live region updates for screen readers

## Section 07 — Footer (Simple)

### Layout Components
- **Footer Container**: Custom footer with responsive two-column layout
- **Divider**: shadcn `@shadcn/separator` for content separation
- **Column Structure**: CSS Grid for responsive layout

### Content Components
- **Name Header**: Custom typography with shadcn heading classes
- **Bio Text**: shadcn muted text classes for availability/bio
- **Social Links**: shadcn `@shadcn/button` (ghost variant) with icons
- **Section Links**: shadcn `@shadcn/button` (link variant) for navigation
- **Resume Link**: shadcn `@shadcn/button` (outline variant) for resume download

### Interactive Elements
- **Link Hover**: Built-in shadcn button hover states
- **External Links**: Proper target="_blank" with security attributes
- **Focus States**: shadcn focus utilities for keyboard navigation

## Additional Interactive Elements

### Global Enhancements
- **Scroll Progress**: Magic UI `scroll-progress` for page progress
- **Loading Animations**: Magic UI `animated-beam` for connection visualizations
- **Number Counters**: Magic UI `number-ticker` for statistics display
- **Sparkle Effects**: Magic UI `sparkles-text` for highlighted text
- **Background Patterns**: Magic UI `animated-grid-pattern` for dynamic backgrounds

### Accessibility & Performance Components
- **Skip Links**: Custom implementation with shadcn styling
- **Focus Management**: shadcn focus utilities
- **Reduced Motion**: Built into Magic UI components
- **Progressive Enhancement**: Magic UI `progressive-blur` for content indication

## Component Priority Order

### Phase 1 (Core Functionality)
1. shadcn `@shadcn/button`
2. React Bits `tilted-card`
3. shadcn `@shadcn/form`
4. Magic UI `dock`
5. Magic UI `bento-grid`

### Phase 2 (Enhanced Interactions)
1. Magic UI `typing-animation`
2. Magic UI `magic-card`
3. Magic UI `animated-theme-toggler`
4. shadcn `@shadcn/carousel`
5. Magic UI `arc-timeline`

### Phase 3 (Polish & Effects)
1. Magic UI `particles`
2. Magic UI `confetti`
3. Magic UI `lens`
4. Magic UI `scroll-progress`
5. Magic UI `border-beam`

## Notes

- Magic UI components are prioritized for animations and visual effects
- shadcn/ui components are prioritized for forms, navigation, and core functionality
- React Bits tilted-card provides interactive 3D tilt effects for About and Projects sections
- All components support the defined theme system (light/dark mode)
- Accessibility features are built into both component libraries
- Reduced motion preferences are respected by Magic UI and React Bits components