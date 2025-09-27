# Aetherion Portfolio Website - AI Coding Instructions

## Project Overview
Single-page portfolio website for Aetherion software company. Uses vanilla HTML/CSS/JavaScript with modern responsive design patterns and EmailJS integration for contact forms.

## Architecture & Structure

### Core Files & Responsibilities
- `index.html` - Complete single-page layout with semantic sections (hero, about, services, projects, team, contact)
- `styles.css` - CSS custom properties, grid/flexbox layouts, responsive design with mobile-first approach
- `script.js` - Vanilla JS for navigation, animations, form handling, and scroll effects
- `emailjs-config.js` - EmailJS service configuration (requires setup)

### Design System
CSS custom properties defined in `:root`:
```css
--primary-color: #3b4476 (Brand blue)
--secondary-color: #c9cff6 (Light blue)  
--light-color: #ededed (Light gray)
```

## Key Patterns & Conventions

### Section Structure Pattern
Each section follows consistent markup:
```html
<section id="section-name" class="section-name">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">Title</h2>
      <p class="section-subtitle">Subtitle</p>
    </div>
    <!-- Section content -->
  </div>
</section>
```

### Animation System
- Uses `IntersectionObserver` for scroll-triggered animations
- CSS transforms with `translateY()` for smooth reveals
- Staggered delays with `transitionDelay` for sequential animations
- Hover effects using `transform: translateY(-10px)` pattern

### Grid Layouts
Responsive grids use `auto-fit` pattern:
```css
grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))
```

## Development Workflows

### Local Development
- Serve via VS Code Live Server or simple HTTP server
- No build process - direct file editing
- Test responsive design using browser dev tools

### EmailJS Setup Process
1. Create EmailJS account and service
2. Update `EMAILJS_CONFIG` in `emailjs-config.js`
3. Uncomment EmailJS implementation in `script.js` lines ~90-110
4. Template variables: `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{service}}`, `{{message}}`

### Deployment
Designed for GitHub Pages deployment:
- Push to repository
- Enable Pages in repository settings
- Site serves directly from root directory

## Component Patterns

### Navigation
- Fixed navbar with backdrop blur effect
- Mobile hamburger menu with slide-in animation
- Active link highlighting with underline animation
- Smooth scroll navigation with offset compensation

### Form Handling
- Client-side validation with error styling
- Loading states during submission
- Success/error message display
- Form reset after successful submission

### Card Components
Standard pattern for services/projects/team:
- Hover transform effects (`translateY(-10px)`)
- Box shadow elevation changes
- Overlay reveals with opacity transitions
- Tag/badge styling for technologies

## Performance Considerations
- Lazy loading implemented via IntersectionObserver
- CSS animations use `transform` for hardware acceleration
- Minimal external dependencies (Font Awesome, Google Fonts, EmailJS)
- Mobile-first responsive design approach

## Content Management
- Team, project, and service data is hardcoded in HTML
- Easy customization through CSS custom properties
- Brand colors and typography centralized in CSS `:root`
- Contact information requires manual updates in multiple sections

## Common Customization Points
- Update company information in contact section and footer
- Modify team member details and social links
- Replace project portfolio items and technology stacks
- Adjust service offerings and descriptions
- Change brand colors via CSS custom properties

## Recent Optimizations

### Scrolling & Navigation Fixes
- Fixed navbar offset calculation to prevent sections being hidden behind fixed header
- Improved smooth scrolling with proper offset compensation (`navbar.offsetHeight + 20px`)
- Enhanced scroll indicator targeting with accurate positioning
- Updated active navigation highlighting with dynamic navbar height calculation

### Animation Performance Improvements
- Reduced animation delays: mobile (`index * 0.05s`) vs desktop (`index * 0.08s`)
- Faster transitions: `0.4s ease` instead of `0.6s`
- Improved threshold settings: `0.15` with `-30px` root margin
- Optimized IntersectionObserver settings for better mobile performance
- Added `.animate` CSS class for consistent animation states

### Mobile Responsiveness Enhancements
- Added hover detection (`matchMedia('(hover: none)')`) to disable hover effects on touch devices
- Progressive grid layouts: 1024px+ (3 cols), 768px+ (2 cols), mobile (1 col)
- Enhanced mobile navigation with smoother transitions
- Improved button sizing and spacing for touch interfaces
- Optimized loading animation performance (faster spin, smaller size)

### Code Cleanup
- Removed all commented code blocks and redundant sections
- Streamlined EmailJS configuration
- Eliminated unused functions and optimized event listeners
- Reduced parallax effect complexity for better performance

### Tech Stack Enhancement
- Comprehensive tech stack display using local SVG assets from `assets/tech_stack/`
- Organized into 8 logical categories: Frontend, Backend, Database, AI/ML, Cloud & DevOps, Mobile, Tools & Frameworks, and Specialized Services
- Enhanced visual design with category cards, hover effects, and improved responsive layout
- Auto-fit grid system adapts from 4+ columns on desktop to single column on mobile
- Interactive hover animations with scale and color transitions

### Dynamic Projects System
- Projects loaded dynamically from `project.js` data file
- Real project images from `assets/project_images/` directory
- YouTube video integration with modal popup functionality
- Project cards display: title, description, date, category, tech stack
- Interactive overlay with demo links, GitHub links, and video play buttons
- Responsive video modal with proper aspect ratio and keyboard/click controls
- Each project includes comprehensive metadata: tech stack, links, categories, and video demos

### Dynamic Team System
- Team members loaded dynamically from `team.js` data file
- Real team photos from `assets/team_images/` directory
- Professional team member cards with circular photo backgrounds
- Social media integration (LinkedIn, GitHub) with conditional display
- Team member details include: name, title, description, and social links
- Responsive team grid layout with hover effects and overlay animations
- Automatic handling of missing social media links (displays only available links)